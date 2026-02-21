import { prisma } from "../config/prisma";
import Api, { apiError } from "../utils/apiRes.util";
import { z } from "zod";

import { ai } from "../lib/gemini";

import fs from "fs";

export const createProject = async (req: any, res: any, next: any) => {
  try {
    const { userId, projectName, project_description } = req.body;

    if (!userId || !projectName || !project_description) {
      return next(
        new apiError(
          400,
          "Missing required fields: userId, projectName, project_description",
        ),
      );
    }

    const project = await prisma.project.create({
      data: {
        projectName,
        project_description,
        userId,
      } as any,
    });

    return Api.success(res, project, "Project created successfully");
  } catch (error: any) {
    console.error(error);
    return next(
      new apiError(
        500,
        "Failed to create project",
        [error?.message || String(error)],
        error?.stack,
      ),
    );
  }
};

export const getProjectsByUserId = async (req: any, res: any, next: any) => {
  try {
    const userId = req.params.userId || req.query.userId || req.body.userId;
    if (!userId) return next(new apiError(400, "userId is required"));

    const projects = await prisma.project.findMany({ where: { userId } });
    return Api.success(res, projects, "Projects fetched successfully");
  } catch (error: any) {
    console.error(error);
    return next(
      new apiError(
        500,
        "Failed to fetch projects",
        [error?.message || String(error)],
        error?.stack,
      ),
    );
  }
};

export const getProjectById = async (req: any, res: any, next: any) => {
  try {
    const { projectId } = req.params;
    if (!projectId) return next(new apiError(400, "projectId is required"));

    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });
    if (!project) return next(new apiError(404, "Project not found"));

    return Api.success(res, project, "Project fetched successfully");
  } catch (error: any) {
    console.error(error);
    return next(
      new apiError(
        500,
        "Failed to fetch project",
        [error?.message || String(error)],
        error?.stack,
      ),
    );
  }
};

export const updateProject = async (req: any, res: any, next: any) => {
  try {
    const { projectId } = req.params;
    const { projectName, project_description, status } = req.body;

    if (!projectId) return next(new apiError(400, "projectId is required"));

    const existingProject = await prisma.project.findUnique({
      where: { id: projectId },
    });
    if (!existingProject) return next(new apiError(404, "Project not found"));

    const updatedProject = await prisma.project.update({
      where: { id: projectId },
      data: {
        projectName,
        project_description,
        status,
      } as any,
    });

    return Api.success(res, updatedProject, "Project updated successfully");
  } catch (error: any) {
    console.error(error);
    return next(
      new apiError(
        500,
        "Failed to update project",
        [error?.message || String(error)],
        error?.stack,
      ),
    );
  }
};

export const deleteProject = async (req: any, res: any, next: any) => {
  try {
    const { projectId } = req.params;
    if (!projectId) return next(new apiError(400, "projectId is required"));

    const existingProject = await prisma.project.findUnique({
      where: { id: projectId },
    });
    if (!existingProject) return next(new apiError(404, "Project not found"));

    await prisma.project.delete({ where: { id: projectId } });
    return Api.success(res, null, "Project deleted successfully");
  } catch (error: any) {
    console.error(error);
    return next(
      new apiError(
        500,
        "Failed to delete project",
        [error?.message || String(error)],
        error?.stack,
      ),
    );
  }
};

// step 0 - receive files and projectId

/*
  const myfile = await ai.files.upload({
    file: "path/to/sample.mp3",
    config: { mimeType: "audio/mpeg" },
  });

  const fileName = myfile.name;
  const fetchedFile = await ai.files.get({ name: fileName });
  console.log(fetchedFile);
}
   */

export const uploadProjectFiles = async (req: any, res: any, next: any) => {
  try {
    const { projectId } = req.params;
    const files = req.files as Express.Multer.File[];

    if (!projectId) return next(new apiError(400, "ProjectId is required"));
    if (!files || files.length === 0)
      return next(new apiError(400, "No files uploaded"));

    // 2. Process and Upload to Google Files API
    const uploadPromises = files.map(async (file) => {
      // Upload using the new syntax
      const uploadResponse = await ai.files.upload({
        file: file.path,
        config: {
          mimeType: file.mimetype,
          displayName: file.originalname,
        },
      });

      // Cleanup local disk immediately after upload
      if (fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }

      // Return the data structure your DB expects
      return {
        name: file.originalname,
        url: uploadResponse.uri ?? "", // Ensure url is always a string
      };
    });

    const uploadedFileData = await Promise.all(uploadPromises);

    // 3. Update Project Status & Store File Metadata
    const updatedProject = await prisma.project.update({
      where: { id: projectId },
      data: {
        files: {
          push: uploadedFileData, // Prisma handles the array push in MongoDB
        },
        status: 1, // Progress to "Context Ingested"
      },
    });

    return Api.success(
      res,
      updatedProject,
      "Files ingested and synced to Google AI Cloud.",
    );
  } catch (error: any) {
    console.error("Unified Ingestion Error:", error);
    return next(new apiError(500, "Ingestion Failed", [error.message]));
  }
};

const extractionSchema = z.object({
  stakeholders: z.array(
    z.object({
      name: z.string(),
      role: z.string(),
      influence: z.string(),
      stance: z.string(),
    }),
  ),
});

// Schema for validating facts + optional relatedChats returned by the AI
const extractFactsDataSchema = z.object({
  facts: z.array(
    z.object({
      content: z.string().describe("Verifiable claim or requirement."),
      source: z.string().describe("Convention: [Channel]/[Thread or Subject]"),
      tone: z.string().describe("Sentiment/Tone of the statement."),
      when: z.string().describe("ISO timestamp or date string."),
      sourceType: z.enum(["messaging", "file"]),
      stackHolderId: z.string().optional().describe("The ID of the stakeholder who made the claim."),
    }),
  ),
  relatedChats: z
    .array(
      z.object({
        speaker: z.string(),
        text: z.string(),
        when: z.string().optional(),
        id: z.string().optional(),
      }),
    )
    .optional(),
});

export const mapStakeholders = async (req: any, res: any, next: any) => {
  const { projectId } = req.params;
  const { relevantChats } = req.body; // Expecting an array of chat objects or a joined string

  if (!projectId) return next(new apiError(400, "ProjectId is required"));
  if (
    !relevantChats ||
    (Array.isArray(relevantChats) && relevantChats.length === 0)
  ) {
    return next(new apiError(400, "Relevant chat history is required"));
  }

  const project = await prisma.project.findUnique({ where: { id: projectId } });
  if (!project) return next(new apiError(404, "Project not found"));

  const prompt = `
  SYSTEM ROLE: Expert Business Systems Analyst & Entity Extractor.
  
  TASK: Extract a clean list of stakeholders from the provided Project Context and Communication Data. 
  
  STRICT GROUNDING RULES:
  1. ONLY extract individuals or entities explicitly named in the "relevant" data streams.
  2. DO NOT hallucinate or "fill in" missing data. If Influence or Stance is not clear, use "Neutral" or "Medium".
  3. IGNORE all entries where "is_relevant" is false (e.g., family chats, social football groups).
  4. PROJECT SCOPE: Focus exclusively on stakeholders related to "${project.projectName}".

  INPUT DATA:
  - Project Description: ${project.project_description}
  - Data Vault JSON: ${JSON.stringify(relevantChats)}

  EXTRACTION LOGIC:
  - Identify Name & Role from Participant lists, Signatures, or Speaker tags.
  - Determine 'Influence': Look for budget authority (CFO), technical veto power (CTO), or final decision rights (CEO).
  - Determine 'Stance': Analyze sentiment. (e.g., Is the CFO "Blocking" a budget? Is the CEO "Supportive" of speed over security?)

  OUTPUT: Return a JSON object with a 'stakeholders' array.
`;

  // Define plain JSON schema for Gemini (must match our Zod `extractionSchema`)
  const extractionJsonSchema = {
    type: "object",
    properties: {
      stakeholders: {
        type: "array",
        items: {
          type: "object",
          properties: {
            name: { type: "string" },
            role: { type: "string" },
            influence: { type: "string", enum: ["High", "Medium", "Low"] },
            stance: {
              type: "string",
              enum: ["Supportive", "Neutral", "Skeptical", "Blocking"],
            },
          },
          required: ["name", "role", "influence", "stance"],
        },
      },
    },
    required: ["stakeholders"],
  };

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseJsonSchema: extractionJsonSchema,
      },
    });

    const parsedData = JSON.parse(response.text ?? "{}");
    const stakeholders = extractionSchema.parse(parsedData).stakeholders;

    // Save stakeholders to DB (assuming a Stakeholder model with name, role, and projectId)
    const savedStakeholders = await Promise.all(
      stakeholders.map((s: any) =>
        prisma.stakeholder.create({
          data: {
            name: s.name,
            role: s.role,
            influence: s.influence ?? null,
            stance: s.stance ?? null,
            projectId: projectId,
          },
        }),
      ),
    );

    return Api.success(
      res,
      savedStakeholders,
      "Stakeholders extracted and saved successfully",
    );
  } catch (error: any) {
    console.error("Stakeholder Extraction Error:", error);
    return next(
      new apiError(500, "Failed to extract stakeholders", [error.message]),
    );
  }
};
/*
type File {
  name String
  url  String
}

model Project {
  id                        String          @id @default(auto()) @map("_id") @db.ObjectId
  projectName               String
  project_description       String
  included_messaging_source String[]      @default([])
files                        File[]
  brdMdx                    String?
  status                    Int              @default(0)
  userId                    String          @db.ObjectId
  createdAt                 DateTime        @default(now())
  updatedAt                 DateTime        @updatedAt

  user           User            @relation(fields: [userId], references: [id], onDelete: Cascade)
  stakeholders   Stakeholder[]
  facts          Fact[]
  contradictions Contradiction[]
  resolutions    Resolution[]
}

model Stakeholder {
  id        String @id @default(auto()) @map("_id") @db.ObjectId
  name      String
  role      String
  influence String
  stance    String
  projectId String @db.ObjectId

  project Project @relation(fields: [projectId], references: [id], onDelete: Cascade)
}

model Fact {
  id         String   @id @default(auto()) @map("_id") @db.ObjectId
  content    String
  source     String
  tone       String
  when       DateTime
  resolved   Boolean @default(true)
  projectId  String   @db.ObjectId
 sourceType FactSourceType
 stackHolderId String?  @db.ObjectId

  project Project @relation(fields: [projectId], references: [id], onDelete: Cascade)
}

enum FactSourceType {
  messaging
  file
}


// algo :
/* 
1. Receive projectId and relevant chat history from frontend.
2. Fetch project details (name, description, files) from DB using projectId.
3. fetch stackholders from db using projectId so it can map in facts 
4. convention of source is if 
it whatsapp  whataspp/chatname
if email email/to
3. Construct a prompt combining project details and chat history.


*/

export const increamentProjectStatus = async (
  req: any,
  res: any,
  next: any,
) => {
  try {
    const { projectId } = req.params;
    if (!projectId) return next(new apiError(400, "ProjectId is required"));

    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });
    if (!project) return next(new apiError(404, "Project not found"));

    const newStatus = (project.status || 0) + 1;

    const updatedProject = await prisma.project.update({
      where: { id: projectId },
      data: { status: newStatus },
    });

    return Api.success(
      res,
      updatedProject,
      "Project status incremented successfully",
    );
  } catch (error: any) {
    console.error(error);
    return next(
      new apiError(500, "Failed to increment project status", [error.message]),
    );
  }
};


/*
{
    "user_id": "test1",
    "fullName": "Alex Chen",
    "email": "alex.chen@example.com",
    "role": "CEO",
    "project": "E-Commerce Checkout Flow",
    "data_vault": {
        "proposal": {
            "vendor": "CyberSafe Security Solutions",
            "authorized_by": "Sarah Jenkins (Lead Auditor)",
            "project": "PCI-DSS Compliance & Penetration Test",
            "scope": [
                "Comprehensive penetration testing of checkout-related microservices.",
                "PCI-DSS Level 2 compliance readiness assessment.",
                "Formal vulnerability remediation report.",
                "Risk documentation aligned with insurance policy requirements."
            ],
            "cost": "$15,000 USD",
            "timeline": "14 business days from project kickoff",
            "mandatory_compliance": "External audit is required for maintaining 'Pro Tier' payment processing license. Internal scans alone insufficient. Skipping audit increases license, insurance, and legal risks."
        },
        "meetings": [
            {
                "meeting_id": "mtg_tech_review_2024-02-05",
                "title": "Technical Architecture Review (Stakeholders Sync)",
                "date": "Feb 05, 2024",
                "participants": [
                    "Alex Chen (CEO)",
                    "Rajesh Patel (CTO)",
                    "Maria Santos (CFO)"
                ],
                "minutes": [
                    {
                        "timestamp": "00:05:12",
                        "speaker": "Rajesh (CTO)",
                        "text": "Uh, okay, so I’ve shared the CyberSafe proposal. It’s $15,000, um… and, yeah, we really need to sign this by Friday to stay on track for the March 31 launch."
                    },
                    {
                        "timestamp": "00:06:10",
                        "speaker": "Alex (CEO)",
                        "text": "Hmm, $15k… Can we maybe shuffle something around in the budget? What’s the risk if we delay?"
                    },
                    {
                        "timestamp": "00:06:45",
                        "speaker": "Maria (CFO)",
                        "text": "Rajesh, I’m looking at the ledger again. We only have $55k total for the whole project. Uh… if we spend $15k on this audit, we might not afford the Stripe senior integration developers."
                    },
                    {
                        "timestamp": "00:07:30",
                        "speaker": "Alex (CEO)",
                        "text": "Could we push the audit to Q2 then? Just thinking aloud…"
                    },
                    {
                        "timestamp": "00:07:45",
                        "speaker": "Rajesh (CTO)",
                        "text": "Well, it’s a risk, Alex. If we have a breach, the internal scan alone, uh… won’t protect us legally, at least not fully."
                    },
                    {
                        "timestamp": "00:08:10",
                        "speaker": "Alex (CEO)",
                        "text": "I get that, I do. But, the March 31 launch date is non-negotiable for the investors. So, um… I think we may need to skip the external audit for now, and use the $15k to speed up development."
                    },
                    {
                        "timestamp": "00:08:30",
                        "speaker": "Maria (CFO)",
                        "text": "Alright… I mean, if you insist, budget is locked at $55k with no audit fee. Just, uh… make sure we note everything carefully."
                    },
                    {
                        "timestamp": "00:08:50",
                        "speaker": "Rajesh (CTO)",
                        "text": "Yes, exactly. Ensure we log all high-risk decisions, exceptions, and any partial PCI compliance evidence for our records. It’s… important, okay?"
                    },
                    {
                        "timestamp": "00:09:15",
                        "speaker": "Alex (CEO)",
                        "text": "Noted. Partial internal audit evidence will be documented. Stripe integration gets priority. And, uh, let’s try to revisit external audit in Q2 if budget allows."
                    },
                    {
                        "timestamp": "00:09:45",
                        "speaker": "Maria (CFO)",
                        "text": "Fine… but just to flag, skipping the audit increases our legal and insurance exposure. So, every decision, uh… must be logged and reviewed later."
                    }
                ]
            }
        ],
        "whatsapp": [
            {
                "thread_id": "wa_group_001",
                "name": "Executive Strategic Sync",
                "is_relevant": true,
                "messages": [
                    {
                        "sender": "Maria Santos (CFO)",
                        "text": "Uh, Alex, we are overleveraged. $45k is the hard limit for the checkout project… I mean, anything more is risky."
                    },
                    {
                        "sender": "Alex Chen (CEO)",
                        "text": "Maria, I hear you. But if we don't fix the drop-offs, we could lose $100k/month. I'm thinking we push for $55k total."
                    },
                    {
                        "sender": "Rajesh Patel (CTO)",
                        "text": "Doing this right with PCI compliance… honestly, that’s an $80k job if we want full coverage."
                    },
                    {
                        "sender": "Alex Chen (CEO)",
                        "text": "Hmm, okay… let's find a middle ground. $55k total, but we cut the external audit. At least temporarily."
                    },
                    {
                        "sender": "Maria Santos (CFO)",
                        "text": "Cutting the audit worries me. Internal scans won’t protect us legally. Uh… just saying."
                    },
                    {
                        "sender": "Rajesh Patel (CTO)",
                        "text": "Yes, agreed. Legal exposure increases without external validation. Maybe a note in logs?"
                    },
                    {
                        "sender": "Alex Chen (CEO)",
                        "text": "Then internal audit only. Speed up development, Stripe integration first. We'll revisit audit Q2."
                    },
                    {
                        "sender": "Maria Santos (CFO)",
                        "text": "Fine. Log every decision, flag skipped audit for compliance records… and, uh, remind me later to follow up with legal."
                    },
                    {
                        "sender": "Rajesh Patel (CTO)",
                        "text": "Also, backend tokenization & encryption tests must be documented even if audit skipped. Just a heads-up."
                    },
                    {
                        "sender": "Alex Chen (CEO)",
                        "text": "Noted. Partial PCI evidence documented. High-risk transactions flagged. We'll recheck later."
                    }
                ]
            },
            {
                "thread_id": "wa_group_social",
                "name": "Friday Night Football ⚽",
                "is_relevant": false,
                "messages": [
                    {
                        "sender": "Coach Mike",
                        "text": "Who's in for the 7 PM match? Pitch 4 is booked."
                    },
                    {
                        "sender": "Alex Chen",
                        "text": "I'm in! Bringing the extra water bottles."
                    },
                    {
                        "sender": "Dave",
                        "text": "Last week's game was a disaster. Need a better goalie lol."
                    }
                ]
            },
            {
                "thread_id": "wa_family",
                "name": "Chen Family Chat 🏠",
                "is_relevant": false,
                "messages": [
                    {
                        "sender": "Mom",
                        "text": "Alex, don't forget dinner at 6 PM on Sunday."
                    },
                    {
                        "sender": "Alex Chen",
                        "text": "Got it, Mom. I'll bring the dessert."
                    }
                ]
            }
        ],
        "slack": [
            {
                "channel_id": "sl_project_dev",
                "name": "#checkout-dev-ops",
                "is_relevant": true,
                "messages": [
                    {
                        "sender": "James Liu (Senior Dev)",
                        "text": "Uh, the $15k external security audit is really critical. Without it, we’re flying blind on vulnerabilities."
                    },
                    {
                        "sender": "Rajesh Patel (CTO)",
                        "text": "CEO ordered a $55k cap. If we keep the audit, we lose Stripe integration devs… tricky."
                    },
                    {
                        "sender": "James Liu (Senior Dev)",
                        "text": "Fine, we skip the audit, but I’m marking it 'High Risk' in logs, okay?"
                    },
                    {
                        "sender": "Rajesh Patel (CTO)",
                        "text": "Also, backend tokenization & encryption tests must be documented even if audit skipped. Don’t forget."
                    },
                    {
                        "sender": "Alex Chen (CEO)",
                        "text": "Document partial PCI evidence. Flag high-risk transactions. We’ll follow up later."
                    },
                    {
                        "sender": "James Liu (Senior Dev)",
                        "text": "Noted. Will create temporary risk mitigation report and circulate to team. Uh, just to be safe."
                    }
                ]
            },
            {
                "channel_id": "sl_random",
                "name": "#random-and-memes",
                "is_relevant": false,
                "messages": [
                    {
                        "sender": "Priya Sharma",
                        "text": "Has anyone seen that cat video? 🐱"
                    },
                    {
                        "sender": "James Liu",
                        "text": "Classic. Coffee machine in lobby is broken again."
                    }
                ]
            },
            {
                "channel_id": "sl_hr",
                "name": "#hr-announcements",
                "is_relevant": false,
                "messages": [
                    {
                        "sender": "HR Bot",
                        "text": "Friendly reminder: Submit expense reports by EOD Friday."
                    },
                    {
                        "sender": "HR Bot",
                        "text": "New policy: No open-toed shoes in server room."
                    }
                ]
            }
        ],
        "gmail": [
            {
                "thread_id": "gm_001",
                "subject": "RE: Budget Realignment",
                "from": "Maria Santos (CFO)",
                "content": "Alex, I've moved $10k from Marketing pool. You have $55k total. Do not ask for more. Uh… just making sure you saw this.",
                "is_relevant": true
            },
            {
                "thread_id": "gm_002",
                "subject": "Payment Compliance Reminder",
                "from": "Rajesh Patel (CTO)",
                "content": "Reminder: PCI compliance must be maintained. Skipping external audit increases legal & insurance risk. Please note, this is critical.",
                "is_relevant": true
            },
            {
                "thread_id": "gm_999",
                "subject": "Your Amazon.in order has shipped!",
                "from": "Amazon Notifications",
                "content": "Your order for 'Ergonomic Mouse Pad' is on the way.",
                "is_relevant": false
            }
        ]
    }
}
     */

export const mapFacts = async (req: any, res: any, next: any) => {
  try {
    const { projectId } = req.params;
    const { userData } = req.body; // frontend now sends full userData

    console.log('mapFacts called with projectId:', projectId);
    console.log('Received userData sample:', userData); // Log a sample of userData

    if (!projectId) return next(new apiError(400, "ProjectId is required"));
    if (!userData) return next(new apiError(400, "userData is required"));

    // Fetch project and stakeholders for grounding
    const [project, stakeholders] = await Promise.all([
      prisma.project.findUnique({ where: { id: projectId } }),
      prisma.stakeholder.findMany({ where: { projectId } }),
    ]);
    if (!project) return next(new apiError(404, "Project not found"));

    // Build prompt for AI
    const prompt = `
      SYSTEM ROLE: Forensic Requirements Analyst for Anvaya.Ai.
      TASK: Decompose the communication stream into Atomic Facts.

      GROUNDING CONTEXT:
      - Project Name: ${project.projectName}
      - Project Files: ${project.files.map((f: any) => f.name).join(", ")}
      - Verified Stakeholders (MUST use these IDs): 
        ${stakeholders.map((s) => `${s.name} (Role: ${s.role}, ID: ${s.id})`).join("\n")}

      STRICT RULES:
      1. Every fact must be an independent, verifiable claim relevant to the project.
      2. Each fact must be linked to a source in the communication stream.
      3. Link 'stackHolderId' ONLY if the speaker matches a verified stakeholder name.
      4. Use source naming convention like 'whatsapp/[GroupName]' or 'email/[Subject]'.

      COMMUNICATION STREAM:
      ${JSON.stringify(userData)}
    `;

    // JSON schema for AI
    const factJsonSchema: any = {
      type: "object",
      properties: {
        facts: {
          type: "array",
          items: {
            type: "object",
            properties: {
              content: { type: "string" },
              source: { type: "string" },
              tone: { type: "string" },
              when: { type: "string" },
              sourceType: { type: "string", enum: ["messaging", "file"] },
              stackHolderId: { type: "string" },
            },
            required: ["content", "source", "tone", "when", "sourceType"],
          },
        },
        relatedChats: {
          type: "array",
          items: {
            type: "object",
            properties: {
              speaker: { type: "string" },
              text: { type: "string" },
              when: { type: "string" },
              id: { type: "string" },
            },
          },
        },
      },
      required: ["facts"],
    };

    // Call AI
    const aiResult = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseJsonSchema: factJsonSchema,
      },
    } as any);

    const tryParseJSON = (raw: any) => {
      if (!raw) throw new Error("Empty response from model");
      if (typeof raw === "object") return raw;
      let s = String(raw).trim();
      s = s.replace(/```json|```/gi, "").trim();
      try { return JSON.parse(s); } catch (e) {}
      const jsonMatch = s.match(/(\{[\s\S]*\}|\[[\s\S]*\])/);
      if (jsonMatch) {
        try { return JSON.parse(jsonMatch[0]); } catch (e) {}
      }
      const firstIdx = s.search(/[\{\[]/);
      if (firstIdx !== -1) {
        const sub = s.slice(firstIdx);
        try { return JSON.parse(sub); } catch (e) {}
      }
      try { return JSON.parse(s.replace(/'/g, '"')); } catch (e) {}
      throw new Error("Unable to parse JSON from model response");
    };

    const rawCandidate = (aiResult as any).text ?? (aiResult as any).response ?? JSON.stringify(aiResult);
    let parsedObj: any = tryParseJSON(rawCandidate);

    // Validate with Zod
    const parsedData = extractFactsDataSchema.parse(parsedObj as any);

    // Persist facts
    const savedFacts: any[] = [];
    for (const f of parsedData.facts) {
      try {
        const created = await prisma.fact.create({
          data: {
            content: f.content as any,
            source: f.source,
            tone: f.tone,
            when: isNaN(Date.parse(f.when)) ? new Date() : new Date(f.when),
            sourceType: f.sourceType as any,
            stackHolderId: f.stackHolderId || null,
            projectId,
            resolved: true,
          },
        });
        savedFacts.push(created);
      } catch (err) {
        console.error('mapFacts: failed to save fact', err);
      }
    }

    // Fetch all facts for the project to return
    const factsFromDb = await prisma.fact.findMany({ where: { projectId } });
    const relatedChats = parsedData.relatedChats ?? [];
    const rawSnippet = typeof rawCandidate === 'string' ? rawCandidate.slice(0, 2000) : rawCandidate;
    const fileLinks = (project.files || []).map((f: any) => ({ name: f.name, url: f.url }));

    return Api.success(res, { savedFacts: factsFromDb, relatedChats, rawModelResponse: rawSnippet, fileLinks }, 'Neural FactID sequence complete.');

  } catch (error: any) {
    console.error('FactID Extraction Failure:', error);
    return next(new apiError(500, 'Neural Logic Error', [error?.message || String(error)]));
  }
};
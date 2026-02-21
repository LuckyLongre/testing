File 1: The "Evidence" (Vendor Quote)
File Name: CyberSafe_Security_Audit_Proposal.txt
Purpose: This provides the "Fact" that the audit costs $15,000, which is the source of the conflict.

Plaintext
VENDORS PROPOSAL: CYBERSAFE SECURITY SOLUTIONS
Date: February 02, 2024
To: Alex Chen (CEO), E-Commerce Corp.

PROJECT: PCI-DSS Compliance & Penetration Test
--------------------------------------------------
Scope of Work:
1. Comprehensive Penetration Testing of Checkout Microservices.
2. PCI-DSS Level 2 Readiness Assessment.
3. Vulnerability Remediation Report.

TOTAL COST: $15,000.00 USD
Timeline: 14 business days from kickoff.

NOTE: This external audit is strictly required for the 'Pro' Tier payment processing license. 
Internal scans are insufficient for full compliance under current insurance policies.
--------------------------------------------------
Authorized by: Sarah Jenkins, Lead Auditor
File 2: The "Context" (Meeting Transcript)
File Name: Meeting_Transcript_Feb05.txt
Purpose: This shows a conversation that the AI must analyze to understand the "Authority" in the project.

Plaintext
MEETING: Technical Architecture Review (Stakeholders Sync)
DATE: Feb 05, 2024
PARTICIPANTS: Alex Chen (CEO), Rajesh Patel (CTO), Maria Santos (CFO)

[00:05:12] Rajesh (CTO): I’ve shared the CyberSafe proposal. It’s $15,000. We need to sign this by Friday to stay on track for the March 31 launch.

[00:06:45] Maria (CFO): Rajesh, I’m looking at the ledger. We only have $55k total for the whole project. If we spend $15k on an audit, we can't afford the Stripe senior integration developers.

[00:07:30] Alex (CEO): Can we push the audit to Q2?

[00:07:45] Rajesh (CTO): It's a risk, Alex. If we have a breach, the internal scan won't protect us legally.

[00:08:10] Alex (CEO): I understand the risk. But the launch date is non-negotiable for the investors. I’m making the call: Skip the external audit for now. Use the $15k for development speed. 

[00:08:30] Maria (CFO): Agreed. Budget is locked at $55k with no audit fee.
🛠️ How to use these in your Hackathon Demo
The "Upload" Moment: During your presentation, say: "I'm now uploading the official quote from the security vendor and the transcript from our kickoff meeting."

The "Analysis" Moment: Your AI will read the chats (where the Devs are complaining) and then read these files (where the CEO makes the final decision).

The "Conflict" Moment: The AI should say:

"Conflict Detected: The Technical Security Standard (v1.2) requires an audit, but the Executive Meeting Transcript (Feb 05) shows a CEO decision to override this for budget reasons."

💡 Pro Tip for "Real" Analysis
In your code, when you send these to Gemini, use a "Source Header" so the AI knows which file it is reading:

JavaScript
const fileContent = fs.readFileSync('./CyberSafe_Security_Proposal.txt', 'utf8');
const prompt = `
  Analyze this DOCUMENT:
  --- FILE NAME: CyberSafe_Security_Proposal.txt ---
  ${fileContent}
  
  Compare it with the CHAT LOGS provided earlier. 
  Are there any budget or security contradictions?
`;
This makes the AI's "Citations" much better because it can say, "According to the CyberSafe_Security_Proposal.txt, the cost is $15k..." instead of just guessing! 🚀

Enough thinking—go build it!


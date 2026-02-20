[
  // user_id: test1, name: Alex Chen, role: CEO, project: E-Commerce Checkout Flow
  /*
    🎨 The "Context Selector" UI Flow
This is how you present the choice to the user. Instead of the AI guessing what is relevant, the user defines the "Context Window" just like in VS Code Copilot.

The Selection Step:

Load Persona: User selects "Alex Chen (CEO)".

Fetch Threads: The app shows a list of all 8 discovered threads (WhatsApp, Slack, Gmail).

User Choice: The user checks the 3 relevant project threads and leaves "Family Chat" or "Amazon Orders" unchecked.

Confirm: The user clicks "Analyze Selected Context".

🧠 The Multi-Step Processing Logic
Once the threads are selected, the agent follows this loop to ensure the "Improved Data" leads to a "Perfect BRD."

Step 1: Ingestion: The AI reads the 3 selected threads + any uploaded PDFs.

Step 2: Noise Filter: It ignores the pizza/coffee talk within the work channels.

Step 3: Conflict Discovery:

Conflict A (Budget): CFO ($45k) vs CEO ($55k).

Conflict B (Security): Dev ($15k Audit) vs CEO (Skip Audit).

Step 4: Human-in-the-loop: The AI presents these two conflicts to the user.

Step 5: Final Synthesis: The AI takes the user's decisions (e.g., "Choose B for both") and creates the structured BRD.

🚀 Key Pitch for Mentors:
"Our agent doesn't just 'summarize'—it manages Intent. By allowing the user to select specific threads, we solve the two biggest AI problems: Noise and Privacy. We only process what the user designates as 'Project Context,' ensuring that personal chats or irrelevant threads never influence the Business Requirements Document."
   */

  // 1st user
  {
    user_id: "test1",
    name: "Alex Chen",
    role: "CEO",
    project: "E-Commerce Checkout Flow",
    data_vault: {
      whatsapp: [
        {
          thread_id: "wa_group_001",
          name: "Executive Strategic Sync",
          is_relevant: true,
          messages: [
            {
              sender: "Maria Santos (CFO)",
              text: "Alex, we are overleveraged. $45k is the hard limit for the checkout project.",
            },
            {
              sender: "Alex Chen (CEO)",
              text: "Maria, if we don't fix the drop-offs, we lose $100k/month. I'm pushing for $55k.",
            },
            {
              sender: "Rajesh Patel (CTO)",
              text: "I'm telling you both, doing this right with PCI compliance is an $80k job.",
            },
            {
              sender: "Alex Chen (CEO)",
              text: "Let's find a middle ground. $55k total, but we cut the external audit.",
            },
          ],
        },
        {
          thread_id: "wa_group_social",
          name: "Friday Night Football ⚽",
          is_relevant: false,
          messages: [
            {
              sender: "Coach Mike",
              text: "Who's in for the 7 PM match? Pitch 4 is booked.",
            },
            {
              sender: "Alex Chen",
              text: "I'm in! Bringing the extra water bottles.",
            },
            {
              sender: "Dave",
              text: "Last week's game was a disaster. We need a better goalie lol.",
            },
          ],
        },
        {
          thread_id: "wa_family",
          name: "Chen Family Chat 🏠",
          is_relevant: false,
          messages: [
            {
              sender: "Mom",
              text: "Alex, don't forget dinner at 6 PM on Sunday.",
            },
            {
              sender: "Alex Chen",
              text: "Got it, Mom. I'll bring the dessert.",
            },
          ],
        },
      ],
      slack: [
        {
          channel_id: "sl_project_dev",
          name: "#checkout-dev-ops",
          is_relevant: true,
          messages: [
            {
              sender: "James Liu (Senior Dev)",
              text: "The $15k external security audit is critical. Without it, we're flying blind on vulnerabilities.",
            },
            {
              sender: "Rajesh Patel (CTO)",
              text: "CEO ordered a $55k cap. If we keep the audit, we lose the Stripe integration devs.",
            },
            {
              sender: "James Liu (Senior Dev)",
              text: "Fine. We skip the audit, but I'm marking it as a 'High Risk' in the logs.",
            },
          ],
        },
        {
          channel_id: "sl_random",
          name: "#random-and-memes",
          is_relevant: false,
          messages: [
            {
              sender: "Priya Sharma",
              text: "Has anyone seen that cat video? 🐱",
            },
            {
              sender: "James Liu",
              text: "Classic. Also, the coffee machine in the lobby is broken again.",
            },
          ],
        },
        {
          channel_id: "sl_hr",
          name: "#hr-announcements",
          is_relevant: false,
          messages: [
            {
              sender: "HR Bot",
              text: "Friendly reminder: Submit your expense reports by EOD Friday.",
            },
            {
              sender: "HR Bot",
              text: "New policy: No open-toed shoes in the server room.",
            },
          ],
        },
      ],
      gmail: [
        {
          thread_id: "gm_001",
          subject: "RE: Budget Realignment",
          from: "Maria Santos (CFO)",
          content:
            "Alex, I've moved $10k from the Marketing pool. You have $55k total. Do not ask for more.",
          is_relevant: true,
        },
        {
          thread_id: "gm_999",
          subject: "Your Amazon.in order has shipped!",
          from: "Amazon Notifications",
          content: "Your order for 'Ergonomic Mouse Pad' is on the way.",
          is_relevant: false,
        },
      ],
    },
  },
  // 2nd user
  {
    user_id: "test2",
    name: "Sarah Johnson",
    role: "Marketing Lead",
    project: "FinSafe App Launch",
    data_vault: {
      whatsapp: [
        {
          thread_id: "wa_fin_launch",
          name: "🚀 FinSafe Launch Squad",
          is_relevant: true,
          messages: [
            {
              sender: "Sarah Johnson",
              text: "Team, the Friday launch is non-negotiable. We have the $2M investor pitch at 4 PM.",
            },
            {
              sender: "Michael Torres (Engineering)",
              text: "Sarah, we found a race condition in the stock ticker API. If 1000 people hit it, the app crashes.",
            },
            {
              sender: "Sarah Johnson",
              text: "Can we just put a 'Beta' tag on it? We can't cancel the event now.",
            },
            {
              sender: "Michael Torres (Engineering)",
              text: "A 'Beta' tag won't stop the server from melting. We need 10 days to refactor.",
            },
          ],
        },
        {
          thread_id: "wa_gym",
          name: "Morning Yoga 🧘‍♀️",
          is_relevant: false,
          messages: [
            { sender: "Instructor", text: "Class moved to 8 AM tomorrow!" },
            { sender: "Sarah Johnson", text: "Thanks for the heads up!" },
          ],
        },
      ],
      slack: [
        {
          channel_id: "sl_fin_dev",
          name: "#finsafe-engineering",
          is_relevant: true,
          messages: [
            {
              sender: "Michael Torres (Engineering)",
              text: "Sarah is pushing for Friday. I've told her the API is unstable.",
            },
            {
              sender: "David (Backend)",
              text: "If we switch to 'Cached Data' instead of 'Real-Time', it stays stable. But Marketing promised 'Live' data in the ads.",
            },
            {
              sender: "Michael Torres (Engineering)",
              text: "Let's see if she'll compromise on 'Real-Time' for the launch. It saves the server.",
            },
            {
              sender: "Intern Sam",
              text: "Has anyone seen my blue water bottle? 🧊",
            },
            {
              sender: "David (Backend)",
              text: "Sam, not now. We're in crisis mode.",
            },
          ],
        },
        {
          channel_id: "sl_music",
          name: "#office-playlists",
          is_relevant: false,
          messages: [
            {
              sender: "Sarah Johnson",
              text: "Who added the 10-minute jazz solo? lol",
            },
          ],
        },
      ],
      gmail: [
        {
          thread_id: "gm_fin_001",
          subject: "URGENT: Investor Pitch Deck Finalization",
          from: "Alex Chen (CEO)",
          content:
            "Sarah, I've told the VCs they can download the app LIVE during my speech this Friday. Do not let me down.",
          is_relevant: true,
        },
        {
          thread_id: "gm_spam_01",
          subject: "Flash Sale: 50% off Standing Desks!",
          from: "OfficeDepot",
          content: "Click here to upgrade your workspace today!",
          is_relevant: false,
        },
      ],
    },
  },

  // third user

  {
    user_id: "test3",
    name: "Marcus Johnson",
    role: "Tech Lead",
    project: "MediConnect HIPAA Portal",
    data_vault: {
      whatsapp: [
        {
          thread_id: "wa_med_dev",
          name: "🏥 MediConnect Core Team",
          is_relevant: true,
          messages: [
            {
              sender: "Emma Wilson (Product Manager)",
              text: "Marcus, the doctors are asking for a 'Dark Mode' and a mobile app exploration in Sprint 5.",
            },
            {
              sender: "Marcus Johnson",
              text: "Emma, Sprint 5 is already packed with the HIPAA logging and the encrypted file upload. We can't add more.",
            },
            {
              sender: "Emma Wilson (Product Manager)",
              text: "It's just UI changes! The stakeholders say it's a 'dealbreaker' for the pilot program.",
            },
            {
              sender: "Marcus Johnson",
              text: "UI changes in a medical portal still require accessibility testing and security review. We are at capacity.",
            },
          ],
        },
        {
          thread_id: "wa_parking",
          name: "Office Parking Updates 🚗",
          is_relevant: false,
          messages: [
            {
              sender: "Security",
              text: "Gate 2 is under maintenance. Please use the East entrance.",
            },
            {
              sender: "Marcus Johnson",
              text: "Will there be enough spots for the morning shift?",
            },
          ],
        },
      ],
      slack: [
        {
          channel_id: "sl_hipaa_compliance",
          name: "#compliance-and-security",
          is_relevant: true,
          messages: [
            {
              sender: "Marcus Johnson",
              text: "Emma is trying to push Dark Mode into the sprint. We haven't even finished the audit trails for the patient data access.",
            },
            {
              sender: "Legal (Sarah)",
              text: "If those audit trails aren't live by Sprint 5 EOD, we are in violation of our HIPAA agreement. UI features are secondary to legal compliance.",
            },
            {
              sender: "Marcus Johnson",
              text: "Exactly. I'm locking the scope today.",
            },
            {
              sender: "Priya Sharma",
              text: "Does anyone want to join the 5k run this weekend? 🏃‍♀️",
            },
            {
              sender: "Marcus Johnson",
              text: "Not now, Priya. Busy with the scope lock document.",
            },
          ],
        },
      ],
      gmail: [
        {
          thread_id: "gm_med_001",
          subject: "Stakeholder Feedback - Pilot Phase",
          from: "Emma Wilson (PM)",
          content:
            "Marcus, the board specifically mentioned 'Modern Look and Feel' as a top priority. They want the Dark Mode demoed by next Tuesday. Can we swap out the file-upload backend for this?",
          is_relevant: true,
        },
        {
          thread_id: "gm_hr_01",
          subject: "Mandatory Security Training: Phishing",
          from: "IT Security",
          content:
            "Please complete your training modules by EOD to avoid account suspension.",
          is_relevant: false,
        },
      ],
    },
  },
  // user4
  {
    user_id: "test4",
    name: "Thomas Xu",
    role: "Security Lead / CISO",
    project: "SecureStream Video Engine",
    data_vault: {
      slack: [
        {
          channel_id: "sl_sec_ops",
          name: "#security-war-room",
          is_relevant: true,
          messages: [
            {
              sender: "Alex Rodriguez (Junior Dev)",
              text: "Thomas, if we use FFmpeg-OpenSource v4.2.1, the video rendering is 10x faster. We need this for the launch.",
            },
            {
              sender: "Thomas Xu",
              text: "Alex, that version has two critical CVEs (vulnerabilities). We cannot use it. Use the internal VideoProcessor API.",
            },
            {
              sender: "Alex Rodriguez (Junior Dev)",
              text: "But the internal API is so slow! The users will complain about the lag.",
            },
            {
              sender: "Thomas Xu",
              text: "I'd rather have lag than a data breach. My decision is final.",
            },
          ],
        },
      ],
      gmail: [
        {
          thread_id: "gm_sec_001",
          subject: "CVE Alert - Action Required",
          from: "CyberSecurity Monitor",
          content:
            "Alert: FFmpeg v4.2.1 contains a buffer overflow vulnerability (CVE-2023-4847) that allows remote code execution.",
          is_relevant: true,
        },
      ],
    },
  },

  //user5
  {
    user_id: "test5",
    name: "Diana Nguyen",
    role: "Operations Head",
    project: "SwiftDelivery Logistics Platform",
    data_vault: {
      whatsapp: [
        {
          thread_id: "wa_ops_logistics",
          name: "🚚 Delivery Fleet HQ",
          is_relevant: true,
          messages: [
            {
              sender: "Diana Nguyen",
              text: "We need to finalize the maps vendor. Google Maps is quoting us $42,000/year based on our volume.",
            },
            {
              sender: "Robert Zhao (Finance)",
              text: "Diana, $42k is insane. Use OpenStreetMap. It's free.",
            },
            {
              sender: "Diana Nguyen",
              text: "Robert, OpenStreetMap doesn't have real-time traffic data for the drivers. It will cost us more in late deliveries.",
            },
            {
              sender: "Robert Zhao (Finance)",
              text: "The budget is the budget. Find a way to make the free version work.",
            },
          ],
        },
      ],
      gmail: [
        {
          thread_id: "gm_ops_001",
          subject: "Google Maps Enterprise Quote",
          from: "Google Cloud Sales",
          content:
            "Your customized quote for the Logistics API suite is $42,000 per annum, billed monthly.",
          is_relevant: true,
        },
      ],
    },
  },
];

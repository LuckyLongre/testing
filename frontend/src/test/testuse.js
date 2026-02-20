export const user1={
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
        "participants": ["Alex Chen (CEO)", "Rajesh Patel (CTO)", "Maria Santos (CFO)"],
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
          {"sender": "Coach Mike", "text": "Who's in for the 7 PM match? Pitch 4 is booked."},
          {"sender": "Alex Chen", "text": "I'm in! Bringing the extra water bottles."},
          {"sender": "Dave", "text": "Last week's game was a disaster. Need a better goalie lol."}
        ]
      },
      {
        "thread_id": "wa_family",
        "name": "Chen Family Chat 🏠",
        "is_relevant": false,
        "messages": [
          {"sender": "Mom", "text": "Alex, don't forget dinner at 6 PM on Sunday."},
          {"sender": "Alex Chen", "text": "Got it, Mom. I'll bring the dessert."}
        ]
      }
    ],
    "slack": [
      {
        "channel_id": "sl_project_dev",
        "name": "#checkout-dev-ops",
        "is_relevant": true,
        "messages": [
          {"sender": "James Liu (Senior Dev)", "text": "Uh, the $15k external security audit is really critical. Without it, we’re flying blind on vulnerabilities."},
          {"sender": "Rajesh Patel (CTO)", "text": "CEO ordered a $55k cap. If we keep the audit, we lose Stripe integration devs… tricky."},
          {"sender": "James Liu (Senior Dev)", "text": "Fine, we skip the audit, but I’m marking it 'High Risk' in logs, okay?"}, 
          {"sender": "Rajesh Patel (CTO)", "text": "Also, backend tokenization & encryption tests must be documented even if audit skipped. Don’t forget."},
          {"sender": "Alex Chen (CEO)", "text": "Document partial PCI evidence. Flag high-risk transactions. We’ll follow up later."},
          {"sender": "James Liu (Senior Dev)", "text": "Noted. Will create temporary risk mitigation report and circulate to team. Uh, just to be safe."}
        ]
      },
      {
        "channel_id": "sl_random",
        "name": "#random-and-memes",
        "is_relevant": false,
        "messages": [
          {"sender": "Priya Sharma", "text": "Has anyone seen that cat video? 🐱"},
          {"sender": "James Liu", "text": "Classic. Coffee machine in lobby is broken again."}
        ]
      },
      {
        "channel_id": "sl_hr",
        "name": "#hr-announcements",
        "is_relevant": false,
        "messages": [
          {"sender": "HR Bot", "text": "Friendly reminder: Submit expense reports by EOD Friday."},
          {"sender": "HR Bot", "text": "New policy: No open-toed shoes in server room."}
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

export const user2={
  "user_id": "test2",
  "fullName": "Sarah Johnson",
  "email": "sarah.johnson@example.com",
  "role": "Marketing Lead",
  "project": "FinSafe App Launch",
  "data_vault": {
    "proposal": {
      "vendor": "CyberSafe Security Solutions",
      "authorized_by": "Sarah Jenkins (Lead Auditor)",
      "project": "FinSafe App Security Review & Marketing Launch Readiness",
      "scope": [
        "Review app security compliance for investor demo",
        "Provide recommendations for marketing data safety",
        "Generate vulnerability report aligned with launch requirements"
      ],
      "cost": "$12,500 USD",
      "timeline": "10 business days from kickoff",
      "mandatory_compliance": "External audit recommended for investor confidence and insurance. Internal checks alone may not be sufficient. Skipping could increase reputational and legal risk."
    },
    "meetings": [
      {
        "meeting_id": "mtg_marketing_sync_2024-02-06",
        "title": "Marketing & Security Launch Sync",
        "date": "Feb 06, 2024",
        "participants": [
          "Sarah Johnson (Marketing Lead)",
          "Michael Torres (Engineering)",
          "David (Backend)",
          "Alex Chen (CEO)"
        ],
        "minutes": [
          {
            "timestamp": "00:04:30",
            "speaker": "Sarah Johnson",
            "text": "Our Friday launch is locked for investors. We need the app demo ready and secure."
          },
          {
            "timestamp": "00:05:10",
            "speaker": "Michael Torres",
            "text": "There’s a race condition in the stock ticker API. High load could crash the app."
          },
          {
            "timestamp": "00:05:50",
            "speaker": "Sarah Johnson",
            "text": "Can we tag it as 'Beta' for the launch? Investors must see it Friday."
          },
          {
            "timestamp": "00:06:20",
            "speaker": "David (Backend)",
            "text": "Using cached data keeps it stable, but Marketing promised 'Live' updates."
          },
          {
            "timestamp": "00:06:50",
            "speaker": "Sarah Johnson",
            "text": "I understand the risk, but launch is priority. Let's go with 'Beta' disclaimer."
          },
          {
            "timestamp": "00:07:20",
            "speaker": "Michael Torres",
            "text": "Document all exceptions. Investors need transparency if issues occur."
          },
          {
            "timestamp": "00:07:50",
            "speaker": "Sarah Johnson",
            "text": "Yes, we will include a note in the investor deck and internal log."
          }
        ]
      }
    ],
    "whatsapp": [
      {
        "thread_id": "wa_fin_launch",
        "name": "🚀 FinSafe Launch Squad",
        "is_relevant": true,
        "messages": [
          {
            "sender": "Sarah Johnson",
            "text": "Team, Friday launch is non-negotiable. $2M investor pitch at 4 PM."
          },
          {
            "sender": "Michael Torres (Engineering)",
            "text": "Sarah, race condition in stock ticker. App may crash under 1000+ users."
          },
          {
            "sender": "Sarah Johnson",
            "text": "Tag it 'Beta'? Can't delay investors."
          },
          {
            "sender": "Michael Torres (Engineering)",
            "text": "'Beta' won’t fix the crash. Need 10 days to refactor."
          },
          {
            "sender": "David (Backend)",
            "text": "If we cache data, app stable, but investors expect 'Live' feed."
          },
          {
            "sender": "Sarah Johnson",
            "text": "Prioritize investor demo. Note risks in presentation."
          },
          {
            "sender": "Michael Torres (Engineering)",
            "text": "Logging exceptions and risk mitigation steps in dev log."
          },
          {
            "sender": "Intern Sam",
            "text": "Anyone seen my blue water bottle? 🧊"
          },
          {
            "sender": "David (Backend)",
            "text": "Sam, focus now is launch. Bottle can wait."
          }
        ]
      },
      {
        "thread_id": "wa_gym",
        "name": "Morning Yoga 🧘‍♀️",
        "is_relevant": false,
        "messages": [
          {
            "sender": "Instructor",
            "text": "Class moved to 8 AM tomorrow!"
          },
          {
            "sender": "Sarah Johnson",
            "text": "Thanks, noted."
          }
        ]
      }
    ],
    "slack": [
      {
        "channel_id": "sl_fin_dev",
        "name": "#finsafe-engineering",
        "is_relevant": true,
        "messages": [
          {
            "sender": "Michael Torres (Engineering)",
            "text": "Sarah is pushing for Friday launch. API is unstable."
          },
          {
            "sender": "David (Backend)",
            "text": "Cached data can stabilize, but Marketing promised 'Live' in ads."
          },
          {
            "sender": "Sarah Johnson",
            "text": "Document exceptions, note risk in investor deck."
          },
          {
            "sender": "Intern Sam",
            "text": "Has anyone seen my blue water bottle? 🧊"
          },
          {
            "sender": "David (Backend)",
            "text": "Sam, focus on launch. Water bottle later."
          }
        ]
      },
      {
        "channel_id": "sl_music",
        "name": "#office-playlists",
        "is_relevant": false,
        "messages": [
          {
            "sender": "Sarah Johnson",
            "text": "Who added the 10-min jazz solo? lol"
          }
        ]
      }
    ],
    "gmail": [
      {
        "thread_id": "gm_fin_001",
        "subject": "URGENT: Investor Pitch Deck Finalization",
        "from": "Alex Chen (CEO)",
        "content": "Sarah, VCs can download app LIVE during speech Friday. Do not let me down.",
        "is_relevant": true
      },
      {
        "thread_id": "gm_spam_01",
        "subject": "Flash Sale: 50% off Standing Desks!",
        "from": "OfficeDepot",
        "content": "Click here to upgrade your workspace today!",
        "is_relevant": false
      }
    ]
  }
}

export const user3={
  "user_id": "test4",
  "fullName": "Denver-LB Council Sync",
  "email": "denver.lb.council@example.com",
  "role": "Legislative Coordinator",
  "project": "Municipal Policy & Zoning Oversight",
  "data_vault": {
    "proposal": {
      "vendor": "Colorado Health Network, Inc.",
      "authorized_by": "Denver City Council",
      "project": "Colorado AIDS Project (CAP) Contract",
      "scope": [
        "Provide health services and support through CAP",
        "Manage existing loan agreements for neighborhood development",
        "Execute contract amendments for health-related community building"
      ],
      "cost": "$2,000,000 (Franchise Renewal/Special Revenue)",
      "timeline": "Fiscal Year 2014-2015",
      "mandatory_compliance": "Required for public health safety and municipal code adherence. Non-approval risks funding for local AIDS project and neighborhood development loans."
    },
    "meetings": [
      {
        "meeting_id": "mtg_denver_council_2014-01-06",
        "title": "Denver City Council Public Hearing",
        "date": "Jan 06, 2014",
        "participants": ["Speaker 3", "Councilman Herndon", "Councilwoman Ortega"],
        "minutes": [
          {
            "timestamp": "00:00:01",
            "speaker": "Speaker 3",
            "text": "We reconvened, we have one more required public hearing regarding zoning classification changes."
          },
          {
            "timestamp": "00:01:45",
            "speaker": "Speaker 3",
            "text": "Approves changes to zoning from M-RX-5 to M-MX-5 for property at 8822 Bee."
          }
        ]
      },
      {
        "meeting_id": "mtg_longbeach_2014-01-07",
        "title": "Long Beach Municipal Review",
        "date": "Jan 07, 2014",
        "participants": ["Speaker 1", "Speaker 2", "Councilmember Johnson"],
        "minutes": [
          {
            "timestamp": "00:05:10",
            "speaker": "Speaker 2",
            "text": "Recommendation to declare ordinance amending Long Beach Municipal Code adding Chapter 9.61."
          },
          {
            "timestamp": "00:10:20",
            "speaker": "Councilmember Johnson",
            "text": "Motion carries nine votes. Recommendation to authorize City Manager to execute amendments."
          }
        ]
      }
    ],
    "whatsapp": [
      {
        "thread_id": "wa_council_ops",
        "name": "🏛️ City Hall Strategy",
        "is_relevant": true,
        "messages": [
          {
            "sender": "Speaker 3",
            "text": "The 108th National Western Stock Show proclamation is ready for the Jan 6 session."
          },
          {
            "sender": "Speaker 2",
            "text": "Zoning classification for 8822 Bee needs final sign-off tonight."
          }
        ]
      }
    ],
    "slack": [
      {
        "channel_id": "sl_zoning_dev",
        "name": "#zoning-and-land-use",
        "is_relevant": true,
        "messages": [
          {
            "sender": "Speaker 6",
            "text": "Council bill 153 is on the floor for final consideration. Rezoning for Osage Street."
          },
          {
            "sender": "Speaker 5",
            "text": "Does this involve the $2 million franchise renewal fee? Trying to verify."
          }
        ]
      }
    ],
    "gmail": [
      {
        "thread_id": "gm_proclamation_001",
        "subject": "Martin Luther King Jr. 50th Anniversary",
        "from": "Denver Secretary",
        "content": "Proclamation celebrating MLK Jr's visit to Park Hill is approved. 13 Eyes vote passed.",
        "is_relevant": true
      }
    ]
  },
  "conflicts_and_notes": {
    "contradictions": ["Zoning changes from R-MU-30 to high-density mixed-use flagged for bulk plane limitations."],
    "budget_updates": ["$1 million additional allowed for Del Norte Neighborhood Development loan."],
    "ambiguity": ["Temporary traffic caps vs interim mitigation on billboard ordinance."]
  }
}

export const user4={
  "user_id": "test4",
  "fullName": "Liam O’Connor",
  "email": "liam.oconnor@example.com",
  "role": "Lead Developer",
  "project": "Online Learning Platform Revamp",
  "data_vault": {
    "proposal": {
      "vendor": "EduSecure Consulting",
      "authorized_by": "Nina Shah (Lead Auditor)",
      "project": "Learning Platform Security & GDPR Compliance",
      "scope": [
        "Web application penetration testing for critical modules",
        "GDPR data privacy compliance audit covering user data and storage policies",
        "Detailed vulnerability report with remediation plans for identified risks",
        "Comprehensive risk documentation for internal and external stakeholders"
      ],
      "cost": "$12,500 USD",
      "timeline": "12 business days",
      "mandatory_compliance": "External audit required for GDPR certification. Internal developer-only checks are insufficient. Skipping or partially performing the audit risks regulatory fines, loss of customer trust, and potential legal exposure."
    },
    "meetings": [
      {
        "meeting_id": "mtg_gdpr_review_2024-02-12",
        "title": "GDPR Compliance & Security Sync",
        "date": "Feb 12, 2024",
        "participants": ["Liam O’Connor (Lead Dev)", "Eva Müller (CTO)", "Oliver Reed (CFO)"],
        "minutes": [
          {
            "timestamp": "00:02:15",
            "speaker": "Eva (CTO)",
            "text": "Okay, so Nina’s proposal… $12,500 for 12 days. Uh, this is critical for GDPR compliance. We can’t skip any key audits."
          },
          {
            "timestamp": "00:03:00",
            "speaker": "Oliver (CFO)",
            "text": "Hmm, $12.5k… Our total sprint budget is $40k. Spending that leaves less for new learning features. So, uh… trade-offs here."
          },
          {
            "timestamp": "00:03:40",
            "speaker": "Liam (Lead Dev)",
            "text": "Yeah, I get it. Uh, maybe we can do partial audit? Critical modules first, minor modules later… just to stay on schedule."
          },
          {
            "timestamp": "00:04:10",
            "speaker": "Eva (CTO)",
            "text": "Partial audit = high risk. Uh, only documented mitigation counts. Anything skipped flagged properly. We don’t want regulators complaining."
          },
          {
            "timestamp": "00:04:20",
            "speaker": "Oliver (CFO)",
            "text": "Uh-huh… agreed. But, budget is $40k cap. $12.5k for core audit, dev gets remaining. Make sure we note all decisions for accountability."
          },
          {
            "timestamp": "00:04:50",
            "speaker": "Liam (Lead Dev)",
            "text": "Okay, hmm… I’ll ensure skipped modules are documented, risk levels assigned. Dev team will prioritize API endpoints handling personal data and payments first."
          },
          {
            "timestamp": "00:05:25",
            "speaker": "Eva (CTO)",
            "text": "Good. Uh, don’t forget testing encryption, access controls, logging compliance. Minor UI modules can wait, but logged in the mitigation register."
          },
          {
            "timestamp": "00:05:55",
            "speaker": "Oliver (CFO)",
            "text": "Also, just flag… some side tasks like email notifications and badges are less critical. Uh… can temporarily defer but still log them."
          },
          {
            "timestamp": "00:06:25",
            "speaker": "Liam (Lead Dev)",
            "text": "Yeah, yeah… makes sense. Partial audit for non-critical modules, logged. Major modules get full review. Uh… will communicate this to QA and Dev teams."
          },
          {
            "timestamp": "00:06:50",
            "speaker": "Eva (CTO)",
            "text": "Okay, cool. Just a note: regulators can request evidence at any point, so mitigation logs must be clear, timestamped, and complete. Uh… don’t want any gaps."
          },
          {
            "timestamp": "00:07:20",
            "speaker": "Liam (Lead Dev)",
            "text": "Got it. I’ll assign internal reviewers for skipped modules. High-risk modules get external auditor sign-off. Uh… so we’re covered."
          },
          {
            "timestamp": "00:07:50",
            "speaker": "Oliver (CFO)",
            "text": "And… just to note, dev team is slightly concerned about timeline. Hmm… maybe we need extra hours for the API security testing."
          },
          {
            "timestamp": "00:08:15",
            "speaker": "Liam (Lead Dev)",
            "text": "Yeah, we can shuffle resources. Uh… might need minor overtime. But overall, $12.5k is acceptable for this sprint."
          },
          {
            "timestamp": "00:08:40",
            "speaker": "Eva (CTO)",
            "text": "Perfect. Uh… just remember, partial audit decisions, budget notes, risk assignments—everything logged. Transparency is key if regulators check later."
          },
          {
            "timestamp": "00:09:10",
            "speaker": "Liam (Lead Dev)",
            "text": "Noted. Uh-huh… we’ll document everything carefully. I’ll send a summary to CFO and auditor by EOD."
          }
        ]
      }
    ],
    "whatsapp": [
      {
        "thread_id": "wa_gdpr_team",
        "name": "GDPR & Security Ops",
        "is_relevant": true,
        "messages": [
          {"sender": "Oliver (CFO)", "text": "Liam, this audit cost tightens budget. Uh… keep an eye on dev funds."},
          {"sender": "Liam (Lead Dev)", "text": "I know, but regulators demand certified external check. Partial mitigation logs only. Hm… we can adjust later."},
          {"sender": "Eva (CTO)", "text": "High risk modules flagged, documentation ongoing. Uh… minor modules deferred but logged."},
          {"sender": "Liam (Lead Dev)", "text": "All noted. Uh-huh… team prioritizing critical endpoints first."},
          {"sender": "Oliver (CFO)", "text": "Good. Just ensure audit logs timestamped and decisions documented. Hmm… don’t miss anything."}
        ]
      }
    ],
    "slack": [
      {
        "channel_id": "sl_learning_dev",
        "name": "#learning-dev-ops",
        "is_relevant": true,
        "messages": [
          {"sender": "Sara Kim (Senior Dev)", "text": "GDPR audit essential. Partial = logged as high risk. Uh… do not skip critical modules."},
          {"sender": "Liam (Lead Dev)", "text": "Noted. Temporary mitigation report will cover skipped modules. Uh-huh… all timestamps included."},
          {"sender": "Eva (CTO)", "text": "Make sure encryption, access control checks documented. Hm… side modules deferred but logged."}
        ]
      }
    ],
    "gmail": [
      {
        "thread_id": "gm_gdpr_001",
        "subject": "GDPR Audit Funding",
        "from": "Oliver Reed (CFO)",
        "content": "Audit $12.5k, dev gets remaining. Document partial checks. Uh… make sure all risk logs are complete.",
        "is_relevant": true
      }
    ],
    "vendor_stakeholders": {
      "direct": ["Liam O’Connor's dev team (Lead Dev, CTO, CFO)"],
      "execution": ["EduSecure consulting team"],
      "indirect": ["GDPR regulator, Platform Users, Investors"]
    },
    "conflicts_and_notes": {
      "contradictions": ["Audit mandatory but partial execution decided."],
      "budget_updates": ["$12.5k audit approved, dev funds adjusted."],
      "ambiguity": ["Partial mitigation documented, regulator acceptance unclear."]
    }
  }
}

export const user5 = {
  "user_id": "test5",
  "fullName": "Michael Vance",
  "email": "michael.vance@example.com",
  "role": "Legislative Coordinator",
  "project": "Municipal Policy & Infrastructure Oversight",
  "data_vault": {
    "proposal": {
      "vendor": "Chevrolet of Watsonville",
      "authorized_by": "Long Beach City Council",
      "project": "Municipal Fleet Procurement & Infrastructure",
      "scope": [
        "Adopt Specifications No. ITB FS14-042 for vehicle fleet",
        "Authorize City Manager to execute fleet contracts",
        "Coordinate with Financial Management for budget approval"
      ],
      "cost": "Budgeted under Specification No. ITB FS14-042",
      "timeline": "Fiscal Year 2014-2015",
      "mandatory_compliance": "Required for municipal service continuity. Failure to award contract risks operational delays in city departments."
    },
    "meetings": [
      {
        "meeting_id": "mtg_denver_airport_2015-01-05",
        "title": "Denver Airport Enterprises Review",
        "date": "Jan 05, 2015",
        "participants": ["Speaker 7", "DAE Representatives"],
        "minutes": [
          {
            "timestamp": "00:10:15",
            "speaker": "Speaker 7",
            "text": "Help me understand this: eliminating the mid-term refurbishment requirement means DAE completes work differently?"
          },
          {
            "timestamp": "00:12:40",
            "speaker": "DAE Rep",
            "text": "Correct, it streamlines the agreement to document DAE's commitment without rigid mid-term breaks."
          }
        ]
      },
      {
        "meeting_id": "mtg_alameda_lease_2015-01-20",
        "title": "Alameda Lease Final Passage",
        "date": "Jan 20, 2015",
        "participants": ["Speaker 0", "City Staff"],
        "minutes": [
          {
            "timestamp": "00:05:20",
            "speaker": "Speaker 0",
            "text": "Apparently we can't do the lease because we've been told by various city official staff members there are blocks."
          }
        ]
      }
    ],
    "whatsapp": [
      {
        "thread_id": "wa_city_ops",
        "name": "🏛️ City Hall Strategy",
        "is_relevant": true,
        "messages": [
          { "sender": "Speaker 3", "text": "The Tuskegee Airmen proclamation is set for Feb 24." },
          { "sender": "Speaker 5", "text": "Is the Inclusionary Housing Ordinance (IHO) presentation ready for the 25th?" }
        ]
      },
      {
        "thread_id": "wa_interns",
        "name": "Intern Hangout",
        "is_relevant": false,
        "messages": [
          { "sender": "Intern Sam", "text": "Has anyone seen my blue water bottle? 🧊" },
          { "sender": "David", "text": "Sam, focus on the council report." }
        ]
      }
    ],
    "slack": [
      {
        "channel_id": "sl_zoning",
        "name": "#zoning-land-use",
        "is_relevant": true,
        "messages": [
          { "sender": "Speaker 3", "text": "Rezoning parcel at 2728 Zuni St from PUD 437 to C-MX-5 is on the floor." }
        ]
      },
      {
        "channel_id": "sl_office_fun",
        "name": "#playlists",
        "is_relevant": false,
        "messages": [
          { "sender": "Sarah", "text": "Who added the 10-min jazz solo? lol" }
        ]
      }
    ],
    "gmail": [
      {
        "thread_id": "gm_proclamation_109",
        "subject": "National Western Stock Show Proclamation",
        "from": "Speaker 5",
        "content": "Proclamation number ten is welcoming the 109th National Western Stock Show to Denver.",
        "is_relevant": true
      }
    ]
  }
}
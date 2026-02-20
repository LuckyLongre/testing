# 📘 README – User 2 Mock Data  
## Project: FinSafe App Launch  

---

## 📌 Overview
This dataset represents the final stage of the **FinSafe App** launch, led by **Sarah Johnson (Marketing Lead)**. The project is under extreme pressure to deliver a live demo for a **$2M investor pitch** scheduled for Friday.

The data captures the high-stakes conflict between marketing promises, investor expectations, and severe technical instability (API race conditions) identified by the engineering team.

---

## 🧩 Core Scenario
The FinSafe platform is set for a live download during an investor presentation, but a critical backend flaw threatens the entire event.

### Engineering Findings:
- **Critical Issue:** A race condition exists in the stock ticker API.
- **System Failure:** The app is projected to crash if more than 1,000 concurrent users (like live investors) access the feed.
- **Marketing Conflict:** Marketing has promised a "Live Updates" feature, but the system is only stable when using "Cached Data."

### Proposed Mitigation:
- Label the launch as a **"Beta"** version.
- Implement a data caching strategy to prevent crashes (disabling live updates).
- Full transparency with investors through risk disclosures in the pitch deck.

---

## 📂 Included Artifacts

### 1️⃣ Security & Compliance Proposal
- **Vendor:** CyberSafe Security Solutions  
- **Scope:** Review compliance for investor demo, marketing data safety, and vulnerability reporting.  
- **Cost:** $12,500 USD  
- **Mandatory Compliance:** Recommended for insurance and investor confidence; skipping increases legal/reputational risk.

### 2️⃣ Launch Sync Transcript
- **Participants:** Sarah Johnson (Marketing), Michael Torres (Engineering), David (Backend), Alex Chen (CEO).
- **Key Decision:** Sarah prioritizes the launch date over full technical resolution, choosing to proceed with a "Beta" disclaimer despite the risk of system failure.

### 3️⃣ Communication Logs (WhatsApp/Slack/Email)
- **Urgency:** CEO Alex Chen confirms VCs will download the app *live* during the Friday speech.
- **Engineering Warning:** Michael Torres insists on 10 days for a full refactor, which is denied by Marketing.
- **Conflict:** Discussion on "Live" vs "Cached" data feeds to maintain stability.

---

## ⚖ Stakeholder Mapping

### 🔴 TIER 1 – Internal Decision Makers
- **Sarah Johnson (Marketing Lead):** Driving the non-negotiable Friday launch deadline.
- **Alex Chen (CEO):** Managing investor relations and providing the final "Do not let me down" directive.

### 🟠 TIER 2 – Internal Execution
- **Michael Torres (Engineering):** Technical risk owner; flagging race conditions and app crashes.
- **David (Backend):** Responsible for the data caching/stability workaround.
- **Intern Sam:** (Irrelevant to launch, looking for a water bottle).

### 🟡 TIER 3 – External Stakeholders
- **CyberSafe Security Solutions:** External audit vendor.
- **Investors/VCs:** $2M stake; expecting a live, functional app.

---

## 🔄 Key Conflicts in the Dataset

1. **Launch Speed vs. System Reliability** The $2M investor pitch deadline (Friday) vs. the 10-day engineering refactor requirement.

2. **Marketing Accuracy vs. Technical Reality** The promise of "Live" updates in ads vs. the necessity of "Cached" data for stability.

3. **Transparency vs. Impression** CEO's push for a perfect "Live" demo vs. Engineering's push to document all exceptions and failures.

---

## ⚠ Identified Risks

- **System Crash:** High probability of app failure during the live demo under load.
- **Trust Erosion:** Investors may react poorly to "Beta" labels or cached data if "Live" was promised.
- **Reputational Damage:** Potential for public failure if the crash affects real users post-pitch.
- **Legal/Insurance Exposure:** Skipping a full external audit prior to a live financial product launch.

---

## ❓ Ambiguities

- Will the "Beta" disclaimer be enough to protect legal standing if user funds are mismanaged?
- Can the engineering team stabilize the stock ticker API with caching without making the app look "stale" to VCs?
- How much detail regarding the "Race Condition" should be included in the investor logs?

---

## 🎯 Purpose of This Dataset

This mock data is designed to simulate:
- **Executive trade-offs** between technical debt and business milestones.
- **Crisis communication** between technical and non-technical leads.
- **Risk documentation** within a high-concurrency environment.
- **Stakeholder management** under aggressive financial deadlines.
---
title: "From Conti to Chaos: A Threat Evolution"
author: "JohnSeanson"
date: "2025-07-29"
minimal_mistakes_skin: dark
author_profile: true
read_time: true
comments: true
share: true
related: true
tags:
  - ransomware
  - Conti
  - Royal
  - BlackSuit
  - Chaos
  - TTPs
  - cybersecurity
  - RaaS
repository: "https://github.com/johnseanson"
lab_companion: true
references:
  - title: "Cybereason vs. Conti Ransomware: A Comparative Analysis"
    publisher: "Cybereason"
  - title: "Royal Rumble: Analysis of Royal Ransomware"
    publisher: "Cybereason"
  - title: "#StopRansomware: Blacksuit (Royal) Ransomware (Advisory AA23‑061A)"
    publisher: "CISA & FBI"
  - title: "Unmasking the New Chaos RaaS group attacks"
    publisher: "Cisco Talos"
    date: "2025-07-24"
---

# From Conti to Chaos: A Threat Evolution

## Introduction

In the realm of ransomware, understanding how one family morphs into another is crucial for staying ahead of attacks. This report traces the evolutionary path from the notorious Conti ransomware syndicate, through the rise of Royal and its rebrand as BlackSuit, and ultimately to the modern Chaos RaaS operation. We’ll explore how Tactics, Techniques, and Procedures (TTPs) are shared, refined, and repackaged by successive affiliates—revealing the interconnected underworld of ransomware development.

A companion research lab will be published in relation to this report, exploring various methods used in ransomware attacks, key vulnerabilities that are exploited, and defensive strategies to prevent data extortion. Stay tuned at [github.com/johnseanson](https://github.com/johnseanson).

---

## 1. Conti’s Legacy (2020-2022)

Long before Royal or Chaos appeared, Conti set the standard for enterprise‑scale extortion. Known for its rapid encryption, double extortion, and robust affiliate model, Conti leveraged:

- **Cobalt Strike** for post‑exploit lateral movement
- **PowerShell obfuscation** and LOLBins (e.g., `wmic`, `psexec`)
- **Massive data theft** ahead of encryption
- **Leak site operations** displaying stolen data to pressure victims

In mid‑2023, Cybereason’s analysis highlighted how many emerging families—most notably Royal and BlackSuit—borrowed Conti’s code modules and operational playbooks, suggesting shared developers or affiliate cross‑pollination. Conti’s early successes fueled their later metamorphosis into subsequent, more adept iterations.

---

## 2. The Rise of Royal (Early 2022)

Building on Conti’s groundwork, Royal made its debut in January 2022. Royal introduced **partial‑encryption**, enabling operators to lock only a fraction of each file—trading full coverage for faster network‑wide impact. Key features included:

- **Shadow‑copy deletion** (`vssadmin delete shadows /all /quiet`) to hinder restoration
- **Multi‑threaded encryption** for rapid deployment
- **Double extortion:** exfiltrate data, then encrypt and threaten public exposure
- **Phishing‑delivered loaders** (QBot, BatLoader) and Cobalt Strike beacons became Royal’s hallmark, targeting sectors from healthcare to manufacturing.

---

## 3. Government Pushback: CISA/FBI Advisory (March 2023)

By March 2, 2023, Royal’s widespread impact prompted a joint CISA & FBI #StopRansomware advisory (AA23‑061A). With this bulletin Royal’s TTPs and Indicators of Compromise were codified:

- **Initial Access:** Phishing, RDP compromise, public‐facing exploits
- **Execution:** Cobalt Strike, PowerShell loaders
- **Persistence:** Scheduled tasks, registry run keys
- **Impact:** Configurable encryption, data theft, ransom demands
- **IOCs:** `.royal` extension, `README.TXT`, known domains/IPs

Defenders gained a unified playbook to detect and thwart Royal attacks—Royal’s operators were swift to adapt.

---

## 4. Transformation to BlackSuit (August 2024)

With pressure building from takedowns and public exposure, Royal’s core operators rebranded as BlackSuit in August 2024. Various enhancements rolled out, including:

- **Full‑scale data exfiltration** prior to any encryption
- **Professional leak site** with countdowns and shame tactics creating pressure
- **Escalated ransom demands** (reports up to $60 million in one case)
- **RMM‑driven persistence**, abusing AnyDesk and ScreenConnect

BlackSuit’s lineage was unmistakable: the same TTPs, file markers, and negotiation style refined for “big‑game hunting” against higher‑value targets. This marked a dangerous level of sophistication from the syndicate.

---

## 5. Rebirth of Chaos (February 2025)

In early 2025, Cisco Talos IR documented a new “Chaos” RaaS that shared the 2021 namesake, causing confusion. It bore the operational fingerprints of Royal/BlackSuit/Conti affiliates. This iteration featured:

- **Affiliate recruitment on Russian‑language forums**
- **Voice phishing (vishing)** combined with spam flooding
- **Obfuscated PowerShell scripts** (`-enc` flags) for stealth
- **Selective `.chaos`-extension encryption** and double extortion
- **Data exfiltration via GoodSync** and other legitimate sync tools

On July 24, 2025, Talos published “Unmasking the New Chaos RaaS,” profiling its refined tradecraft:

**Victimology:** U.S. enterprises, plus UK, New Zealand, India

**Kill Chain Highlights:**
- Spam + vishing → RMM implant
- PowerShell & WMI for discovery
- GoodSync exfiltration
- Multi‑threaded encryption → leak site extortion

**Defense Evasion:** Anti‑analysis checks, sandbox detection, timing delays

Talos concluded that this Chaos represents a strategic continuation of the Conti → Royal → BlackSuit lineage, now offered as a streamlined RaaS. While Conti originally only operated on their own, after years of cat and mouse they finally have matured to a fully-fledged service—their most dangerous iteration yet.

---

## Conclusion

From Conti’s original blueprint to Royal’s innovation, BlackSuit’s professional rebranding, and today’s Chaos RaaS affiliate model, this continuum of code and tactics underscores the persistence of Eastern‑European ransomware ecosystems.

---

## References

- Cybereason. “Cybereason vs. Conti Ransomware: A Comparative Analysis.”
- Cybereason. “Royal Rumble: Analysis of Royal Ransomware.”
- CISA & FBI. “#StopRansomware: Blacksuit (Royal) Ransomware” (Advisory AA23‑061A).
- Cisco Talos. “Unmasking the New Chaos RaaS group attacks.” Talos Blog, July 24, 2025.

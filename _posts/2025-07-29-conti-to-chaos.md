---
title: "From Conti to Chaos: An Adaptive Threat"
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

<div class="callout">
  <strong>From Conti to Chaos:</strong> A continuum of code, tactics, and digital warfare — this post traces how one ransomware family evolves through name and technique.
</div>

## Introduction

In the realm of ransomware, understanding how one family morphs into another is crucial for staying ahead of attacks. This report traces the evolutionary path from the notorious Conti ransomware syndicate, through the rise of Royal and its rebrand as BlackSuit, and ultimately to the modern Chaos RaaS operation. We’ll explore how Tactics, Techniques, and Procedures (TTPs) are shared, refined, and repackaged by successive affiliates—revealing the interconnected underworld of ransomware development.

<div class="callout tip">
  A companion research lab will be published in relation to this report, exploring various methods used in ransomware attacks, key vulnerabilities that are exploited, and defensive strategies to prevent data exfiltration.
</div>

<a href="https://github.com/johnseanson" class="button">Stay Tuned at GitHub</a>

---

## 1. Conti’s Legacy (2020–2022)

Long before Royal or Chaos appeared, Conti set the standard for enterprise‑scale extortion. Known for its rapid encryption, double extortion, and robust affiliate model, Conti leveraged:

<div class="highlight-box">
  <ul>
    <li><strong>Cobalt Strike</strong> for post‑exploit lateral movement</li>
    <li><strong>PowerShell obfuscation</strong> and LOLBins (e.g., <code>wmic</code>, <code>psexec</code>)</li>
    <li><strong>Massive data theft</strong> ahead of encryption</li>
    <li><strong>Leak site operations</strong> displaying stolen data to pressure victims</li>
  </ul>
</div>

In mid‑2023, Cybereason’s analysis highlighted how many emerging families—most notably Royal and BlackSuit—borrowed Conti’s code modules and operational playbooks, suggesting shared developers or affiliate cross‑pollination. Conti’s early successes fueled their later metamorphosis into subsequent, more adept iterations.

---

## 2. The Rise of Royal (Early 2022)

Building on Conti’s groundwork, Royal made its debut in January 2022. Royal introduced <strong>partial‑encryption</strong>, enabling operators to lock only a fraction of each file—trading full coverage for faster network‑wide impact. Key features included:

<div class="highlight-box">
  <ul>
    <li><code>vssadmin delete shadows /all /quiet</code> to hinder restoration</li>
    <li>Multi‑threaded encryption for rapid deployment</li>
    <li>Double extortion: exfiltrate data, then encrypt and threaten public exposure</li>
    <li>Phishing‑delivered loaders (QBot, BatLoader) and Cobalt Strike beacons</li>
  </ul>
</div>

---

## 3. Government Pushback: CISA/FBI Advisory (March 2023)

By March 2, 2023, Royal’s widespread impact prompted a joint CISA & FBI #StopRansomware advisory (AA23‑061A). With this bulletin Royal’s TTPs and Indicators of Compromise were codified:

<figure>
  <img src="/assets/images/royal-advisory.png" class="hero-img" alt="Royal Ransomware Advisory">
  <figcaption style="text-align:center; font-style:italic;">
    Royal’s playbook formally codified in the joint advisory.
  </figcaption>
</figure>

<div class="info-panel">
  <ul>
    <li><strong>Initial Access:</strong> Phishing, RDP compromise, public-facing exploits</li>
    <li><strong>Execution:</strong> Cobalt Strike, PowerShell loaders</li>
    <li><strong>Persistence:</strong> Scheduled tasks, registry run keys</li>
    <li><strong>Impact:</strong> Configurable encryption, data theft, ransom demands</li>
    <li><strong>IOCs:</strong> <code>.royal</code> extension, <code>README.TXT</code>, known domains/IPs</li>
  </ul>
</div>

---

## 4. Transformation to BlackSuit (August 2024)

With pressure building from takedowns and public exposure, Royal’s core operators rebranded as BlackSuit in August 2024. Various enhancements rolled out, including:

<div class="highlight-box">
  <ul>
    <li>Full‑scale data exfiltration prior to any encryption</li>
    <li>Professional leak site with countdowns and shame tactics</li>
    <li>Escalated ransom demands (reports up to $60 million in one case)</li>
    <li>RMM‑driven persistence, abusing AnyDesk and ScreenConnect</li>
  </ul>
</div>

BlackSuit’s lineage was unmistakable: the same TTPs, file markers, and negotiation style refined for “big‑game hunting” against higher‑value targets. This marked a dangerous level of sophistication from the syndicate.

---

## 5. Rebirth of Chaos (February 2025)

In early 2025, Cisco Talos IR documented a new “Chaos” RaaS that shared the 2021 namesake, causing confusion. It bore the operational fingerprints of Royal/BlackSuit/Conti affiliates. This iteration featured:

<div class="highlight-box">
  <ul>
    <li>Affiliate recruitment on Russian‑language forums</li>
    <li>Voice phishing (vishing) combined with spam flooding</li>
    <li>Obfuscated PowerShell scripts (<code>-enc</code> flags) for stealth</li>
    <li>Selective <code>.chaos</code>-extension encryption and double extortion</li>
    <li>Data exfiltration via GoodSync and other legitimate sync tools</li>
  </ul>
</div>

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

<blockquote>
  “Conti’s DNA persists in every new iteration — from Royal’s speed to Chaos’ stealth. The threat landscape doesn’t evolve. It mutates.”
</blockquote>

From Conti’s original blueprint to Royal’s innovation, BlackSuit’s professional rebranding, and today’s Chaos RaaS affiliate model, this continuum of code and tactics underscores the persistence of Eastern‑European ransomware ecosystems.

---

## References

- Cybereason. “Cybereason vs. Conti Ransomware: A Comparative Analysis.”
- Cybereason. “Royal Rumble: Analysis of Royal Ransomware.”
- CISA & FBI. “#StopRansomware: Blacksuit (Royal) Ransomware” (Advisory AA23‑061A).
- Cisco Talos. “Unmasking the New Chaos RaaS group attacks.” Talos Blog, July 24, 2025.

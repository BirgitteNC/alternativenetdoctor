# 🔧 Fix Git Credentials - Få Git til at Spørge om Username/Password

## Problem
Git spørger ikke om username og password - det betyder at den bruger gemte credentials eller forkert remote.

---

## TRIN 1: Tjek Remote URL

I Command Prompt, kør:

```cmd
git remote -v
```

Du skal se noget som:
```
origin  https://github.com/BirgitteNC/alternativenetdoctor.git (fetch)
origin  https://github.com/BirgitteNC/alternativenetdoctor.git (push)
```

Hvis URL'en starter med `http://` i stedet for `https://`, skal du rette det.

---

## TRIN 2: Slet Gemte Credentials

### Metode A: Slet via Windows Credential Manager

1. Tryk `Windows + R`
2. Skriv: `control /name Microsoft.CredentialManager`
3. Tryk Enter
4. Gå til **"Windows Credentials"** tab
5. Find entries med "git:https://github.com" eller "github.com"
6. Klik på dem og klik **"Remove"**
7. Luk Credential Manager

### Metode B: Slet via Git Command

```cmd
git config --global --unset credential.helper
git config --system --unset credential.helper
```

---

## TRIN 3: Slet og Tilføj Remote Igen

```cmd
# Slet den gamle remote
git remote remove origin

# Tilføj remote igen (med https://)
git remote add origin https://github.com/BirgitteNC/alternativenetdoctor.git

# Tjek at det er korrekt
git remote -v
```

---

## TRIN 4: Prøv Push Igen

```cmd
git push -u origin main
```

Nu skulle Git spørge om:
- **Username**: Indtast `BirgitteNC`
- **Password**: Indtast **tokenet** du kopierede fra GitHub (ikke dit password!)

---

## TRIN 5: Hvis Det Stadig Ikke Spørger

Prøv at bruge tokenet direkte i URL'en:

```cmd
# Slet remote
git remote remove origin

# Tilføj remote med token (erstatt TOKEN med dit token)
git remote add origin https://TOKEN@github.com/BirgitteNC/alternativenetdoctor.git

# Push
git push -u origin main
```

**VIGTIGT**: Erstatt `TOKEN` med dit faktiske token (fx `ghp_xxxxxxxxxxxx`)

---

## TRIN 6: Alternativ - Brug GitHub Desktop

Hvis Git stadig ikke virker, kan du bruge GitHub Desktop:

1. Download: https://desktop.github.com
2. Installer og log ind med GitHub
3. Åbn dit projekt i GitHub Desktop
4. Klik **"Publish repository"**
5. Vælg dit GitHub repository
6. Klik **"Publish repository"**

---

**Start med TRIN 1 - tjek remote URL! 🚀**


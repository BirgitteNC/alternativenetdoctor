# 🔑 Fix GitHub 403 Fejl - Opret Personal Access Token

## Problem
GitHub accepterer ikke længere passwords direkte. Du skal bruge en Personal Access Token.

---

## TRIN 1: Opret Personal Access Token på GitHub

1. Gå til: https://github.com/settings/tokens
2. Klik **"Generate new token"** → **"Generate new token (classic)"**
3. Udfyld:
   - **Note**: `Render Deployment` (eller hvad du vil)
   - **Expiration**: Vælg **"90 days"** eller **"No expiration"**
   - **Scopes**: Check **"repo"** (dette giver fuld adgang til repositories)
4. Scroll ned og klik **"Generate token"**
5. **VIGTIGT**: Kopiér tokenet med det samme! (Du kan ikke se det igen)
   - Det ser sådan ud: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

---

## TRIN 2: Brug Tokenet i Git

Gå tilbage til din Command Prompt og kør:

```cmd
git push -u origin main
```

Når Git spørger om:
- **Username**: Indtast dit GitHub brugernavn (`BirgitteNC`)
- **Password**: Indtast **tokenet** du lige kopierede (ikke dit password!)

---

## TRIN 3: Alternativ - Gem Token i Git Credential Manager

Hvis du ikke vil indtaste tokenet hver gang:

```cmd
# Slet den gamle remote
git remote remove origin

# Tilføj remote med token i URL (erstatt TOKEN med dit token)
git remote add origin https://TOKEN@github.com/BirgitteNC/alternativenetdoctor.git

# Push
git push -u origin main
```

**ELLER** brug Git Credential Manager:

```cmd
# Gem credentials
git config --global credential.helper wincred

# Push (indtast token som password første gang)
git push -u origin main
```

---

## TRIN 4: Tjek at Push Virker

Efter push, gå til dit GitHub repository:
- Du skal nu se både `frontend` og `backend` mapper
- Alle filer skal være der

---

## TRIN 5: Gå Tilbage til Render

1. Gå til Render dashboard
2. Klik på din "alternativenetdoctor-backend" service
3. Klik **"Manual Deploy"** → **"Deploy latest commit"**
4. Render vil nu kunne deploye!

---

## Hvis Du Stadig Får Fejl

### "remote: Permission denied"
- Tjek at tokenet har "repo" scope
- Opret et nyt token hvis nødvendigt

### "fatal: unable to access"
- Prøv at slette og tilføje remote igen:
  ```cmd
  git remote remove origin
  git remote add origin https://github.com/BirgitteNC/alternativenetdoctor.git
  git push -u origin main
  ```
- Brug tokenet som password når Git spørger

---

**Start med TRIN 1 - opret tokenet på GitHub! 🚀**


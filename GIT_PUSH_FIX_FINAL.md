# 🔧 Fix Git 403 Fejl - Brug Token Direkte i URL

## Problem
Git bruger forkert bruger ("bacis-source") i stedet for din bruger. Løsning: Brug tokenet direkte i URL'en.

---

## TRIN 1: Få Dit GitHub Token

Hvis du ikke har tokenet endnu:

1. Gå til: https://github.com/settings/tokens
2. Klik **"Generate new token"** → **"Generate new token (classic)"**
3. Udfyld:
   - **Note**: `Render Deployment`
   - **Expiration**: Vælg **"No expiration"**
   - **Scopes**: Check **"repo"**
4. Klik **"Generate token"**
5. **Kopiér tokenet** (starter med `ghp_`)

---

## TRIN 2: Slet Remote og Tilføj Med Token

I Command Prompt, kør disse kommandoer:

```cmd
# 1. Slet den gamle remote
git remote remove origin

# 2. Tilføj remote med token direkte i URL'en
# ERSTATT TOKEN med dit faktiske token (fx ghp_xxxxxxxxxxxx)
git remote add origin https://TOKEN@github.com/BirgitteNC/alternativenetdoctor.git
```

**Eksempel:**
Hvis dit token er `ghp_abc123xyz456`, så skriv:
```cmd
git remote add origin https://ghp_abc123xyz456@github.com/BirgitteNC/alternativenetdoctor.git
```

---

## TRIN 3: Push Nu

```cmd
git push -u origin main
```

Nu skulle det virke! Git bruger tokenet direkte fra URL'en.

---

## TRIN 4: Tjek GitHub

1. Gå til dit GitHub repository
2. Du skal nu se både `frontend` og `backend` mapper
3. Alle filer skal være der

---

## TRIN 5: Gå Tilbage til Render

1. Gå til Render dashboard
2. Klik på din "alternativenetdoctor-backend" service
3. Klik **"Manual Deploy"** → **"Deploy latest commit"**
4. Render vil nu kunne deploye!

---

## Hvis Du Stadig Får Fejl

### Slet alle gemte credentials først:

1. Tryk `Windows + R`
2. Skriv: `control /name Microsoft.CredentialManager`
3. Tryk Enter
4. Gå til **"Windows Credentials"** tab
5. Find og slet ALLE entries med "git" eller "github"
6. Prøv TRIN 2 igen

---

**Start med TRIN 1 - få dit token og brug det direkte i URL'en! 🚀**


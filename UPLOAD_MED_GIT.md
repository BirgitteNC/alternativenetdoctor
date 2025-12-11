# 📤 Upload til GitHub med Git Command Line

## Hurtigste og Bedste Metode

---

## TRIN 1: Tjek om du har Git installeret

Åbn PowerShell og kør:

```powershell
git --version
```

Hvis du får en version (fx `git version 2.40.0`), er Git installeret.  
Hvis du får en fejl, installer Git først (se nedenfor).

---

## TRIN 2: Installer Git (hvis ikke installeret)

1. Gå til: https://git-scm.com/download/win
2. Download og installer Git for Windows
3. Genstart PowerShell efter installation
4. Test igen: `git --version`

---

## TRIN 3: Upload Projektet

Åbn PowerShell og kør disse kommandoer én ad gangen:

```powershell
# 1. Gå til dit projekt
cd C:\Users\birgi\Downloads\alternativenetdoctor

# 2. Initialiser Git repository
git init

# 3. Tilføj alle filer
git add .

# 4. Lav første commit
git commit -m "Initial commit"

# 5. Sæt main branch
git branch -M main

# 6. Tilføj GitHub som remote (erstatt med dit repository URL)
git remote add origin https://github.com/BirgitteNC/alternativenetdoctor.git

# 7. Upload til GitHub
git push -u origin main
```

---

## TRIN 4: Login til GitHub

Når du kører `git push`, bliver du bedt om at logge ind:
- Brug dit GitHub brugernavn og password
- Eller brug en Personal Access Token (hvis password ikke virker)

**Hvis password ikke virker:**
1. Gå til GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Klik "Generate new token"
3. Vælg "repo" scope
4. Kopiér tokenet og brug det som password når Git spørger

---

## TRIN 5: Vent på Upload

Git uploader alle filer. Dette kan tage 2-5 minutter afhængigt af projektstørrelse.

---

## TRIN 6: Tjek GitHub

1. Gå til dit GitHub repository
2. Du skal nu se både `frontend` og `backend` mapper
3. Klik ind i `backend` mappen - du skal se alle filer

---

## TRIN 7: Gå Tilbage til Render

1. Gå til Render dashboard
2. Klik på din "alternativenetdoctor-backend" service
3. Klik "Manual Deploy" → "Deploy latest commit"
4. Render vil nu kunne deploye!

---

## Hvis Du Får Fejl

### "fatal: not a git repository"
- Sørg for at du er i `alternativenetdoctor` mappen
- Kør `git init` først

### "remote origin already exists"
- Kør: `git remote remove origin`
- Kør derefter `git remote add origin ...` igen

### "authentication failed"
- Brug Personal Access Token i stedet for password
- Se TRIN 4 ovenfor

---

**Start med TRIN 1 - tjek om Git er installeret! 🚀**


# 📤 Upload Projekt til GitHub - Hurtig Guide

## Problem
Dit GitHub repository er tomt, så Render kan ikke deploye.

## Løsning: Upload dit projekt til GitHub

---

## TRIN 1: Opret GitHub Repository (hvis du ikke har et)

1. Gå til https://github.com
2. Klik **"+"** (øverst til højre) → **"New repository"**
3. Udfyld:
   - **Repository name**: `alternativenetdoctor`
   - **Description**: (valgfrit)
   - **Public** eller **Private** (vælg hvad du vil)
   - **DON'T** check "Add a README file" (vi har allerede filer)
   - **DON'T** check "Add .gitignore" (vi har allerede en)
4. Klik **"Create repository"**

---

## TRIN 2: Upload Filer via GitHub Web Interface

### Metode A: Drag & Drop (Nemmes)

1. På GitHub repository siden, du vil se: "uploading an existing file"
2. Klik **"uploading an existing file"** link
3. **Drag & Drop** hele `alternativenetdoctor` mappen ind i browseren
   - Eller klik "choose your files" og vælg hele mappen
4. Scroll ned og skriv commit besked: `Initial commit`
5. Klik **"Commit changes"**

**VIGTIGT**: Upload hele projektet (både `frontend` og `backend` mapper)!

---

## TRIN 3: Vent på Upload (2-5 minutter)

GitHub uploader alle filer. Dette kan tage et par minutter hvis projektet er stort.

---

## TRIN 4: Tjek at Alt er Uploadet

1. Gå til dit GitHub repository
2. Du skal se både `frontend` og `backend` mapper
3. Klik ind i `backend` mappen - du skal se filer som:
   - `package.json`
   - `config/`
   - `src/`
   - osv.

---

## TRIN 5: Gå Tilbage til Render

1. Gå til Render dashboard
2. Klik på din **"alternativenetdoctor-backend"** service
3. Klik på **"Manual Deploy"** dropdown → **"Deploy latest commit"**
4. Eller vent - Render kan automatisk detektere nye commits og deploye

---

## Alternativ: Brug GitHub Desktop (Hvis du foretrækker det)

1. Download GitHub Desktop: https://desktop.github.com
2. Installer og log ind
3. Klik **"File"** → **"Add Local Repository"**
4. Vælg din `alternativenetdoctor` mappe
5. Klik **"Publish repository"**
6. Vælg dit GitHub repository
7. Klik **"Publish repository"**

---

## Alternativ: Brug Git Command Line

Hvis du har Git installeret:

```powershell
cd C:\Users\birgi\Downloads\alternativenetdoctor
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/dit-brugernavn/alternativenetdoctor.git
git push -u origin main
```

---

## Efter Upload

1. Gå tilbage til Render
2. Render vil automatisk detektere at repository ikke længere er tomt
3. Klik **"Manual Deploy"** → **"Deploy latest commit"**
4. Eller vent - Render kan auto-deploye

---

**Start med TRIN 1 og 2 - det er den nemmeste metode! 🚀**


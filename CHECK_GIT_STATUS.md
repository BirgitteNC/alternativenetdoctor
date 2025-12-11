# 🔍 Tjek Git Status og Fix Upload

## Problem
Dit GitHub repository er stadig tomt - push'en virkede ikke.

---

## TRIN 1: Tjek Git Status

I Command Prompt, kør:

```cmd
cd C:\Users\birgi\Downloads\alternativenetdoctor
git status
```

Dette viser om filerne er committet eller ej.

---

## TRIN 2: Tjek Remote URL

```cmd
git remote -v
```

Dette viser om remote er sat korrekt.

---

## TRIN 3: Hvis Filer Ikke Er Committet

Hvis `git status` viser "Untracked files" eller "Changes not staged", kør:

```cmd
# Tilføj alle filer
git add .

# Commit filerne
git commit -m "Initial commit"

# Tjek status igen
git status
```

---

## TRIN 4: Slet Remote og Tilføj Med Token

```cmd
# Slet den gamle remote
git remote remove origin

# Tilføj remote med token (ERSTATT TOKEN med dit faktiske token)
git remote add origin https://TOKEN@github.com/BirgitteNC/alternativenetdoctor.git

# Tjek at det er korrekt
git remote -v
```

---

## TRIN 5: Push Nu

```cmd
git push -u origin main
```

Hvis det stadig fejler, prøv:

```cmd
git push -u origin main --force
```

**VIGTIGT**: `--force` overskriver alt på GitHub, så brug kun hvis repository er tomt!

---

## TRIN 6: Alternativ - Upload via GitHub Web Interface

Hvis Git stadig ikke virker:

1. Gå til dit GitHub repository
2. Klik på **"uploading an existing file"** link
3. Drag & drop hele `alternativenetdoctor` mappen
4. Commit changes

**ELLER** brug GitHub Desktop:
1. Download: https://desktop.github.com
2. Installer og log ind
3. File → Add Local Repository
4. Vælg din `alternativenetdoctor` mappe
5. Publish repository

---

## TRIN 7: Tjek GitHub Efter Upload

1. Gå til dit GitHub repository
2. Du skal se både `frontend` og `backend` mapper
3. Klik ind i `backend` mappen - du skal se filer som `package.json`, `config/`, osv.

---

**Start med TRIN 1 - tjek git status! 🚀**


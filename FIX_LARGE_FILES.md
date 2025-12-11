# 🔧 Fix Store Filer - Fjern Zip Filer fra Git

## Problem
GitHub afviser push fordi `backend.zip` og `frontend (2).zip` er for store (>100 MB).

## Løsning: Fjern zip-filerne fra Git

---

## TRIN 1: Fjern Zip Filerne fra Git

I Command Prompt, kør:

```cmd
# Fjern zip filerne fra Git (men behold dem lokalt)
git rm --cached backend.zip
git rm --cached "frontend (2).zip"
```

---

## TRIN 2: Opret .gitignore Fil

Vi skal lave en `.gitignore` fil så Git ignorerer zip-filer fremover:

```cmd
# Opret .gitignore fil
echo *.zip >> .gitignore
echo node_modules/ >> .gitignore
echo .env >> .gitignore
echo .env.local >> .gitignore
```

ELLER opret filen manuelt:
1. Opret en fil kaldet `.gitignore` i projektets rod
2. Tilføj disse linjer:
```
*.zip
node_modules/
.env
.env.local
```

---

## TRIN 3: Commit Ændringerne

```cmd
git add .gitignore
git commit -m "Remove zip files and add .gitignore"
```

---

## TRIN 4: Push Nu

```cmd
git push -u origin main
```

Nu skulle det virke! Zip-filerne er fjernet fra Git.

---

## TRIN 5: Tjek GitHub

1. Gå til dit GitHub repository
2. Du skal nu se både `frontend` og `backend` mapper
3. Du skal IKKE se zip-filerne
4. Klik ind i `backend` mappen - du skal se filer som `package.json`, `config/`, osv.

---

**Start med TRIN 1 - fjern zip-filerne fra Git! 🚀**


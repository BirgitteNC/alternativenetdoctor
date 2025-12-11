# 🔍 Find og Fjern Alle Store Filer

## Problem
Der er flere filer der er for store til GitHub (>100 MB).

---

## TRIN 1: Find Alle Store Filer

I Command Prompt, kør:

```cmd
# Find alle filer større end 50 MB
forfiles /s /m *.* /c "cmd /c if @fsize gtr 52428800 echo @path @fsize"
```

ELLER brug PowerShell (mere præcist):

```powershell
# Åbn PowerShell og kør:
Get-ChildItem -Recurse -File | Where-Object {$_.Length -gt 50MB} | Select-Object FullName, @{Name="Size(MB)";Expression={[math]::Round($_.Length/1MB,2)}}
```

---

## TRIN 2: Tjek Specifikke Steder

Store filer ligger ofte i:
- `node_modules/` mapper (skal allerede være i .gitignore)
- `build/` eller `dist/` mapper
- `.next/` mapper (Next.js build)
- Upload mapper med billeder/filer
- Database filer (.db, .sqlite)

---

## TRIN 3: Opdater .gitignore

Tilføj disse til `.gitignore`:

```cmd
# Store filer og mapper
*.zip
*.tar
*.gz
node_modules/
build/
dist/
.next/
.cache/
*.db
*.sqlite

# Uploads og media (hvis de er store)
public/uploads/
backend/public/uploads/

# Environment files
.env
.env.local
.env.*.local
```

---

## TRIN 4: Fjern Store Filer fra Git

Hvis du finder store filer, fjern dem:

```cmd
# Eksempel: Hvis der er store filer i backend/build/
git rm -r --cached backend/build/

# Eksempel: Hvis der er store filer i node_modules/
git rm -r --cached node_modules/

# Eksempel: Hvis der er store filer i .next/
git rm -r --cached frontend/.next/
```

---

## TRIN 5: Commit og Push

```cmd
git add .gitignore
git commit -m "Remove large files and update .gitignore"
git push -u origin main
```

---

## TRIN 6: Hvis Push Stadig Fejler

Hvis Git stadig klager over store filer i historikken, skal du rense historikken:

```cmd
# ADVARSEL: Dette ændrer Git historikken!
git filter-branch --force --index-filter "git rm --cached --ignore-unmatch STI-TIL-STOR-FIL" --prune-empty --tag-name-filter cat -- --all
```

ELLER brug BFG Repo-Cleaner (nemmere):
1. Download: https://rtyley.github.io/bfg-repo-cleaner/
2. Kør: `java -jar bfg.jar --strip-blobs-bigger-than 100M`

---

**Start med TRIN 1 - find alle store filer! 🚀**


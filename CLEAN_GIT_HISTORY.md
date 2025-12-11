# 🧹 Rens Git Historik - Fjern Store Filer Permanent

## Problem
Zip-filerne er stadig i Git historikken, selvom vi har fjernet dem fra den nuværende commit.

## Løsning: Rens Git Historik

---

## TRIN 1: Brug Git Filter-Branch (Avanceret)

**ADVARSEL**: Dette ændrer Git historikken permanent!

```cmd
# Fjern backend.zip fra hele historikken
git filter-branch --force --index-filter "git rm --cached --ignore-unmatch backend.zip" --prune-empty --tag-name-filter cat -- --all

# Fjern frontend (2).zip fra hele historikken
git filter-branch --force --index-filter "git rm --cached --ignore-unmatch \"frontend (2).zip\"" --prune-empty --tag-name-filter cat -- --all
```

---

## TRIN 2: Force Push (Efter Rensning)

```cmd
git push -u origin main --force
```

**VIGTIGT**: `--force` overskriver historikken på GitHub. Brug kun hvis repository er tomt eller du er sikker!

---

## TRIN 3: Alternativ - Start Forfra (Nemmere!)

Hvis historikken ikke er vigtig, kan vi starte forfra:

```cmd
# Slet .git mappen
rm -r .git

# Initialiser Git igen
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://TOKEN@github.com/BirgitteNC/alternativenetdoctor.git
git push -u origin main --force
```

---

## TRIN 4: Brug BFG Repo-Cleaner (Anbefalet)

1. Download BFG: https://rtyley.github.io/bfg-repo-cleaner/
2. Download `bfg.jar`
3. Kør:

```cmd
java -jar bfg.jar --strip-blobs-bigger-than 100M
git reflog expire --expire=now --all
git gc --prune=now --aggressive
git push --force
```

---

**Jeg anbefaler TRIN 3 (Start Forfra) hvis historikken ikke er vigtig - det er nemmest! 🚀**


# 🚀 Deploy UDEN GitHub - Direkte fra Lokal Mappe

## Render CLI er installeret - Nu skal vi bare deploye

---

## TRIN 1: Åbn CMD (ikke PowerShell)

1. Tryk `Windows + R`
2. Skriv: `cmd`
3. Tryk Enter

---

## TRIN 2: Log Ind på Render

I CMD, kør:

```cmd
cd C:\Users\birgi\Downloads\alternativenetdoctor\backend
render login
```

Dette åbner browser til login. Log ind med din Render konto.

---

## TRIN 3: Opret Service i Render Dashboard

1. Gå til https://render.com
2. Klik "New +" → "Web Service"
3. Vælg "Empty Service" eller "Deploy from local directory"
4. Noter service navnet

---

## TRIN 4: Link og Deploy

I CMD, kør:

```cmd
render link
# Vælg dit projekt og service
render deploy
```

---

## Alternativ: Brug Docker + Docker Hub (Hvis Render CLI Ikke Virker)

1. Build Docker image lokalt
2. Push til Docker Hub (gratis)
3. Deploy fra Docker Hub i Render

---

**Prøv TRIN 1-4 først - Render CLI skulle virke direkte fra lokal mappe! 🚀**


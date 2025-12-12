# 🔧 Fix Render GitHub Access

## Problem
Render kan ikke tilgå GitHub repository, selvom det er uploadet.

## Løsning: Tjek og Fix GitHub Access i Render

---

## TRIN 1: Tjek GitHub Repository Access i Render

1. Gå til Render dashboard
2. Klik på din "alternativenetdoctor-backend" service
3. Gå til "Settings" → "Build & Deploy"
4. Tjek "Git Credentials" sektionen
5. Se om der står noget om GitHub access

---

## TRIN 2: Opret Ny Service Med Korrekt GitHub Access

1. **Slet den gamle service** (Settings → Delete Web Service)
2. **Opret ny service:**
   - Klik "New +" → "Web Service"
   - Klik på **"GitHub"** knappen (ikke Public Git Repository)
   - **VIGTIGT**: Log ind med GitHub når Render beder om det
   - Vælg repository: `BirgitteNC/alternativenetdoctor`
   - **Root Directory**: `backend`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Free

---

## TRIN 3: Hvis GitHub Login Ikke Virker

1. Gå til GitHub → Settings → Applications → Authorized OAuth Apps
2. Find "Render" i listen
3. Hvis den ikke er der, eller hvis den er der men ikke har adgang:
   - Gå til Render og prøv GitHub login igen
   - Giv Render adgang til dit repository

---

## TRIN 4: Alternativ - Brug Public Git Repository

Hvis GitHub OAuth stadig ikke virker:

1. I Render, klik "New +" → "Web Service"
2. Klik på **"Public Git Repository"** tab
3. Indsæt: `https://github.com/BirgitteNC/alternativenetdoctor.git`
4. **Root Directory**: `backend`
5. **Build Command**: `npm install && npm run build`
6. **Start Command**: `npm start`

---

**Start med TRIN 2 - opret ny service med GitHub login! 🚀**


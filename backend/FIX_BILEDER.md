# 🔧 Fix Billeder i Backend

## Problemet

Billederne vises ikke i Strapi backend eller på frontend.

## ✅ Fix 1: CORS & Security Configuration (Udført)

CORS og security middleware er nu konfigureret korrekt i `config/middlewares.js`:

- ✅ CORS tillader alle frontend domains
- ✅ Security middleware tillader billeder fra alle kilder
- ✅ `strapi::public` middleware er aktiveret

## 🔍 Test om Fix Virker

### Lokalt Test

1. Start backend:
   ```bash
   cd backend
   npm run develop
   ```

2. Test billed URL:
   ```bash
   # Åbn i browser:
   http://localhost:1337/uploads/lavendel_300x200_a0f8141c80.jpg
   ```
   Skal vise billedet!

3. Test API:
   ```bash
   # Åbn i browser:
   http://localhost:1337/api/articles?populate=*
   ```
   Tjek at `featuredImage.attributes.url` er korrekt.

### Production Test

1. Test backend billed URL:
   ```
   https://alternativenetdoctor-backend.onrender.com/uploads/lavendel_300x200_a0f8141c80.jpg
   ```
   Skal vise billedet!

2. Test API:
   ```
   https://alternativenetdoctor-backend.onrender.com/api/articles?populate=*
   ```

## ⚠️ Hvis Billeder Stadig Ikke Virker

### Problem 1: Billeder er ikke deployet til Render

**Løsning:**
1. Tjek at `backend/public/uploads/` er i Git repository
2. Commit og push:
   ```bash
   git add backend/public/uploads/
   git commit -m "Add uploaded images"
   git push
   ```
3. Render vil automatisk redeploy

### Problem 2: Billeder mangler i production database

**Løsning:**
1. Kør image migration script:
   ```bash
   cd backend
   node migrate-images.js
   ```

### Problem 3: Public folder permissions

**Løsning:**
1. I Strapi Admin → Settings → Media Library
2. Upload et nyt test billede
3. Tjek om det vises

### Problem 4: Frontend kan ikke hente billeder

**Tjek:**
1. `NEXT_PUBLIC_STRAPI_URL` er sat korrekt i Vercel
2. Frontend koden bruger `getStrapiImageUrl()` korrekt
3. Next.js Image config tillader backend domain

**Fix:**
- Tjek `frontend/src/lib/strapi.ts` → `getStrapiImageUrl()` funktionen
- Tjek `frontend/next.config.js` → `remotePatterns` inkluderer backend domain

## 🔄 Deploy Fix til Production

### Trin 1: Commit ændringer

```bash
git add backend/config/middlewares.js
git commit -m "Fix: Configure CORS and security for image serving"
git push
```

### Trin 2: Render redeployer automatisk

Render vil automatisk:
1. Detektere Git push
2. Rebuild Docker container
3. Restart service

### Trin 3: Test efter deployment

1. Vent 2-3 minutter på deployment
2. Test backend billed URL
3. Test frontend

## 📝 Hvad er blevet ændret?

### `backend/config/middlewares.js`

**Før:**
- CORS var simplificeret til bare `'strapi::cors'` (standard konfiguration)
- Security middleware var for restriktiv

**Efter:**
- CORS er eksplicit konfigureret med:
  - Korrekte origins (frontend domains)
  - Alle nødvendige HTTP methods
  - Credentials support
- Security middleware tillader billeder fra alle kilder
- Middleware rækkefølge er optimeret

## ✅ Checklist

- [ ] `backend/config/middlewares.js` er opdateret
- [ ] Ændringer er committed til Git
- [ ] Pushed til GitHub
- [ ] Render redeployer automatisk
- [ ] Testet backend billed URL
- [ ] Testet frontend visning

## 🆘 Hvis det stadig ikke virker

1. Tjek Render logs:
   - Render Dashboard → Backend Service → Logs
   - Se efter errors relateret til `/uploads`

2. Tjek browser console:
   - Åbn frontend
   - F12 → Console
   - Se efter 404 eller CORS errors for billeder

3. Tjek Network tab:
   - F12 → Network
   - Filtrer efter billeder
   - Se status koder (404 = billed findes ikke, 403 = permission denied)

4. Verificer billeder eksisterer:
   - Strapi Admin → Media Library
   - Tjek at billeder faktisk er der


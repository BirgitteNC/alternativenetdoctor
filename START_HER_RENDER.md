# 🎯 START HER - Render Deployment (Meget Nemmere!)

## ✅ Hvad du skal gøre nu:

### TRIN 1: Opret Render Konto (2 minutter)

1. Gå til: **https://render.com**
2. Klik **"Get Started for Free"**
3. Opret konto (brug GitHub, Google eller email)
4. Bekræft din email

---

### TRIN 2: Opret PostgreSQL Database (5 minutter)

1. I Render dashboard, klik **"New +"** (øverst til højre)
2. Vælg **"PostgreSQL"**
3. Udfyld:
   - **Name**: `alternativenetdoctor-db`
   - **Database**: `alternativenetdoctor`
   - **User**: `alternativenetdoctor_user`
   - **Region**: Vælg `Frankfurt` (tættest på Danmark)
   - **Plan**: Vælg **"Free"** ✅
4. Klik **"Create Database"**
5. Vent 2-3 minutter

**Noter ned**: Klik på databasen → **"Connections"** tab → Kopiér **"Internal Database URL"**

---

### TRIN 3: Deploy Backend (10 minutter)

#### Hvis du HAR GitHub:

1. I Render dashboard, klik **"New +"** → **"Web Service"**
2. Vælg dit GitHub repository
3. Udfyld:
   - **Name**: `alternativenetdoctor-backend`
   - **Region**: `Frankfurt`
   - **Branch**: `main` (eller `master`)
   - **Root Directory**: `backend` ⚠️ **VIGTIGT!**
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Vælg **"Free"** ✅
4. Klik **"Create Web Service"**

#### Hvis du IKKE har GitHub:

1. **Opret GitHub repository først** (gratis):
   - Gå til https://github.com
   - Opret nyt repository
   - Upload hele projektet (både frontend og backend mapper)
   - Brug derefter instruktionerne ovenfor

---

### TRIN 4: Sæt Environment Variables (5 minutter)

I Render dashboard, klik på din **backend service** → **"Environment"** tab

#### Tilføj disse variables:

**1. Database URL** (fra TRIN 2):
```env
DATABASE_URL=postgresql://user:password@host:5432/dbname
```
*(Kopiér fra PostgreSQL → Connections → Internal Database URL)*

**2. Server Variables**:
```env
HOST=0.0.0.0
PORT=10000
NODE_ENV=production
FRONTEND_URL=https://placeholder.vercel.app
```

**3. Security Keys** (generer disse i PowerShell):

Kør hver kommando én ad gangen og kopiér outputtet:

```powershell
# APP_KEYS
node -e "console.log(Array(4).fill(0).map(() => require('crypto').randomBytes(32).toString('base64')).join(','))"

# API_TOKEN_SALT
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# ADMIN_JWT_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# TRANSFER_TOKEN_SALT
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# JWT_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Tilføj hver værdi som separate environment variables i Render.

---

### TRIN 5: Vent på Deployment (5-10 minutter)

1. Render deployer automatisk når du har sat environment variables
2. Vent til status viser **"Live"** (grøn)
3. Klik på din backend service
4. **Noter ned din backend URL** (fx: `alternativenetdoctor-backend.onrender.com`)

---

### TRIN 6: Test Backend (2 minutter)

1. Gå til: `https://din-backend-url.onrender.com/admin`
2. Opret en admin bruger første gang
3. Test API: `https://din-backend-url.onrender.com/api/articles`

---

### TRIN 7: Deploy Frontend på Vercel (10 minutter)

1. Gå til: **https://vercel.com/signup**
2. Opret konto
3. Klik **"Add New..."** → **"Project"**
4. Hvis GitHub: Vælg dit repo og `frontend` som root directory
5. Hvis ikke GitHub: Installer Vercel CLI (`npm i -g vercel`) og kør `vercel` i `frontend` mappen
6. I Vercel projektet → **"Settings"** → **"Environment Variables"**
7. Tilføj: `NEXT_PUBLIC_STRAPI_URL` = `https://din-backend-url.onrender.com`
8. Klik **"Deploy"**
9. Vent 2-5 minutter
10. **Noter ned din frontend URL**

---

### TRIN 8: Opdater Backend CORS (2 minutter)

1. Gå tilbage til Render backend
2. Gå til **"Environment"** tab
3. Find `FRONTEND_URL` og opdater til din Vercel URL
4. Render redeployer automatisk

---

### TRIN 9: Test Alt (5 minutter)

✅ Test disse URLs:

- `https://din-frontend.vercel.app/da` → Dansk forside
- `https://din-frontend.vercel.app/en` → Engelsk forside
- `https://din-backend.onrender.com/admin` → Strapi admin
- `https://din-backend.onrender.com/api/articles` → API

---

## ⚠️ Vigtigt om Render Free Tier

Render free tier går i "sleep" efter 15 minutter inaktivitet.

**Løsning**: Opret et gratis cron job på https://cron-job.org:
- URL: `https://din-backend-url.onrender.com/_health`
- Interval: Hver 5. minut
- Dette holder din backend vågen

Eller opgrader til Render Starter ($7/måned) for altid vågen.

---

## 🎉 Klar!

Hvis alt virker, har du nu:
- ✅ Live frontend på `/da` og `/en`
- ✅ Live backend API
- ✅ Strapi admin til indholdsredigering

---

**Start med TRIN 1 nu! Render er meget nemmere! 🚀**

Se `DEPLOY_RENDER.md` for mere detaljeret guide.


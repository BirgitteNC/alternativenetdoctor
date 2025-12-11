# 🚀 Deployment Guide - Alternativ Netdoktor

## Oversigt

Dette projekt består af:
- **Frontend**: Next.js 14 med next-intl (deployes til Vercel)
- **Backend**: Strapi 4 med PostgreSQL (deployes til Railway)

---

## 📋 Forudsætninger

1. Vercel konto (gratis): https://vercel.com/signup
2. Railway konto (gratis med $5 credit): https://railway.app/signup
3. Node.js 18+ installeret lokalt (til test)

---

## 🔧 TRIN 1: Backend Deployment (Railway)

### 1.1 Opret Railway Projekt

1. Gå til https://railway.app
2. Log ind eller opret konto
3. Klik "New Project"
4. Vælg "Deploy from GitHub repo" ELLER "Empty Project" (hvis du ikke bruger GitHub, vælg Empty)

### 1.2 Tilføj PostgreSQL Database

1. I dit Railway projekt, klik "New" → "Database" → "Add PostgreSQL"
2. Vent til databasen er klar
3. Klik på databasen og gå til "Variables" tab
4. Noter ned disse værdier:
   - `PGHOST`
   - `PGPORT`
   - `PGDATABASE`
   - `PGUSER`
   - `PGPASSWORD`

### 1.3 Deploy Backend

**Hvis du bruger GitHub:**
1. Klik "New" → "GitHub Repo"
2. Vælg dit repository
3. Vælg `backend` mappen som root directory

**Hvis du IKKE bruger GitHub (manuel upload):**
1. Klik "New" → "Empty Service"
2. Klik på servicen → "Settings" → "Source"
3. Upload `backend` mappen eller brug Railway CLI

### 1.4 Konfigurer Environment Variables

I Railway projektet, gå til din backend service → "Variables" tab og tilføj:

```env
# Database (fra PostgreSQL service)
DATABASE_CLIENT=postgres
DATABASE_HOST=${{Postgres.PGHOST}}
DATABASE_PORT=${{Postgres.PGPORT}}
DATABASE_NAME=${{Postgres.PGDATABASE}}
DATABASE_USERNAME=${{Postgres.PGUSER}}
DATABASE_PASSWORD=${{Postgres.PGPASSWORD}}
DATABASE_SSL=true
DATABASE_SSL_SELF=false

# Server
HOST=0.0.0.0
PORT=1337
NODE_ENV=production

# Frontend URL (opdateres efter frontend deployment)
FRONTEND_URL=https://your-frontend-url.vercel.app

# Strapi Security Keys (generer disse - se nedenfor)
APP_KEYS=your-app-keys-here
API_TOKEN_SALT=your-api-token-salt-here
ADMIN_JWT_SECRET=your-admin-jwt-secret-here
TRANSFER_TOKEN_SALT=your-transfer-token-salt-here
JWT_SECRET=your-jwt-secret-here
```

### 1.5 Generer Security Keys

Kør disse kommandoer lokalt (i PowerShell eller Terminal):

```bash
# APP_KEYS (4 keys adskilt med komma)
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

Kopiér hver værdi og indsæt i Railway environment variables.

### 1.6 Deploy og Vent

1. Railway vil automatisk deploye når du har sat environment variables
2. Vent til deployment er færdig (kan tage 5-10 minutter)
3. Klik på din backend service → "Settings" → "Generate Domain"
4. **Noter ned din backend URL** (fx: `alternativenetdoctor-backend.railway.app`)

### 1.7 Test Backend

1. Gå til `https://din-backend-url.railway.app/admin`
2. Opret en admin bruger første gang
3. Test API: `https://din-backend-url.railway.app/api/articles`

---

## 🌐 TRIN 2: Frontend Deployment (Vercel)

### 2.1 Opret Vercel Projekt

1. Gå til https://vercel.com
2. Log ind eller opret konto
3. Klik "Add New..." → "Project"

### 2.2 Import Projekt

**Hvis du bruger GitHub:**
1. Vælg dit repository
2. Vælg `frontend` som root directory
3. Framework Preset: Next.js (detekteres automatisk)

**Hvis du IKKE bruger GitHub:**
1. Installer Vercel CLI: `npm i -g vercel`
2. I `frontend` mappen, kør: `vercel`
3. Følg instruktionerne

### 2.3 Konfigurer Environment Variables

I Vercel projektet → "Settings" → "Environment Variables", tilføj:

```env
NEXT_PUBLIC_STRAPI_URL=https://din-backend-url.railway.app
```

**VIGTIGT**: Opdater også `FRONTEND_URL` i Railway backend med din Vercel URL!

### 2.4 Deploy

1. Klik "Deploy"
2. Vent til deployment er færdig (2-5 minutter)
3. **Noter ned din frontend URL** (fx: `alternativenetdoctor.vercel.app`)

### 2.5 Opdater Backend CORS

Gå tilbage til Railway backend → "Variables" og opdater:

```env
FRONTEND_URL=https://din-frontend-url.vercel.app
```

Railway vil automatisk redeploye.

---

## ✅ TRIN 3: Verificer Alt Virker

### 3.1 Test Frontend Routes

- `https://din-frontend-url.vercel.app/da` → Skal vise dansk forside
- `https://din-frontend-url.vercel.app/en` → Skal vise engelsk forside
- `https://din-frontend-url.vercel.app/da/articles` → Skal vise artikler
- `https://din-frontend-url.vercel.app/en/articles` → Skal vise artikler på engelsk

### 3.2 Test Backend

- `https://din-backend-url.railway.app/admin` → Strapi admin panel
- `https://din-backend-url.railway.app/api/articles` → API endpoint

### 3.3 Test Integration

1. Gå til frontend
2. Naviger til artikler/symptomer/produkter
3. Tjek browser console for fejl
4. Verificer at data kommer fra backend

---

## 🔄 Opdater Indhold Fremover

### Backend (Strapi Admin)

1. Gå til `https://din-backend-url.railway.app/admin`
2. Log ind med din admin bruger
3. Rediger indhold som normalt
4. Ændringer er live med det samme

### Frontend (Kode/Design)

**Hvis du bruger GitHub:**
- Push til GitHub → Vercel deployer automatisk

**Hvis du IKKE bruger GitHub:**
- Kør `vercel --prod` i `frontend` mappen
- Eller upload via Vercel dashboard

---

## 🐛 Troubleshooting

### Frontend viser 404 på /da eller /en

- Tjek at `middleware.ts` er korrekt konfigureret
- Tjek Vercel build logs for fejl
- Verificer at `next-intl` er installeret

### Backend giver CORS fejl

- Tjek at `FRONTEND_URL` i Railway matcher din Vercel URL præcist
- Tjek at `config/middlewares.js` er opdateret
- Redeploy backend efter environment variable ændringer

### Backend går i dvale

- Railway free tier kan gå i dvale efter inaktivitet
- Opret en gratis cron job på https://cron-job.org der pinger din backend hver 5. minut
- Eller opgrader til Railway Pro ($5/måned)

### Database fejl

- Tjek at alle database environment variables er sat korrekt i Railway
- Verificer at PostgreSQL service er kørende
- Tjek Railway logs for database connection fejl

---

## 📝 Vigtige Links (Efter Deployment)

- **Frontend (Dansk)**: `https://din-frontend-url.vercel.app/da`
- **Frontend (Engelsk)**: `https://din-frontend-url.vercel.app/en`
- **Backend API**: `https://din-backend-url.railway.app/api`
- **Strapi Admin**: `https://din-backend-url.railway.app/admin`

---

## 🎯 Quick Reference Commands

### Lokal Test (Frontend)
```bash
cd frontend
npm install
npm run dev
```

### Lokal Test (Backend)
```bash
cd backend
npm install
npm run develop
```

### Deploy Frontend (Vercel CLI)
```bash
cd frontend
vercel --prod
```

---

## 💡 Tips

1. **Brug Railway Pro** ($5/måned) hvis backend skal være altid vågen
2. **Sæt op custom domain** i både Vercel og Railway for professionelt look
3. **Backup database** regelmæssigt via Railway dashboard
4. **Monitor logs** i både Vercel og Railway for fejl

---

**God deployment! 🚀**


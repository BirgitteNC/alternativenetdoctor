# 🚀 Deployment Guide - Render (Meget Nemmere!)

## Oversigt

- **Backend**: Strapi 4 på Render (gratis tier)
- **Frontend**: Next.js 14 på Vercel (gratis tier)
- **Database**: Render PostgreSQL (gratis tier)

---

## 📋 TRIN 1: Opret Render Konto (2 minutter)

1. Gå til: **https://render.com**
2. Klik **"Get Started for Free"**
3. Opret konto (brug GitHub, Google eller email)
4. Bekræft din email

---

## 📋 TRIN 2: Opret PostgreSQL Database (5 minutter)

1. I Render dashboard, klik **"New +"** → **"PostgreSQL"**
2. Udfyld:
   - **Name**: `alternativenetdoctor-db`
   - **Database**: `alternativenetdoctor`
   - **User**: `alternativenetdoctor_user`
   - **Region**: Vælg `Frankfurt` (tættest på Danmark)
   - **PostgreSQL Version**: `16` (eller nyeste)
   - **Plan**: Vælg **"Free"** (gratis)
3. Klik **"Create Database"**
4. Vent 2-3 minutter til databasen er klar

### Noter Database Information:

1. Klik på din database
2. Gå til **"Connections"** tab
3. **Noter ned disse værdier** (du skal bruge dem senere):
   - **Internal Database URL**: `postgresql://user:password@host:5432/dbname`
   - Eller kopiér **"Connection Pooling"** URL'en

---

## 📋 TRIN 3: Deploy Backend (Strapi) på Render (10 minutter)

### Metode A: Deploy fra GitHub (Hvis du har GitHub)

1. I Render dashboard, klik **"New +"** → **"Web Service"**
2. Hvis du ser GitHub, vælg dit repository
3. Udfyld:
   - **Name**: `alternativenetdoctor-backend`
   - **Region**: `Frankfurt`
   - **Branch**: `main` (eller `master`)
   - **Root Directory**: `backend` ⚠️ **VIGTIGT!**
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Vælg **"Free"** (gratis)
4. Klik **"Create Web Service"**

### Metode B: Deploy fra Local (Hvis du IKKE har GitHub)

1. **Opret en GitHub repository** (gratis):
   - Gå til https://github.com
   - Opret nyt repository (fx `alternativenetdoctor`)
   - Upload hele projektet (både frontend og backend mapper)

2. **Eller brug Render CLI**:
   ```powershell
   npm install -g render-cli
   render login
   cd backend
   render deploy
   ```

---

## 📋 TRIN 4: Sæt Environment Variables (5 minutter)

I Render dashboard, klik på din **backend service** → **"Environment"** tab

### Tilføj disse variables:

#### Database Variables (fra din PostgreSQL):

Klik på din **PostgreSQL** database → **"Connections"** tab

Kopiér **"Internal Database URL"** - den ser sådan ud:
```
postgresql://user:password@host:5432/dbname
```

Splits den op og tilføj som separate variables:

```env
DATABASE_CLIENT=postgres
DATABASE_HOST=dpg-xxxxx-a.frankfurt-postgres.render.com
DATABASE_PORT=5432
DATABASE_NAME=alternativenetdoctor_xxxx
DATABASE_USERNAME=alternativenetdoctor_user_xxxx
DATABASE_PASSWORD=din-password-her
DATABASE_SSL=true
DATABASE_SSL_SELF=false
```

**ELLER** brug den fulde URL (nemmere!):

```env
DATABASE_URL=postgresql://user:password@host:5432/dbname
```

Hvis du bruger `DATABASE_URL`, skal du opdatere `backend/config/database.js` (se nedenfor).

#### Server Variables:

```env
HOST=0.0.0.0
PORT=10000
NODE_ENV=production
FRONTEND_URL=https://placeholder.vercel.app
```

**VIGTIGT**: Render bruger port `10000` som standard!

#### Security Keys (generer disse):

Åbn PowerShell og kør hver kommando én ad gangen:

```powershell
# 1. APP_KEYS (kopiér hele outputtet)
node -e "console.log(Array(4).fill(0).map(() => require('crypto').randomBytes(32).toString('base64')).join(','))"

# 2. API_TOKEN_SALT
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# 3. ADMIN_JWT_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# 4. TRANSFER_TOKEN_SALT
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# 5. JWT_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Kopiér hver værdi og indsæt i Render Environment Variables.

---

## 📋 TRIN 5: Opdater Database Config (Hvis du bruger DATABASE_URL)

Hvis du bruger `DATABASE_URL` i stedet for separate variables, skal du opdatere `backend/config/database.js`:

```javascript
module.exports = ({ env }) => {
  const client = env('DATABASE_CLIENT', 'postgres');
  
  if (env('DATABASE_URL')) {
    // Parse DATABASE_URL format: postgresql://user:password@host:port/dbname
    const url = new URL(env('DATABASE_URL'));
    return {
      connection: {
        client,
        connection: {
          host: url.hostname,
          port: parseInt(url.port) || 5432,
          database: url.pathname.slice(1), // Remove leading /
          user: url.username,
          password: url.password,
          ssl: env.bool('DATABASE_SSL', true) && {
            rejectUnauthorized: env.bool('DATABASE_SSL_SELF', false),
          },
        },
      },
    };
  }
  
  // Fallback to separate variables
  return {
    connection: {
      client,
      connection: {
        host: env('DATABASE_HOST', '127.0.0.1'),
        port: env.int('DATABASE_PORT', 5432),
        database: env('DATABASE_NAME', 'alternativenetdoctor'),
        user: env('DATABASE_USERNAME', 'strapi'),
        password: env('DATABASE_PASSWORD', 'strapi'),
        ssl: env.bool('DATABASE_SSL', false) && {
          rejectUnauthorized: env.bool('DATABASE_SSL_SELF', false),
        },
      },
      debug: false,
    },
  };
};
```

---

## 📋 TRIN 6: Vent på Deployment (5-10 minutter)

1. Render deployer automatisk når du har sat environment variables
2. Vent til status viser **"Live"** (grøn)
3. Klik på din backend service
4. **Noter ned din backend URL** (fx: `alternativenetdoctor-backend.onrender.com`)

---

## 📋 TRIN 7: Test Backend (2 minutter)

1. Gå til: `https://din-backend-url.onrender.com/admin`
2. Opret en admin bruger første gang
3. Test API: `https://din-backend-url.onrender.com/api/articles`

---

## 📋 TRIN 8: Deploy Frontend på Vercel (10 minutter)

1. Gå til: **https://vercel.com/signup**
2. Opret konto
3. Klik **"Add New..."** → **"Project"**
4. Hvis GitHub: Vælg dit repo og `frontend` som root directory
5. Hvis ikke GitHub: Installer Vercel CLI (`npm i -g vercel`) og kør `vercel` i `frontend` mappen
6. I Vercel projektet → **"Settings"** → **"Environment Variables"**
7. Tilføj: `NEXT_PUBLIC_STRAPI_URL` = `https://din-backend-url.onrender.com`
8. Klik **"Deploy"**
9. Vent 2-5 minutter
10. **Noter ned din frontend URL** (fx: `alternativenetdoctor.vercel.app`)

---

## 📋 TRIN 9: Opdater Backend CORS (2 minutter)

1. Gå tilbage til Render backend
2. Gå til **"Environment"** tab
3. Find `FRONTEND_URL` og opdater til din Vercel URL
4. Render redeployer automatisk

---

## 📋 TRIN 10: Test Alt (5 minutter)

✅ Test disse URLs:

- `https://din-frontend.vercel.app/da` → Dansk forside
- `https://din-frontend.vercel.app/en` → Engelsk forside
- `https://din-frontend.vercel.app/da/articles` → Artikler
- `https://din-backend.onrender.com/admin` → Strapi admin
- `https://din-backend.onrender.com/api/articles` → API

---

## ⚠️ Vigtige Noter om Render Free Tier

1. **Spinning down**: Render free tier går i "sleep" efter 15 minutter inaktivitet
   - **Løsning**: Opret et gratis cron job på https://cron-job.org der pinger din backend hver 5. minut
   - Eller opgrader til Render Starter ($7/måned) for altid vågen

2. **Database**: Render free PostgreSQL har 90MB storage limit
   - Det er nok til at starte med
   - Opgrader senere hvis nødvendigt

3. **Build Time**: Render free tier har 500 build minutes/måned
   - Det er mere end nok til normale projekter

---

## 🎉 Klar!

Hvis alt virker, har du nu:
- ✅ Live frontend på `/da` og `/en`
- ✅ Live backend API
- ✅ Strapi admin til indholdsredigering

---

## 🐛 Troubleshooting

### Backend går i sleep
- Opret cron job på cron-job.org der pinger: `https://din-backend.onrender.com/_health`
- Eller opgrader til Render Starter

### Database connection fejl
- Tjek at alle database environment variables er sat korrekt
- Verificer at `DATABASE_SSL=true` er sat
- Tjek Render logs for fejl

### Build fejler
- Tjek Render build logs
- Verificer at `Root Directory` er sat til `backend`
- Tjek at alle environment variables er sat

---

**Start med TRIN 1 nu! Render er meget nemmere end Railway! 🚀**


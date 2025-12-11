# 🎯 START HER - Følg Disse Trin Nu

## TRIN 1: Opret Railway Konto (2 minutter)

1. Gå til: **https://railway.app/signup**
2. Opret konto (brug GitHub, Google eller email)
3. Du får $5 gratis credit

---

## TRIN 2: Opret Backend Projekt på Railway (5 minutter)

1. I Railway dashboard, klik **"New Project"**
2. Klik **"Empty Project"** (eller "Deploy from GitHub" hvis du bruger GitHub)
3. Klik **"New"** → **"Database"** → **"Add PostgreSQL"**
4. Vent 30 sekunder til databasen er klar

---

## TRIN 3: Deploy Backend (10 minutter)

### Metode A: Brug Railway CLI (Anbefalet hvis du IKKE bruger GitHub)

1. **Installer Railway CLI** (åbn PowerShell/Terminal):
   ```powershell
   npm install -g @railway/cli
   ```

2. **Log ind på Railway**:
   ```powershell
   railway login
   ```
   (Åbner browser til login)

3. **Gå til backend mappen**:
   ```powershell
   cd backend
   ```

4. **Link til dit Railway projekt**:
   ```powershell
   railway link
   ```
   - Vælg det projekt du lige oprettede
   - Vælg "Create new service" eller vælg eksisterende service

5. **Deploy backend**:
   ```powershell
   railway up
   ```
   - Dette uploader og deployer din backend
   - Vent til deployment er færdig (5-10 minutter)

### Metode B: Brug GitHub (Hvis du har GitHub)

1. I Railway projektet, klik **"New"** → **"GitHub Repo"**
2. Vælg dit repository
3. I **"Root Directory"** skriv: `backend`
4. Klik **"Deploy"**
5. Vent på deployment (5-10 minutter)

---

## TRIN 4: Sæt Environment Variables (5 minutter)

1. I Railway projektet, klik på din **backend service**
2. Gå til **"Variables"** tab
3. Klik **"New Variable"** for hver af disse:

### Database Variables (fra PostgreSQL service):

Klik på din **PostgreSQL** service → **"Variables"** tab og kopiér disse værdier:

```env
DATABASE_CLIENT=postgres
DATABASE_HOST=${{Postgres.PGHOST}}
DATABASE_PORT=${{Postgres.PGPORT}}
DATABASE_NAME=${{Postgres.PGDATABASE}}
DATABASE_USERNAME=${{Postgres.PGUSER}}
DATABASE_PASSWORD=${{Postgres.PGPASSWORD}}
DATABASE_SSL=true
DATABASE_SSL_SELF=false
```

**VIGTIGT**: Brug `${{Postgres.PGHOST}}` format - Railway erstatter automatisk med rigtige værdier!

### Server Variables:

```env
HOST=0.0.0.0
PORT=1337
NODE_ENV=production
FRONTEND_URL=https://placeholder.vercel.app
```

*(Opdater FRONTEND_URL senere efter frontend deployment)*

### Security Keys (generer disse NU):

Åbn PowerShell eller Terminal og kør disse kommandoer én ad gangen:

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

Kopiér hver værdi og indsæt i Railway Variables.

---

## TRIN 5: Vent på Deployment (5-10 minutter)

1. Railway deployer automatisk når du har sat environment variables
2. Vent til status viser "Deployed" (grøn)
3. Klik på din backend service → **"Settings"** → **"Generate Domain"**
4. **Noter ned din backend URL** (fx: `alternativenetdoctor-production.up.railway.app`)

---

## TRIN 6: Test Backend (2 minutter)

1. Gå til: `https://din-backend-url.railway.app/admin`
2. Opret en admin bruger første gang
3. Test API: `https://din-backend-url.railway.app/api/articles`

---

## TRIN 7: Deploy Frontend på Vercel (10 minutter)

1. Gå til: **https://vercel.com/signup**
2. Opret konto (brug GitHub eller email)
3. Klik **"Add New..."** → **"Project"**
4. Hvis GitHub: Vælg dit repo og `frontend` som root directory
5. Hvis ikke GitHub: Installer Vercel CLI (`npm i -g vercel`) og kør `vercel` i `frontend` mappen
6. I Vercel projektet → **"Settings"** → **"Environment Variables"**
7. Tilføj: `NEXT_PUBLIC_STRAPI_URL` = `https://din-backend-url.railway.app`
8. Klik **"Deploy"**
9. Vent 2-5 minutter
10. **Noter ned din frontend URL** (fx: `alternativenetdoctor.vercel.app`)

---

## TRIN 8: Opdater Backend CORS (2 minutter)

1. Gå tilbage til Railway backend
2. Gå til **"Variables"** tab
3. Find `FRONTEND_URL` og opdater til din Vercel URL
4. Railway redeployer automatisk

---

## TRIN 9: Test Alt (5 minutter)

✅ Test disse URLs:

- `https://din-frontend.vercel.app/da` → Dansk forside
- `https://din-frontend.vercel.app/en` → Engelsk forside
- `https://din-frontend.vercel.app/da/articles` → Artikler
- `https://din-backend.railway.app/admin` → Strapi admin
- `https://din-backend.railway.app/api/articles` → API

---

## 🎉 Klar!

Hvis alt virker, har du nu:
- ✅ Live frontend på `/da` og `/en`
- ✅ Live backend API
- ✅ Strapi admin til indholdsredigering

---

## ❓ Hvis Noget Går Galt

1. **Backend deployment fejler**: Tjek Railway logs → "Deployments" tab
2. **Frontend viser 404**: Tjek Vercel build logs
3. **CORS fejl**: Verificer at `FRONTEND_URL` i Railway matcher Vercel URL præcist
4. **Database fejl**: Tjek at alle database variables er sat korrekt

Se `DEPLOYMENT_GUIDE.md` for mere detaljeret troubleshooting.

---

**Start med TRIN 1 nu! 🚀**


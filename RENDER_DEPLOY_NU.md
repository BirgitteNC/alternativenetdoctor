# ✅ Deploy på Render - Præcis Hvad Du Skal Gøre Nu

## Du er på den rigtige side!

"Deploy Web Service" er den rigtige knap - Render har bare ændret navnet fra "Create Web Service".

---

## ⚠️ VIGTIGT: Sæt Environment Variables FØRST!

Du skal sætte environment variables **FØR** du klikker "Deploy Web Service". Ellers vil deployment fejle!

---

## TRIN 1: Scroll op og tjek at du har udfyldt (TRIN 3):

✅ **Name**: `alternativenetdoctor-backend`  
✅ **Region**: `Frankfurt` (eller tættest på Danmark)  
✅ **Branch**: `main` (eller `master`)  
✅ **Root Directory**: `backend` ⚠️ **VIGTIGT!**  
✅ **Runtime**: `Node`  
✅ **Build Command**: `npm install && npm run build`  
✅ **Start Command**: `npm start`  
✅ **Instance Type**: Vælg **"Free"** (scroll op og find Free optionen)

---

## TRIN 2: Sæt Environment Variables NU (TRIN 4)

I "Environment Variables" sektionen, klik **"+ Add Environment Variable"** for hver af disse:

### 1. Database URL (fra din PostgreSQL)

Gå til din PostgreSQL database i Render → **"Connections"** tab → Kopiér **"Internal Database URL"**

Tilføj som:
- **NAME**: `DATABASE_URL`
- **VALUE**: `postgresql://user:password@host:5432/dbname` (din kopierede URL)

### 2. Server Variables

Tilføj disse én ad gangen:

**Variable 1:**
- **NAME**: `HOST`
- **VALUE**: `0.0.0.0`

**Variable 2:**
- **NAME**: `PORT`
- **VALUE**: `10000`

**Variable 3:**
- **NAME**: `NODE_ENV`
- **VALUE**: `production`

**Variable 4:**
- **NAME**: `FRONTEND_URL`
- **VALUE**: `https://placeholder.vercel.app` (opdateres senere)

### 3. Security Keys (generer disse i PowerShell)

Åbn PowerShell og kør hver kommando én ad gangen. Kopiér outputtet og indsæt som environment variables:

```powershell
# 1. APP_KEYS (kopiér hele outputtet - det er 4 keys adskilt med komma)
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

Tilføj hver som separate environment variables:
- **NAME**: `APP_KEYS` → **VALUE**: (output fra kommando 1)
- **NAME**: `API_TOKEN_SALT` → **VALUE**: (output fra kommando 2)
- **NAME**: `ADMIN_JWT_SECRET` → **VALUE**: (output fra kommando 3)
- **NAME**: `TRANSFER_TOKEN_SALT` → **VALUE**: (output fra kommando 4)
- **NAME**: `JWT_SECRET` → **VALUE**: (output fra kommando 5)

---

## TRIN 3: Tjek at du har alle variables

Du skal have **mindst 9 environment variables**:
1. ✅ DATABASE_URL
2. ✅ HOST
3. ✅ PORT
4. ✅ NODE_ENV
5. ✅ FRONTEND_URL
6. ✅ APP_KEYS
7. ✅ API_TOKEN_SALT
8. ✅ ADMIN_JWT_SECRET
9. ✅ TRANSFER_TOKEN_SALT
10. ✅ JWT_SECRET

---

## TRIN 4: Klik "Deploy Web Service"

Når alle environment variables er sat, klik den sorte **"Deploy Web Service"** knap nederst.

---

## TRIN 5: Vent på Deployment (5-10 minutter)

1. Render starter build processen
2. Du kan se progress i dashboardet
3. Vent til status viser **"Live"** (grøn)
4. **Noter ned din backend URL** (fx: `alternativenetdoctor-backend.onrender.com`)

---

## ⚠️ Hvis du glemmer en variable:

Du kan altid tilføje dem senere:
1. Gå til din service i Render dashboard
2. Klik **"Environment"** tab
3. Tilføj manglende variables
4. Render redeployer automatisk

---

## 🎯 Quick Checklist:

- [ ] Name: `alternativenetdoctor-backend`
- [ ] Root Directory: `backend`
- [ ] Build Command: `npm install && npm run build`
- [ ] Start Command: `npm start`
- [ ] Instance Type: **Free**
- [ ] DATABASE_URL sat
- [ ] Alle 5 security keys sat
- [ ] HOST, PORT, NODE_ENV sat
- [ ] Klik "Deploy Web Service"

---

**Når alt er udfyldt, klik "Deploy Web Service"! 🚀**


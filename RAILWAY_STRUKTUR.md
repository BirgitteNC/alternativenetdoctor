# 🏗️ Railway Projekt Struktur - Forklaring

## Hvad skal du have i dit Railway projekt?

Du skal have **2 services** i dit Railway projekt:

### 1. PostgreSQL Database ✅
- Dette er din database
- Den er allerede oprettet
- Den indeholder dine data

### 2. Backend Service (Strapi) ❌
- Dette er din Strapi applikation
- Den skal deployes fra din `backend` mappe
- Den skal være linket til PostgreSQL databasen

---

## Sådan ser det ud i Railway Dashboard:

```
Dit Projekt
├── 📦 PostgreSQL (database)
│   └── Variables: PGHOST, PGPORT, etc.
│
└── 🚀 alternativenetdoctor-backend (service)
    └── Variables: DATABASE_HOST, APP_KEYS, etc.
```

---

## Hvis du kun ser PostgreSQL:

Det betyder at backend servicen ikke er oprettet endnu. Følg disse trin:

### Metode 1: Brug Railway CLI (Anbefalet)

1. **Åbn PowerShell** og naviger til backend mappen:
   ```powershell
   cd C:\Users\birgi\Downloads\alternativenetdoctor\backend
   ```

2. **Log ind på Railway** (hvis ikke allerede):
   ```powershell
   railway login
   ```

3. **Link til dit projekt**:
   ```powershell
   railway link
   ```
   - Vælg dit projekt (det med PostgreSQL)
   - Vælg **"Create new service"** når du bliver spurgt

4. **Deploy**:
   ```powershell
   railway up
   ```

Nu skulle du se **2 services** i dit Railway projekt!

---

### Metode 2: Via Railway Dashboard

Hvis Railway CLI ikke virker, prøv dette:

1. I Railway dashboard, klik på **"New"** knappen (øverst til højre)
2. Se om der er en mulighed for **"GitHub Repo"** eller **"Empty Service"**
3. Hvis du ser **"GitHub Repo"**:
   - Forbind til GitHub
   - Vælg dit repository
   - Sæt Root Directory til: `backend`
4. Hvis du ser **"Empty Service"**:
   - Opret den
   - Brug derefter Railway CLI til at linke (se Metode 1)

---

## Efter Backend Service er oprettet:

Du vil se **2 services** i dit projekt:
- ✅ PostgreSQL (database)
- ✅ alternativenetdoctor-backend (eller lignende navn)

Derefter skal du:
1. Klikke på **backend servicen**
2. Gå til **"Variables"** tab
3. Tilføje alle environment variables (se START_HER.md TRIN 4)

---

## Hvordan tjekker jeg om jeg har begge?

I Railway dashboard, i dit projekt, skal du se:

```
Services (2)
├── PostgreSQL
└── alternativenetdoctor-backend (eller lignende)
```

Hvis du kun ser 1 service (PostgreSQL), mangler du backend servicen.

---

**Følg Metode 1 ovenfor for at oprette backend servicen! 🚀**


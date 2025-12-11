# 🚂 Railway CLI Deployment Guide

Hvis du ikke bruger GitHub, skal du bruge Railway CLI til at deploye din backend.

## Trin-for-trin Guide

### 1. Installer Railway CLI

Åbn PowerShell (Windows) eller Terminal (Mac/Linux):

```powershell
npm install -g @railway/cli
```

Hvis du får fejl, prøv:
```powershell
npm install -g @railway/cli --force
```

### 2. Log ind på Railway

```powershell
railway login
```

Dette åbner din browser til login. Log ind med samme konto du brugte til at oprette Railway projektet.

### 3. Naviger til backend mappen

```powershell
cd C:\Users\birgi\Downloads\alternativenetdoctor\backend
```

### 4. Link til dit Railway projekt

```powershell
railway link
```

Du vil se en liste over dine projekter:
- Vælg det projekt du lige oprettede
- Hvis du bliver spurgt om service, vælg **"Create new service"**

### 5. Deploy backend

```powershell
railway up
```

Dette vil:
- Upload hele `backend` mappen til Railway
- Starte build processen
- Deploye din applikation

**Vent 5-10 minutter** til deployment er færdig.

### 6. Tjek deployment status

Du kan se status i Railway dashboard, eller kør:

```powershell
railway status
```

### 7. Generer domain (hvis ikke automatisk)

I Railway dashboard:
1. Klik på din backend service
2. Gå til **"Settings"** → **"Generate Domain"**
3. Noter ned din backend URL

---

## Troubleshooting

### "railway: command not found"
- Sørg for at npm er installeret: `npm --version`
- Prøv at geninstaller: `npm install -g @railway/cli --force`

### "Not logged in"
- Kør `railway login` igen
- Tjek at du er logget ind med samme konto som Railway dashboard

### "No project found"
- Sørg for at du har oprettet et projekt i Railway dashboard først
- Kør `railway link` igen og vælg projektet

### Build fejler
- Tjek Railway logs i dashboard
- Verificer at alle environment variables er sat (se TRIN 4 i START_HER.md)

---

## Næste Skridt

Efter deployment er færdig:
1. Gå til Railway dashboard
2. Klik på din backend service
3. Gå til **"Variables"** tab
4. Sæt alle environment variables (se START_HER.md TRIN 4)
5. Backend vil automatisk redeploye når du tilføjer variables

---

**Når deployment er færdig, fortsæt med TRIN 4 i START_HER.md! 🚀**


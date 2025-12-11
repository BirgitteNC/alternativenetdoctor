# 🔍 Sådan Finder Du Database URL i Render

## TRIN 1: Gå til dit Projekt

1. I Render dashboard, klik på **"My project"** (eller dit projekt navn) i venstre sidebar
2. Du skal se din PostgreSQL database liste

---

## TRIN 2: Åbn din PostgreSQL Database

1. Klik på din database: **"alternativenetdoctor-db"** (eller hvad du kaldte den)
2. Du kommer til database detaljer siden

---

## TRIN 3: Find "Connections" Tab

1. I toppen af siden, se efter tabs: **"Overview"**, **"Connections"**, **"Settings"**, etc.
2. Klik på **"Connections"** tab

---

## TRIN 4: Kopiér "Internal Database URL"

1. I "Connections" tab, find sektionen med **"Internal Database URL"**
2. Der vil være en lang URL der starter med `postgresql://`
3. Klik på URL'en eller kopiér-knappen ved siden af
4. **Kopiér hele URL'en** - den ser sådan ud:
   ```
   postgresql://alternativenetdoctor_user_xxxx:password@dpg-xxxxx-a.frankfurt-postgres.render.com:5432/alternativenetdoctor_xxxx
   ```

---

## TRIN 5: Brug URL'en i Web Service

1. Gå tilbage til din **"New Web Service"** side (den anden tab)
2. Scroll ned til **"Environment Variables"** sektionen
3. Klik **"+ Add Environment Variable"**
4. I **NAME** feltet, skriv: `DATABASE_URL`
5. I **VALUE** feltet, indsæt den URL du lige kopierede
6. Klik **"Save"** eller bare fortsæt med næste variable

---

## Hvis Du Ikke Kan Se "Connections" Tab

Hvis du ikke kan se Connections tab, prøv:

1. **Tjek at du er på database siden** (ikke projekt overview)
2. **Scroll op/ned** - tabs kan være skjult
3. **Prøv "Settings"** tab - nogle gange er connection info der
4. **Eller se i "Overview"** tab - der kan være connection information

---

## Alternativ: Brug Separate Variables

Hvis du ikke kan finde URL'en, kan du bruge separate variables i stedet:

1. I database siden, se efter disse værdier:
   - **Host**: `dpg-xxxxx-a.frankfurt-postgres.render.com`
   - **Port**: `5432`
   - **Database**: `alternativenetdoctor_xxxx`
   - **User**: `alternativenetdoctor_user_xxxx`
   - **Password**: (findes i Settings → Reset Password, eller du har sat det ved oprettelse)

2. I Web Service Environment Variables, tilføj:
   - `DATABASE_CLIENT` = `postgres`
   - `DATABASE_HOST` = (host værdien)
   - `DATABASE_PORT` = `5432`
   - `DATABASE_NAME` = (database navnet)
   - `DATABASE_USERNAME` = (user navnet)
   - `DATABASE_PASSWORD` = (password)
   - `DATABASE_SSL` = `true`

---

**Prøv TRIN 1-4 først - det er den nemmeste metode! 🚀**


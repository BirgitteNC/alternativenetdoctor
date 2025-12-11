# Alternativ Netdoktor

En omfattende digital sundhedsportal med information om symptomer, lidelser, kosttilskud og naturmedicin. Bygget som en headless CMS løsning med Strapi backend og Next.js frontend.

## 🌟 Features

- **Multi-sprog support**: Dansk, Engelsk, Tysk, Fransk og Spansk
- **75+ lidelser**: Omfattende database af sygdomme og symptomer
- **100+ produkter**: Kosttilskud og naturprodukter med dropshipping/affiliate integration
- **Strapi CMS**: Brugervenligt admin panel til content management
- **Next.js 14**: Server-side rendering for optimal SEO og performance
- **Stripe integration**: Sikker betalingsløsning
- **GDPR compliant**: Fuld overholdelse af databeskyttelsesforordningen
- **Kilder på alt indhold**: Alle artikler er bakket op af troværdige kilder
- **Fotorealistiske billeder**: Professionelle produktbilleder

## 🏗️ Arkitektur

```
alternativenetdoctor/
├── backend/          # Strapi CMS
│   ├── config/      # Konfiguration
│   ├── src/
│   │   ├── api/     # Content types og API'er
│   │   └── components/
│   └── public/
│
└── frontend/        # Next.js Application
    ├── src/
    │   ├── app/     # App router pages
    │   ├── components/
    │   ├── lib/     # API utilities
    │   ├── locales/ # Oversættelser
    │   └── types/
    └── public/
```

## 📋 Forudsætninger

- Node.js 18+ og npm
- PostgreSQL database
- Stripe account (til betalinger)
- (Optional) Domain til deployment

## 🚀 Installation

### 1. Clone Repository

```bash
git clone <repository-url>
cd alternativenetdoctor
```

### 2. Backend Setup (Strapi)

```bash
cd backend

# Installer dependencies
npm install

# Opret .env fil
cp .env.example .env

# Rediger .env med dine database credentials og secrets
# Se .env.example for alle nødvendige værdier
```

**Vigtige .env værdier til backend:**

```env
# Database
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=alternativenetdoctor
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=<din-password>

# Secrets (generer med: openssl rand -base64 32)
APP_KEYS=<key1>,<key2>
API_TOKEN_SALT=<salt>
ADMIN_JWT_SECRET=<secret>
JWT_SECRET=<secret>

# Stripe
STRIPE_SECRET_KEY=sk_test_...
```

**Start Strapi:**

```bash
# Development mode
npm run develop

# Production mode
npm run build
npm start
```

Strapi køre nu på: http://localhost:1337

### 3. Frontend Setup (Next.js)

```bash
cd ../frontend

# Installer dependencies
npm install

# Opret .env.local
cp .env.example .env.local

# Rediger .env.local
```

**Vigtige .env værdier til frontend:**

```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

**Start Next.js:**

```bash
# Development mode
npm run dev

# Production build
npm run build
npm start
```

Frontend køre nu på: http://localhost:3000

## 🎨 Første Gang Setup

### 1. Opret Admin Bruger i Strapi

1. Gå til http://localhost:1337/admin
2. Opret din første admin bruger
3. Log ind på admin panelet

### 2. Konfigurer API Permissions

I Strapi admin:
1. Gå til **Settings → Users & Permissions → Roles → Public**
2. Aktiver følgende permissions for alle content types:
   - find
   - findOne
3. Gem ændringer

### 3. Tilføj Content

**Kategorier:**
1. Gå til **Content Manager → Categories**
2. Opret kategorier som: "Søvn", "Stress", "Fordøjelse", "Energi", etc.
3. Vælg sprog og tilføj oversættelser

**Lidelser:**
1. Gå til **Content Manager → Articles**
2. Opret artikler med alle sektioner udfyldt
3. Tilknyt kategorier, produkter og kilder
4. Publiker artiklen

**Produkter:**
1. Gå til **Content Manager → Products**
2. Tilføj produktinformation
3. Upload produktbilleder
4. Konfigurer Stripe hvis produktet skal sælges direkte

## 📦 Content Types

### Article
- Sygdoms- og symptomprofiler
- Komponenter: kort forklaring, symptomer, årsager, naturlige tilgange, livsstilsråd, hvornår kontakte læge
- Relations: kategorier, produkter, partnere, relaterede artikler

### Product
- Kosttilskud og naturprodukter
- Dropshipping, affiliate eller egne produkter
- Stripe integration for direkte salg

### Symptom/Condition
- Symptomer og lidelser database
- Koblet til artikler

### Supplement/Herb
- Database af urter og kosttilskud
- Videnskabelig evidens og traditionel brug

### Partner
- Læger, klinikker, behandlere
- Verificerede partnere

### Category
- Kategorisering af alt indhold

## 🌐 Multi-sprog

Projektet understøtter 5 sprog:
- **da** (Dansk) - Default
- **en** (English)
- **de** (Deutsch)
- **fr** (Français)
- **es** (Español)

**Tilføj content på flere sprog:**
1. Opret content på dansk først
2. Klik på sprog-dropdown i Strapi
3. Vælg sprog og opret oversættelse

## 💳 Stripe Integration

### Setup

1. Opret Stripe account på https://stripe.com
2. Hent API keys fra Dashboard
3. Tilføj keys til .env filer
4. For hvert produkt der skal sælges:
   - Opret produkt i Stripe Dashboard
   - Kopier Product ID og Price ID
   - Tilføj til produktet i Strapi

### Test Mode

Brug test keys (pk_test og sk_test) under development.

**Test kort numre:**
- Success: 4242 4242 4242 4242
- Decline: 4000 0000 0000 0002

### Production

Skift til live keys når sitet er live.

## 🚢 Deployment

### Backend (Strapi)

**Anbefalet: DigitalOcean, Railway, eller Heroku**

1. Opret PostgreSQL database
2. Deploy Strapi
3. Sæt environment variables
4. Kør build: `npm run build`

### Frontend (Next.js)

**Anbefalet: Vercel**

1. Connect GitHub repository
2. Sæt environment variables
3. Deploy automatisk ved push

**Alternative: Netlify, DigitalOcean**

Build command: `npm run build`  
Output directory: `.next`

### Domain Setup

1. Peg domæne til deployment
2. Opdater CORS i Strapi:
   - `config/middlewares.js`
   - Tilføj production domain til `origin` array

## 📝 Content Guidelines

### Artikler

**Struktur:**
1. Titel (SEO optimeret)
2. Teaser (kort intro)
3. Featured image (fotorealistisk)
4. Kort forklaring
5. Symptomer
6. Mulige årsager
7. Naturlige tilgange (urter, kosttilskud, fødevarer)
8. Livsstilsråd
9. Hvornår kontakte læge
10. Källor

**Juridisk:**
- Portalen giver IKKE diagnose
- Opfordrer altid til lægekonsultation ved alvorlige symptomer
- Bruger sprog som "kan støtte", "traditionelt anvendt", "undersøgt for"

### Produkter

- Klare produktbeskrivelser
- Dosering og anvendelse
- Ingredienser
- Advarsler og interaktioner
- Certificeringer

### Kilder

Alle artikler skal have troværdige kilder:
- Peer-reviewed forskning
- Officielle sundhedsorganisationer
- Lægebøger
- Dokumenteret traditionel brug

## 🔒 Sikkerhed & GDPR

- HTTPS på alle miljøer
- Sikker håndtering af persondata
- Cookie consent implementeret
- Data opbevares i EU
- Adgangsstyring i Strapi

## 🐛 Troubleshooting

### Strapi starter ikke
- Check database connection
- Verify .env fil er korrekt
- Check PostgreSQL kører

### Frontend kan ikke hente data
- Verify NEXT_PUBLIC_STRAPI_URL er korrekt
- Check API permissions i Strapi
- Check CORS settings

### Billeder vises ikke
- Check image domains i next.config.js
- Verify Strapi public folder permissions

## 📚 Dokumentation

- Strapi docs: https://docs.strapi.io
- Next.js docs: https://nextjs.org/docs
- Stripe docs: https://stripe.com/docs

## 🤝 Support

For support, kontakt BNC.

## 📄 License

Proprietary - Alle rettigheder forbeholdes.

---

**Version:** 1.0.0  
**Dato:** November 2025  
**Udviklet af:** BNC

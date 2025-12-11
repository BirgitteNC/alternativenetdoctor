# Deployment Guide - Alternativ Netdoktor

## 🎯 Anbefalet Setup

**Backend (Strapi):** Railway eller DigitalOcean App Platform  
**Frontend (Next.js):** Vercel  
**Database:** Railway PostgreSQL eller DigitalOcean Managed PostgreSQL  
**Domain:** www.alternativenetdoctor.com

---

## 1️⃣ Database Setup

### Railway PostgreSQL (Nemmest)

1. Gå til https://railway.app
2. Opret nyt projekt
3. Tilføj PostgreSQL service
4. Kopier connection string fra Railway dashboard
5. Format: `postgresql://user:password@host:port/database`

### DigitalOcean Managed Database

1. Opret Managed PostgreSQL database
2. Vælg region (EU for GDPR)
3. Kopier connection details
4. Aktivér SSL connection

---

## 2️⃣ Backend Deployment (Strapi)

### Option A: Railway

1. Push kode til GitHub
2. Opret nyt Railway projekt
3. Connect GitHub repository
4. Vælg `backend` som root directory
5. Tilføj environment variables:

```env
NODE_ENV=production
DATABASE_HOST=<from-railway-db>
DATABASE_PORT=5432
DATABASE_NAME=railway
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=<from-railway-db>
DATABASE_SSL=true
APP_KEYS=<generate-random>
API_TOKEN_SALT=<generate-random>
ADMIN_JWT_SECRET=<generate-random>
TRANSFER_TOKEN_SALT=<generate-random>
JWT_SECRET=<generate-random>
FRONTEND_URL=https://www.alternativenetdoctor.com
```

6. Deploy automatisk
7. Custom domain: strapi.alternativenetdoctor.com

### Option B: DigitalOcean App Platform

1. Connect GitHub repository
2. Vælg `backend` directory
3. Build command: `npm install && npm run build`
4. Run command: `npm start`
5. Tilføj environment variables (som ovenfor)
6. Choose EU region
7. Deploy

**Generer secrets med:**
```bash
openssl rand -base64 32
```

---

## 3️⃣ Frontend Deployment (Next.js)

### Vercel (Anbefalet)

1. Gå til https://vercel.com
2. Import GitHub repository
3. Root Directory: `frontend`
4. Framework Preset: Next.js (auto-detect)
5. Environment Variables:

```env
NEXT_PUBLIC_STRAPI_URL=https://strapi.alternativenetdoctor.com
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

6. Deploy
7. Custom Domain: www.alternativenetdoctor.com

### Vercel CLI Deployment

```bash
cd frontend
npm install -g vercel
vercel login
vercel --prod
```

---

## 4️⃣ Domain Setup

### DNS Konfiguration

**Vercel (Frontend):**
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**Railway/DO (Backend):**
```
Type: CNAME
Name: strapi
Value: <railway-app>.up.railway.app
```

### SSL Certificates

Både Vercel og Railway/DO håndterer automatisk SSL certificates via Let's Encrypt.

---

## 5️⃣ Stripe Production Setup

1. Log ind på Stripe Dashboard
2. Skift til Live mode
3. Hent Production API keys
4. Opdater environment variables
5. Opsæt webhook endpoint: `https://www.alternativenetdoctor.com/api/webhook`
6. Subscribe til events: `checkout.session.completed`

---

## 6️⃣ CORS & Security

### Strapi CORS Config

Opdater `backend/config/middlewares.js`:

```javascript
{
  name: 'strapi::cors',
  config: {
    origin: [
      'https://www.alternativenetdoctor.com',
      'https://alternativenetdoctor.com'
    ],
  },
}
```

### Next.js Security Headers

Tilføj til `next.config.js`:

```javascript
async headers() {
  return [
    {
      source: '/:path*',
      headers: [
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
      ],
    },
  ];
},
```

---

## 7️⃣ Monitoring & Analytics

### Vercel Analytics

Automatisk aktiveret for Next.js på Vercel.

### Strapi Logs

- Railway: Tilgængelig i dashboard
- DigitalOcean: App logs under Runtime Logs

### Uptime Monitoring

Brug: UptimeRobot eller Pingdom

---

## 8️⃣ Backup Strategy

### Database Backups

**Railway:**
- Automatiske daglige backups
- Manual backup via dashboard

**DigitalOcean:**
- Automatiske daglige backups
- Configurable retention

### Strapi Media Backups

Upload til S3/DigitalOcean Spaces for persistens:

```javascript
// backend/config/plugins.js
module.exports = {
  upload: {
    config: {
      provider: 'aws-s3',
      providerOptions: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_ACCESS_SECRET,
        region: 'eu-west-1',
        params: {
          Bucket: process.env.AWS_BUCKET,
        },
      },
    },
  },
};
```

---

## 9️⃣ Post-Deployment Checklist

- [ ] Backend accessible på https://strapi.alternativenetdoctor.com
- [ ] Frontend accessible på https://www.alternativenetdoctor.com
- [ ] Admin panel login virker
- [ ] API calls fra frontend til backend virker
- [ ] Billeder loades korrekt
- [ ] Multi-sprog switcher virker
- [ ] Søgning returnerer resultater
- [ ] Produkter kan tilføjes til kurv
- [ ] Stripe checkout flow virker
- [ ] All 5 sprog er tilgængelige
- [ ] SSL certificates er active
- [ ] Domain redirects korrekt (www ↔ non-www)
- [ ] Analytics tracking virker
- [ ] Cookie consent banner vises

---

## 🔧 Troubleshooting

### Frontend kan ikke connecte til backend

1. Check NEXT_PUBLIC_STRAPI_URL er korrekt
2. Verify CORS settings i Strapi
3. Check network tab i browser dev tools

### Database connection errors

1. Verify DATABASE_HOST og credentials
2. Check SSL setting (DATABASE_SSL=true for production)
3. Whitelist IP hvis nødvendigt

### Billeder vises ikke

1. Check Strapi uploads folder permissions
2. Verify image domains i next.config.js
3. Consider using S3/Spaces for media

### Slow build times

1. Enable Next.js caching
2. Optimize images
3. Consider edge functions for Vercel

---

## 📈 Skalering

### Performance Optimization

- Enable Next.js Image Optimization
- Implement Redis caching for Strapi
- Use CDN for static assets
- Enable Vercel Edge Functions

### Database Scaling

- Upgrade to higher tier on Railway/DO
- Implement read replicas
- Add database indexes

---

## 💰 Cost Estimation (Monthly)

**Minimal Setup:**
- Railway Starter: $5
- Vercel Hobby: Free
- **Total: ~$5/month**

**Production Setup:**
- Railway Pro: $20
- Vercel Pro: $20
- DO Managed DB: $15
- DO Spaces: $5
- **Total: ~$60/month**

---

## 📞 Support

For deployment support, kontakt BNC.

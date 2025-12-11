# ⚡ Quick Start - Deployment Checklist

## 🎯 Hurtig Oversigt

1. **Backend**: Railway (PostgreSQL + Strapi)
2. **Frontend**: Vercel (Next.js)

---

## ✅ Deployment Checklist

### Backend (Railway) - 15-20 minutter

- [ ] Opret Railway konto på https://railway.app
- [ ] Opret nyt projekt
- [ ] Tilføj PostgreSQL database
- [ ] Deploy backend (upload `backend` mappe eller GitHub)
- [ ] Sæt environment variables (se `backend/ENV_SETUP.md`)
- [ ] Generer security keys med Node.js kommandoer
- [ ] Vent på deployment (5-10 min)
- [ ] Test backend URL: `https://din-backend.railway.app/admin`
- [ ] Opret admin bruger første gang

### Frontend (Vercel) - 10-15 minutter

- [ ] Opret Vercel konto på https://vercel.com
- [ ] Opret nyt projekt
- [ ] Import `frontend` mappe (eller GitHub)
- [ ] Sæt environment variable: `NEXT_PUBLIC_STRAPI_URL=https://din-backend.railway.app`
- [ ] Deploy (automatisk)
- [ ] Test frontend URL: `https://din-frontend.vercel.app/da`

### Opdater Backend CORS - 2 minutter

- [ ] Gå tilbage til Railway backend
- [ ] Opdater `FRONTEND_URL` environment variable med din Vercel URL
- [ ] Vent på redeploy

### Test Alt - 5 minutter

- [ ] Test `/da` route
- [ ] Test `/en` route  
- [ ] Test `/da/articles`
- [ ] Test backend API: `/api/articles`
- [ ] Test Strapi admin: `/admin`

---

## 🔑 Vigtige Links (Efter Deployment)

**Frontend:**
- Dansk: `https://din-frontend.vercel.app/da`
- Engelsk: `https://din-frontend.vercel.app/en`

**Backend:**
- API: `https://din-backend.railway.app/api`
- Admin: `https://din-backend.railway.app/admin`

---

## 📝 Environment Variables Reference

### Railway Backend (se `backend/ENV_SETUP.md` for detaljer)

```env
DATABASE_CLIENT=postgres
DATABASE_HOST=${{Postgres.PGHOST}}
DATABASE_PORT=${{Postgres.PGPORT}}
DATABASE_NAME=${{Postgres.PGDATABASE}}
DATABASE_USERNAME=${{Postgres.PGUSER}}
DATABASE_PASSWORD=${{Postgres.PGPASSWORD}}
DATABASE_SSL=true
FRONTEND_URL=https://din-frontend.vercel.app
APP_KEYS=key1,key2,key3,key4
API_TOKEN_SALT=...
ADMIN_JWT_SECRET=...
TRANSFER_TOKEN_SALT=...
JWT_SECRET=...
```

### Vercel Frontend

```env
NEXT_PUBLIC_STRAPI_URL=https://din-backend.railway.app
```

---

## 🐛 Hvis Noget Går Galt

1. **404 på /da eller /en**: Tjek Vercel build logs, verificer middleware.ts
2. **CORS fejl**: Tjek at `FRONTEND_URL` i Railway matcher Vercel URL præcist
3. **Backend går i dvale**: Opret cron job på cron-job.org til at ping backend hver 5. minut
4. **Database fejl**: Tjek Railway logs, verificer alle database environment variables

---

## 📚 Detaljeret Guide

Se `DEPLOYMENT_GUIDE.md` for komplet step-by-step guide med screenshots og troubleshooting.

---

**God deployment! 🚀**


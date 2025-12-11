# Frontend Environment Variables Setup

Kopiér denne værdi og indsæt i Vercel → Settings → Environment Variables:

## Production Environment Variable

```env
NEXT_PUBLIC_STRAPI_URL=https://your-backend-url.railway.app
```

**VIGTIGT**: Erstat `your-backend-url.railway.app` med din faktiske Railway backend URL!

## Optional: Stripe (hvis du bruger betalinger)

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```


# Backend Environment Variables Setup

Kopiér denne liste og udfyld værdierne i Railway:

## Database Variables (fra PostgreSQL service)

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

## Server Variables

```env
HOST=0.0.0.0
PORT=1337
NODE_ENV=production
```

## Frontend URL (opdater efter frontend deployment)

```env
FRONTEND_URL=https://your-frontend-url.vercel.app
```

## Security Keys (generer med kommandoer nedenfor)

```env
APP_KEYS=key1,key2,key3,key4
API_TOKEN_SALT=your-salt-here
ADMIN_JWT_SECRET=your-secret-here
TRANSFER_TOKEN_SALT=your-salt-here
JWT_SECRET=your-jwt-secret-here
```

## Generer Security Keys

Kør disse kommandoer i PowerShell/Terminal:

```powershell
# APP_KEYS (4 keys)
node -e "console.log(Array(4).fill(0).map(() => require('crypto').randomBytes(32).toString('base64')).join(','))"

# API_TOKEN_SALT
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# ADMIN_JWT_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# TRANSFER_TOKEN_SALT
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# JWT_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Kopiér hver output og indsæt i Railway environment variables.


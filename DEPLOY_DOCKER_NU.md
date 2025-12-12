# 🐳 Deploy Med Docker - Ingen GitHub Nødvendig

## Render CLI virker ikke - Brug Docker i stedet

---

## TRIN 1: Build Docker Image Lokalt

I CMD, gå til backend mappen:

```cmd
cd C:\Users\birgi\Downloads\alternativenetdoctor\backend
docker build -t alternativenetdoctor-backend .
```

---

## TRIN 2: Opret Docker Hub Konto (Gratis)

1. Gå til https://hub.docker.com/signup
2. Opret gratis konto
3. Log ind

---

## TRIN 3: Push til Docker Hub

I CMD:

```cmd
docker login
docker tag alternativenetdoctor-backend dit-brugernavn/alternativenetdoctor-backend
docker push dit-brugernavn/alternativenetdoctor-backend
```

---

## TRIN 4: Deploy i Render fra Docker Hub

1. Gå til Render dashboard
2. Klik "New +" → "Web Service"
3. Vælg "Existing Image"
4. Image URL: `docker.io/dit-brugernavn/alternativenetdoctor-backend`
5. Klik "Create"

---

**Dette SKAL virke - Docker er den mest pålidelige metode! 🚀**


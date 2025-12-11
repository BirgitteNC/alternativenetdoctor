# 🔑 Opret GitHub Token - Direkte Link

## Den Nemmeste Metode: Brug Direkte Link

GitHub har ændret deres interface, så "Developer settings" kan være svært at finde. Brug direkte link i stedet!

---

## TRIN 1: Gå Direkte til Tokens

**Kopiér denne URL og indsæt i browseren:**

```
https://github.com/settings/tokens
```

Eller:

```
https://github.com/settings/developers
```

---

## TRIN 2: Opret Nyt Token

1. Du kommer til en side med "Personal access tokens"
2. Klik på **"Generate new token"** → **"Generate new token (classic)"**
3. Udfyld:
   - **Note**: `Render Deployment` (valgfrit navn)
   - **Expiration**: Vælg **"90 days"** eller **"No expiration"**
   - **Scopes**: Scroll ned og check **"repo"** (dette giver adgang til repositories)
4. Scroll helt ned og klik **"Generate token"**
5. **VIGTIGT**: Kopiér tokenet med det samme! (Du kan ikke se det igen)
   - Det starter med `ghp_` og er meget langt

---

## TRIN 3: Brug Tokenet i Git

Gå tilbage til din Command Prompt og kør:

```cmd
git push -u origin main
```

Når Git spørger om:
- **Username**: Indtast dit GitHub brugernavn (`BirgitteNC`)
- **Password**: Indtast **tokenet** du lige kopierede (ikke dit password!)

---

## Hvis Direkte Link Ikke Virker

Prøv denne metode:

1. Gå til: https://github.com
2. Klik på dit profilbillede (øverst til højre)
3. Klik **"Settings"**
4. I browserens adressebar, skriv `/settings/tokens` efter URL'en
5. Eller søg efter "token" i Settings siden

---

**Prøv at gå til https://github.com/settings/tokens direkte! 🚀**


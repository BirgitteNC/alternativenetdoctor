# FIX FOR PRODUKT NAVNE OG SYMPTOM BESKRIVELSER

## PROBLEMET:
- Produkter viser ikke navne (kun priser)
- Symptomer viser ikke beskrivelser (kun "...")

## ÅRSAGEN:
Koden bruger forkerte feltnavne fra Strapi:
- ❌ `product.attributes.title` → ✅ `product.attributes.name`
- ❌ `symptom.attributes.description` → ✅ `symptom.attributes.Beskrivelse`

---

## LØSNING - ERSTAT 3 FILER:

### 1. PRODUKTER SIDE
**Fil:** `frontend/src/app/[locale]/produkter/page.tsx`
**Erstat med:** `produkter-page-FIXED.tsx`

**Ændringer:**
- Linje 46: `product.attributes.title` → `product.attributes.name`
- Linje 52: `product.attributes.title` → `product.attributes.name`

---

### 2. SYMPTOMER SIDE
**Fil:** `frontend/src/app/[locale]/symptoms/page.tsx`
**Erstat med:** `symptoms-page-FIXED.tsx`

**Ændringer:**
- Linje 51: `symptom.attributes.description` → `symptom.attributes.Beskrivelse`

---

### 3. FORSIDE
**Fil:** `frontend/src/app/[locale]/page.tsx`
**Erstat med:** `homepage-FIXED.tsx`

**Ændringer:**
- Linje 151: `symptom.attributes.description` → `symptom.attributes.Beskrivelse`
- Linje 178: `product.attributes.title` → `product.attributes.name`
- Linje 186: `product.attributes.title` → `product.attributes.name`

---

## TRIN-FOR-TRIN:

1. **Download de 3 rettede filer:**
   - produkter-page-FIXED.tsx
   - symptoms-page-FIXED.tsx
   - homepage-FIXED.tsx

2. **Naviger til frontend mappen:**
   ```
   C:\Users\Birgitte Nyboe Christensen\Overførsler\alternativenetdoctor\frontend\
   ```

3. **Erstat filerne:**
   - Omdøb `produkter-page-FIXED.tsx` til `page.tsx`
   - Kopier til: `src/app/[locale]/produkter/page.tsx`
   
   - Omdøb `symptoms-page-FIXED.tsx` til `page.tsx`
   - Kopier til: `src/app/[locale]/symptoms/page.tsx`
   
   - Omdøb `homepage-FIXED.tsx` til `page.tsx`
   - Kopier til: `src/app/[locale]/page.tsx`

4. **Genstart Next.js udviklings server:**
   ```bash
   cd frontend
   npm run dev
   ```

5. **Test i browser:**
   - http://localhost:3000/da/produkter (skal nu vise produkt navne)
   - http://localhost:3000/da/symptoms (skal nu vise beskrivelser)
   - http://localhost:3000/da (forside skal vise alt korrekt)

---

## FORVENTET RESULTAT:

✅ Produkter viser: Navn + Pris (ikke kun pris)
✅ Symptomer viser: Navn + Beskrivelse (ikke kun "...")
✅ Forside viser begge korrekt

---

## HVIS DER ER PROBLEMER:

Tjek at Strapi kører på http://localhost:1337
Tjek browser console for fejl (F12)

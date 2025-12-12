# Alternativ Netdoktor - Database Seeding Scripts

This folder contains scripts to automatically populate your Strapi database with initial content.

## What gets seeded:
- **7 Categories** (Årsager, Livsstilsråd, Naturlige Tilgange, etc.)
- **75 Articles** (distributed across all categories)
- **100 Products** (vitamins, minerals, supplements)
- **50 Supplements/Herbs** (with Latin names, benefits, dosages)
- **40 Symptoms/Conditions** (with descriptions and related conditions)

**Total: 272 entries**

---

## Prerequisites

1. **Strapi is running**: Make sure your Strapi backend is running on `http://localhost:1337`
   ```bash
   cd backend
   npm run develop
   ```

2. **node-fetch@2 installed**: IMPORTANT - Must be version 2, not 3
   ```bash
   npm install node-fetch@2
   ```

3. **API Token with Full Access**: 
   - In Strapi admin → Settings → API Tokens
   - Create token with "Full access" permissions
   - Token is already configured in the scripts

---

## How to run

### Seed everything at once (recommended)
```bash
node seed-all.js
```

This will seed all content types in the correct order:
1. Categories (7 entries)
2. Articles (75 entries - requires categories)
3. Products (100 entries)
4. Supplements/Herbs (50 entries)
5. Symptoms/Conditions (40 entries)

**Expected duration: 30-60 seconds**

### Individual scripts (if needed)
```bash
node seed-categories.js    # 7 categories
node seed-articles.js      # 75 articles (run categories first!)
node seed-products.js      # 100 products
node seed-supplements.js   # 50 supplements/herbs
node seed-symptoms.js      # 40 symptoms/conditions
```

---

## Expected output

```
============================================================
🌱 STARTING COMPLETE DATABASE SEEDING
============================================================

📁 Step 1/5: Categories
=== SEEDING CATEGORIES ===
✓ Created: Årsager (ID: 1)
✓ Created: Livsstilsråd (ID: 2)
...
=== CATEGORIES COMPLETE ===
Created: 7
Errors: 0

📝 Step 2/5: Articles
=== SEEDING ARTICLES ===
Fetching category IDs...
Categories found: 7

--- Category: causes (11 articles) ---
  ✓ Stress og dets indflydelse på immunforsvaret...
...

============================================================
✅ ALL SEEDING COMPLETE!
============================================================

Summary:
• Categories: 7 created, 0 errors
• Articles: 75 created, 0 errors
• Products: 100 created, 0 errors
• Supplements/Herbs: 50 created, 0 errors
• Symptoms/Conditions: 40 created, 0 errors

Total: 272 entries created
Total errors: 0
Duration: 45.32 seconds
```

---

## Verification

After seeding:

1. **Check Strapi Admin**: Visit `http://localhost:1337/admin`
   - Content Manager → Article (should show 75+ entries)
   - Content Manager → Category (should show 7 entries)
   - Content Manager → Product (should show 100 entries)
   - Content Manager → Supplement/Herb (should show 50 entries)
   - Content Manager → Symptom Condition (should show 40 entries)

2. **Check Frontend**: Visit `http://localhost:3000/da`
   - Should see articles on homepage
   - Navigation should work
   - Search should find content

---

## Troubleshooting

### Error: "fetch is not a function"
**Solution:**
```bash
npm uninstall node-fetch
npm install node-fetch@2
```
Version 2 is required for CommonJS `require()` syntax.

### Error: "Unauthorized" or "Forbidden"  
**Solution:**
- Verify API token has "Full access" in Strapi admin
- Settings → API Tokens → Check your token type
- If needed, create new token and update scripts

### Error: "Cannot find categories" (in seed-articles.js)
**Solution:**
- Run `node seed-categories.js` first
- Or run `node seed-all.js` which does correct order

### Scripts report success but no data in Strapi
**This should NOT happen with the new scripts.**
If it does:
1. Check Strapi console for errors
2. Verify Strapi is on http://localhost:1337
3. Run the test script: `node test-one-article.js`

### Duplicates after multiple runs
**Note:** Running scripts multiple times creates duplicates, it doesn't update.
To reset: Delete entries in Strapi admin manually.

---

## Test script

A debug script is included to test your setup:
```bash
node test-one-article.js
```

This creates a single test article and shows detailed output.
If this works, the seeding will work.

---

## File structure

```
seed-all.js           # Master script - runs all in order
seed-categories.js    # 7 categories
seed-articles.js      # 75 articles (11 per category)
seed-products.js      # 100 health products
seed-supplements.js   # 50 herbs and supplements
seed-symptoms.js      # 40 symptoms and conditions
test-one-article.js   # Debug script for testing
README-SEED.md        # This file
```

---

## Important notes

- All content is in Danish
- Articles are evenly distributed across 7 categories (10-11 per category)
- Each article has: title, slug, content, category relation, publishedAt
- All entries are auto-published (publishedAt is set)
- Content includes real health information, not just placeholders
- Running scripts multiple times will create duplicates
- Scripts use node-fetch@2 with CommonJS syntax (require/module.exports)

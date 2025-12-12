const fetch = require('node-fetch');

const API_URL = 'http://localhost:1337/api';
const API_TOKEN = '6dc322c63853d72c421adc626e70a8e949a02eccd25f416e00658508f796fa4a6bfd5a085a30192bdc4cd654c8505da3cfcbb8905b35aea431d806d644393bb60544cb32faa5c992c2213e75d4c4809250bb2080f5b4b0fa287c626bbea1671a5855a2daed1142ed86eddd4a1119c9da36bddc7335c16f62f85f686867ceff69';

const products = [
  // Vitamins
  { name: 'D-vitamin 2000 IE', description: 'Højdosis D-vitamin til støtte for immunforsvar og knogler', price: 129 },
  { name: 'Vitamin C 1000mg', description: 'Buffered vitamin C til immunforsvar', price: 149 },
  { name: 'B-kompleks højdosis', description: 'Alle B-vitaminer i aktive former', price: 199 },
  { name: 'Vitamin K2 MK-7', description: 'Naturlig K2 fra natto til knoglesundhed', price: 179 },
  { name: 'A-vitamin 10000 IE', description: 'Retinol til syn og immunforsvar', price: 139 },
  { name: 'E-vitamin blandede tokoferol er', description: 'Naturlig E-vitamin med alle former', price: 169 },
  { name: 'Methylfolat 5-MTHF', description: 'Aktiv folat til methylering', price: 189 },
  { name: 'Methylcobalamin B12', description: 'Aktiv B12 til energi og nervesystem', price: 159 },
  { name: 'Biotin højdosis', description: 'B7 til hår, hud og negle', price: 129 },
  { name: 'Pantothensyre B5', description: 'Støtter binyrefunktion', price: 149 },
  
  // Minerals
  { name: 'Magnesiumbisglycinat 200mg', description: 'Let absorberbart magnesium', price: 169 },
  { name: 'Zink picolinat 25mg', description: 'Højt absorberbart zink', price: 139 },
  { name: 'Selen selenomethionin', description: 'Organisk selen til skjoldbruskkirtel', price: 129 },
  { name: 'Jern bisglycinat', description: 'Mildt jern uden bivirk ninger', price: 149 },
  { name: 'Calcium citrat', description: 'Let absorberbar calciumform', price: 139 },
  { name: 'Kalium citrat', description: 'Til blodtryksregulering', price: 159 },
  { name: 'Chrom picolinat', description: 'Støtter blodsukkerbalance', price: 119 },
  { name: 'Jod fra tang', description: 'Naturlig jod til skjoldbruskkirtlen', price: 129 },
  { name: 'Molybdæn', description: 'Sporstof til detoxifikation', price: 109 },
  { name: 'Mangan bisglycinat', description: 'Til led og knoglesundhed', price: 119 },
  
  // Omega & Fats
  { name: 'Omega-3 1000mg EPA/DHA', description: 'Renset fiskeolie af høj kvalitet', price: 249 },
  { name: 'Vegansk algeolie omega-3', description: 'Plantebaseret DHA og EPA', price: 299 },
  { name: 'Krill olie', description: 'Med astaxanthin', price: 349 },
  { name: 'MCT olie', description: 'Medium-chain triglycerides fra kokosnød', price: 199 },
  { name: 'CLA konjugeret linolsyre', description: 'Fedtsyre til kropssam mensætning', price: 229 },
  { name: 'GLA fra natlysol ie', description: 'Gamma-linolensyre til inflammation', price: 189 },
  { name: 'Fosfatidylserin', description: 'Til hjernefunktion og hukommelse', price: 279 },
  { name: 'Fosfatidylcholin', description: 'Leverstøtte og cellevægge', price: 259 },
  
  // Probiotics
  { name: 'Probiotika 50 milliarder', description: '10 forskellige stammer', price: 299 },
  { name: 'Lactobacillus acidophilus', description: 'Enkelt stamme højdosis', price: 199 },
  { name: 'Saccharomyces boulardii', description: 'Gær-probiotikum til diarré', price: 249 },
  { name: 'Soil-based probiotika', description: 'Spore-baserede bakterier', price: 329 },
  { name: 'Bifidobacterium blend', description: 'Specifikt til tyktarm', price: 279 },
  
  // Digestive Enzymes
  { name: 'Fordøjelsesenzymer komplet', description: 'Protease, amylase, lipase', price: 219 },
  { name: 'Betain HCl med pepsin', description: 'Til lav mavesyre', price: 189 },
  { name: 'Papain fra papaya', description: 'Proteinfordøjende enzym', price: 159 },
  { name: 'Bromelain fra ananas', description: 'Antiinflammatorisk enzym', price: 169 },
  { name: 'Laktase', description: 'Til laktoseintolerance', price: 139 },
  
  // Amino Acids
  { name: 'L-Glutamin pulver', description: 'Til tarmslimhinde', price: 219 },
  { name: 'L-Lysin', description: 'Essentiel aminosyre', price: 149 },
  { name: 'L-Arginin', description: 'Til nitrogenoxidproduktion', price: 169 },
  { name: 'L-Carnitin', description: 'Til fedtforbrænding', price: 249 },
  { name: 'Glycin pulver', description: 'Til søvn og collagen', price: 179 },
  { name: 'Taurin', description: 'Til hjerte og nervesystem', price: 159 },
  { name: 'NAC N-acetylcystein', description: 'Antioxidant og leverstøtte', price: 199 },
  { name: 'L-Theanin', description: 'Til ro uden træthed', price: 189 },
  { name: 'L-Tyrosin', description: 'Til fokus og skjoldbruskkirtel', price: 169 },
  { name: 'L-Tryptofan', description: 'Til serotonin og søvn', price: 229 },
  
  // Antioxidants
  { name: 'Glutathion liposomal', description: 'Master antioxidant', price: 349 },
  { name: 'Alpha-liponsyre', description: 'Universal antioxidant', price: 249 },
  { name: 'CoQ10 ubiquinol', description: 'Aktiv form til energi', price: 299 },
  { name: 'Resveratrol', description: 'Fra druer til antiaging', price: 279 },
  { name: 'Quercetin', description: 'Bioflavonoid til allergi', price: 219 },
  { name: 'Astaxanthin', description: 'Kraftigt marint antioxidant', price: 289 },
  { name: 'PQQ pyrroloquinolin', description: 'Til mitokondrier', price: 329 },
  { name: 'SOD Superoxid dismutase', description: 'Enzymatisk antioxidant', price: 259 },
  
  // Specialty
  { name: 'Collagen type I & III', description: 'Til hud, led og knogler', price: 349 },
  { name: 'Hyaluronsyre', description: 'Til ledvæske og hud', price: 299 },
  { name: 'MSM methylsulfonylmethan', description: 'Organisk svovl til led', price: 199 },
  { name: 'Glucosamin & chondroitin', description: 'Til ledbrusk', price: 279 },
  { name: 'Berberin', description: 'Til blodsukkerbalance', price: 249 },
  { name: 'Melatonin 3mg', description: 'Til søvn og jetlag', price: 119 },
  { name: 'Curcumin kompleks', description: 'Højabsorberbar kurkuma', price: 289 },
  { name: 'Silymarin mælketi stel', description: 'Leverstøtte', price: 219 },
  { name: 'SAMe S-adenosylmethionin', description: 'Til stemningsleje og methylering', price: 399 },
  { name: 'Phosphatidylserin PS', description: 'Til kognitiv funktion', price: 329 },
  { name: 'Lutein & zeaxanthin', description: 'Til øjensundhed', price: 239 },
  { name: 'Beta-glucan', description: 'Fra svampe til immunforsvar', price: 279 },
  { name: 'Enzym Q10 + selen', description: 'Kombination til hjertesundhed', price: 319 },
  { name: 'Inositol', description: 'Til PCOS og stemningsleje', price: 229 },
  { name: 'DIM Diindolylmethan', description: 'Østrogenmetabolisme', price: 289 },
  { name: 'Pregnenolon', description: 'Hormonprecursor', price: 259 },
  { name: 'DHEA', description: 'Adrenal support', price: 249 },
  { name: 'PEA palmitoylethanolamid', description: 'Til smertelindring', price: 299 },
  { name: 'Arabinogalactan', description: 'Prebiotisk fiber fra lærketræ', price: 219 },
  
  // Protein & Performance
  { name: 'Whey protein isolat', description: 'Renset proteinpulver', price: 349 },
  { name: 'Vegansk proteinblend', description: 'Ærte, ris og hampepro tein', price: 299 },
  { name: 'Collagen peptider', description: 'Hydroly seret collagen', price: 329 },
  { name: 'Kreatin monohydrat', description: 'Til styrke og præstation', price: 179 },
  { name: 'BCAA 2:1:1', description: 'Forgrenet kædet aminosyrer', price: 249 },
  { name: 'HMB beta-hydroxy-beta-methylbutyrat', description: 'Til muskelbevaring', price: 279 },
  { name: 'Beta-alanin', description: 'Til udholdenhed', price: 199 },
  { name: 'Citrullin malat', description: 'Til blodgennemstrømning', price: 229 },
  
  // Fiber & Cleanse
  { name: 'Psyllium frøskaller', description: 'Opløseligt fiber', price: 139 },
  { name: 'Inulin prebiotikum', description: 'Føde til gode bakterier', price: 149 },
  { name: 'Aktivt kul', description: 'Til binding af toksiner', price: 169 },
  { name: 'Bentonit ler', description: 'Detox support', price: 179 },
  { name: 'Chlorella', description: 'Grøn alge til tungmetaller', price: 249 },
  { name: 'Spirulina', description: 'Proteinrig blågrøn alge', price: 219 },
  { name: 'Acacia gummi', description: 'Blid prebiotisk fiber', price: 159 },
  { name: 'FOS fructooligosaccharider', description: 'Prebiotisk sukker', price: 139 },
  
  // Glandulars
  { name: 'Binyreglandular', description: 'Bovint binyreva ev', price: 299 },
  { name: 'Skjoldbruskkirtel glandular', description: 'Thyroid support', price: 349 },
  { name: 'Lever glandular', description: 'Næringsstoffer fra lever', price: 279 },
  { name: 'Thymus glandular', description: 'Til immunsystem', price: 329 }
];

async function seedProducts() {
  console.log('\n=== SEEDING PRODUCTS ===\n');
  console.log(`Total products to create: ${products.length}\n`);
  
  let created = 0;
  let errors = 0;

  for (const product of products) {
    try {
      const slug = product.name
        .toLowerCase()
        .replace(/æ/g, 'ae')
        .replace(/ø/g, 'oe')
        .replace(/å/g, 'aa')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

      const productData = {
        data: {
          name: product.name,
          slug: slug,
          description: product.description,
          price: product.price,
          publishedAt: new Date().toISOString()
        }
      };

      const response = await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_TOKEN}`
        },
        body: JSON.stringify(productData)
      });

      if (response.ok) {
        console.log(`✓ ${product.name}`);
        created++;
      } else {
        const errorText = await response.text();
        console.log(`✗ Failed: ${product.name}`);
        console.log(`  ${errorText.substring(0, 100)}`);
        errors++;
      }
    } catch (error) {
      console.log(`✗ Failed: ${product.name}`);
      console.log(`  ${error.message}`);
      errors++;
    }
  }

  console.log('\n=== PRODUCTS COMPLETE ===');
  console.log(`Created: ${created}`);
  console.log(`Errors: ${errors}`);
  
  return { created, errors };
}

module.exports = seedProducts;

if (require.main === module) {
  seedProducts().then(() => process.exit(0)).catch(err => {
    console.error('Fatal error:', err);
    process.exit(1);
  });
}

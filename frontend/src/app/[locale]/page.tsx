import { getTranslations } from 'next-intl/server';
import { fetchArticles, fetchSupplementHerbs, fetchSymptomConditions, fetchProducts, getStrapiImageUrl } from '@/lib/strapi';
import Image from 'next/image';
import Link from 'next/link';

// Helper function to extract text from Rich Text Blocks
function extractTextFromBlocks(blocks: any): string {
  if (!blocks || !Array.isArray(blocks)) return '';
  
  let text = '';
  for (const block of blocks) {
    if (block.children && Array.isArray(block.children)) {
      for (const child of block.children) {
        if (child.type === 'text' && child.text) {
          text += child.text + ' ';
        }
      }
    }
  }
  return text.trim();
}

export async function generateMetadata({ 
  params: { locale } 
}: { 
  params: { locale: string } 
}) {
  const t = await getTranslations({ locale, namespace: 'HomePage' });
  
  return {
    title: t('title'),
    description: t('description')
  };
}

export default async function HomePage({ 
  params: { locale } 
}: { 
  params: { locale: string } 
}) {
  const t = await getTranslations('HomePage');
  const articles = await fetchArticles();
  const supplements = await fetchSupplementHerbs();
  const symptoms = await fetchSymptomConditions();
  const products = await fetchProducts();

  return (
    <div className="space-y-12">
      <section className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-4xl font-bold text-primary mb-4">
          {t('welcome')}
        </h1>
        <p className="text-lg text-gray-700">
          {t('intro')}
        </p>
      </section>

      {/* Seneste Artikler */}
      {articles.length > 0 && (
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-secondary">
              Seneste Artikler
            </h2>
            <Link href={`/${locale}/articles`} className="text-primary hover:underline">
              Se alle →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {articles.slice(0, 3).map((article) => {
              const imageUrl = getStrapiImageUrl(article.attributes.featuredImage);
              
              return (
                <Link 
                  key={article.id}
                  href={`/${locale}/articles/${article.attributes.slug}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {imageUrl && (
                    <div className="relative h-48 w-full">
                      <Image
                        src={imageUrl}
                        alt={article.attributes.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {article.attributes.title}
                    </h3>
                    <p className="text-gray-600 line-clamp-3">
                      {article.attributes.content.substring(0, 150)}...
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Kosttilskud & Urter */}
      {supplements.length > 0 && (
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-secondary">
              Kosttilskud & Urter
            </h2>
            <Link href={`/${locale}/kosttilskud`} className="text-primary hover:underline">
              Se alle →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {supplements.slice(0, 4).map((supplement) => {
              const imageUrl = getStrapiImageUrl(supplement.attributes.image);
              
              return (
                <Link 
                  key={supplement.id}
                  href={`/${locale}/kosttilskud/${supplement.attributes.slug}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {imageUrl && (
                    <div className="relative h-40 w-full">
                      <Image
                        src={imageUrl}
                        alt={supplement.attributes.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                      {supplement.attributes.name}
                    </h3>
                    <p className="text-sm text-gray-500 italic">
                      {supplement.attributes.latinName}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Symptomer & Tilstande */}
      {symptoms.length > 0 && (
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-secondary">
              Symptomer & Tilstande
            </h2>
            <Link href={`/${locale}/symptoms`} className="text-primary hover:underline">
              Se alle →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {symptoms.slice(0, 3).map((symptom) => {
              const imageUrl = getStrapiImageUrl(symptom.attributes.image);
              const beskrivelse = extractTextFromBlocks(symptom.attributes.description);
              
              return (
                <Link 
                  key={symptom.id}
                  href={`/${locale}/symptoms/${symptom.attributes.slug}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {imageUrl && (
                    <div className="relative h-48 w-full">
                      <Image
                        src={imageUrl}
                        alt={symptom.attributes.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {symptom.attributes.name}
                    </h3>
                    <p className="text-gray-600 line-clamp-3">
                      {beskrivelse ? beskrivelse.substring(0, 150) + '...' : ''}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Produkter */}
      {products.length > 0 && (
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-secondary">
              Anbefalede Produkter
            </h2>
            <Link href={`/${locale}/produkter`} className="text-primary hover:underline">
              Se alle →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {products.slice(0, 4).map((product) => {
              const imageUrl = getStrapiImageUrl(product.attributes.image);
              
              return (
                <Link 
                  key={product.id}
                  href={`/${locale}/produkter/${product.attributes.slug}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {imageUrl && (
                    <div className="relative h-48 w-full">
                      <Image
                        src={imageUrl}
                        alt={product.attributes.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {product.attributes.name}
                    </h3>
                    {product.attributes.price && (
                      <p className="text-primary font-bold">
                        {product.attributes.price} kr
                      </p>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}

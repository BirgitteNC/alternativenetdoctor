import { getTranslations } from 'next-intl/server';
import { fetchProducts, getStrapiImageUrl } from '@/lib/strapi';
import Image from 'next/image';
import Link from 'next/link';

export async function generateMetadata({ 
  params: { locale } 
}: { 
  params: { locale: string } 
}) {
  return {
    title: 'Produkter - Alternativ Netdoktor',
    description: 'Se vores udvalg af anbefalede produkter'
  };
}

export default async function ProductsPage({ 
  params: { locale } 
}: { 
  params: { locale: string } 
}) {
  const products = await fetchProducts();

  return (
    <div className="space-y-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-primary mb-4">
          Produkter
        </h1>
        <p className="text-lg text-gray-700">
          Se vores udvalg af anbefalede produkter
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => {
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
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  {product.attributes.name}
                </h2>
                {product.attributes.price && (
                  <p className="text-primary font-bold text-xl">
                    {product.attributes.price} kr
                  </p>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

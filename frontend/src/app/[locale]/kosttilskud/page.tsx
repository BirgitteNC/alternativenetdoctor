import { getTranslations } from 'next-intl/server';
import { fetchSupplementHerbs, getStrapiImageUrl } from '@/lib/strapi';
import Image from 'next/image';
import Link from 'next/link';

export async function generateMetadata({ 
  params: { locale } 
}: { 
  params: { locale: string } 
}) {
  return {
    title: 'Kosttilskud & Urter - Alternativ Netdoktor',
    description: 'Udforsk vores database med kosttilskud og medicinske urter'
  };
}

export default async function SupplementsPage({ 
  params: { locale } 
}: { 
  params: { locale: string } 
}) {
  const supplements = await fetchSupplementHerbs();

  return (
    <div className="space-y-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-primary mb-4">
          Kosttilskud & Urter
        </h1>
        <p className="text-lg text-gray-700">
          Udforsk vores omfattende database med kosttilskud og medicinske urter
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {supplements.map((supplement) => {
          const imageUrl = getStrapiImageUrl(supplement.attributes.image);
          
          return (
            <Link 
              key={supplement.id}
              href={`/${locale}/kosttilskud/${supplement.attributes.slug}`}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              {imageUrl && (
                <div className="relative h-48 w-full">
                  <Image
                    src={imageUrl}
                    alt={supplement.attributes.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-1">
                  {supplement.attributes.name}
                </h2>
                <p className="text-sm text-gray-500 italic mb-2">
                  {supplement.attributes.latinName}
                </p>
                <span className="inline-block px-2 py-1 text-xs bg-primary text-white rounded">
                  {supplement.attributes.type}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
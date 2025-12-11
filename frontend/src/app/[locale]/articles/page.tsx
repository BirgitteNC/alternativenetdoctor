import { getTranslations } from 'next-intl/server';
import { fetchArticles, getStrapiImageUrl } from '@/lib/strapi';
import Image from 'next/image';
import Link from 'next/link';

export async function generateMetadata({ 
  params: { locale } 
}: { 
  params: { locale: string } 
}) {
  return {
    title: 'Artikler - Alternativ Netdoktor',
    description: 'Læs vores artikler om alternativ sundhed og naturmedicin'
  };
}

export default async function ArticlesPage({ 
  params: { locale } 
}: { 
  params: { locale: string } 
}) {
  const articles = await fetchArticles();

  return (
    <div className="space-y-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-primary mb-4">
          Artikler
        </h1>
        <p className="text-lg text-gray-700">
          Udforsk vores samling af artikler om alternativ sundhed og naturmedicin
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => {
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
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {article.attributes.title}
                </h2>
                <p className="text-gray-600 line-clamp-3">
                  {article.attributes.content.substring(0, 150)}...
                </p>
                <div className="mt-4 text-primary font-medium">
                  Læs mere →
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
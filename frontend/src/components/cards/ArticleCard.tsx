import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import type { Article, StrapiData } from '@/types/strapi';


interface ArticleCardProps {
  article: StrapiData<Article>;
  locale: string;
}

export default function ArticleCard({ article, locale }: ArticleCardProps) {
  const t = useTranslations();
  const { attributes } = article;
  
 const imageUrl = attributes.featuredImage?.attributes?.url
  ? `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${attributes.featuredImage.attributes.url}`
  : 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800';

  const categories = attributes.categories?.data || [];

  return (
    <Link href={`/${locale}/articles/${attributes.slug}`}>
      <div className="card group h-full flex flex-col">
        {/* Image */}
        <div className="relative h-56 overflow-hidden">
          <Image
            src={imageUrl}
            alt={attributes.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {attributes.featured && (
            <div className="absolute top-4 right-4 bg-secondary-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              Featured
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          {/* Categories */}
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {categories.slice(0, 2).map((cat) => (
                <span
                  key={cat.id}
                  className="text-xs font-medium px-2 py-1 bg-primary-100 text-primary-700 rounded-full"
                >
                  {cat.attributes.name}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h3 className="text-xl font-bold text-sage-900 mb-3 group-hover:text-primary-700 transition-colors line-clamp-2">
            {attributes.title}
          </h3>

          {/* Teaser */}
          {attributes.teaser && (
            <p className="text-sage-600 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
              {attributes.teaser}
            </p>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-sage-200">
            <div className="flex items-center space-x-4 text-xs text-sage-500">
              {attributes.readingTime && (
                <span className="flex items-center space-x-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{attributes.readingTime} {t('article.readingTime')}</span>
                </span>
              )}
              {attributes.lastUpdated && (
                <span>
                  {new Date(attributes.lastUpdated).toLocaleDateString(locale)}
                </span>
              )}
            </div>
            <span className="text-primary-600 font-medium text-sm group-hover:translate-x-1 transition-transform">
              {t('common.readMore')} →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

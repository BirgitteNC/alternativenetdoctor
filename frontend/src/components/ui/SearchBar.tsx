'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import type { StrapiData, Article, Product, SupplementHerb } from '@/types/strapi';

interface SearchBarProps {
  locale: string;
}

export default function SearchBar({ locale }: SearchBarProps) {
  const t = useTranslations();
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<{
    articles: StrapiData<Article>[];
    products: StrapiData<Product>[];
    supplements: StrapiData<SupplementHerb>[];
  } | null>(null);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const searchDebounce = setTimeout(async () => {
      if (query.length >= 2) {
        setIsSearching(true);
        try {
          // const searchResults = await searchContent(query, locale);
          // setResults(searchResults);
          setShowResults(true);
        } catch (error) {
          console.error('Search error:', error);
        } finally {
          setIsSearching(false);
        }
      } else {
        setResults(null);
        setShowResults(false);
      }
    }, 300);

    return () => clearTimeout(searchDebounce);
  }, [query, locale]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/${locale}/search?q=${encodeURIComponent(query)}`);
      setShowResults(false);
    }
  };

  const totalResults =
    (results?.articles.length || 0) +
    (results?.products.length || 0) +
    (results?.supplements.length || 0);

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t('common.searchPlaceholder')}
          className="w-full px-6 py-4 pl-14 text-lg border-2 border-sage-300 rounded-full focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-200 transition-all shadow-lg"
        />
        <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
          <svg
            className="w-6 h-6 text-sage-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        {isSearching && (
          <div className="absolute right-5 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-600"></div>
          </div>
        )}
      </form>

      {/* Quick Results Dropdown */}
      {showResults && results && totalResults > 0 && (
        <div className="absolute w-full mt-2 bg-white rounded-2xl shadow-2xl border border-sage-200 max-h-96 overflow-y-auto z-50">
          {/* Articles */}
          {results.articles.length > 0 && (
            <div className="p-4 border-b border-sage-200">
              <h4 className="text-sm font-semibold text-sage-600 mb-2">
                {t('nav.articles')}
              </h4>
              {results.articles.slice(0, 3).map((article) => (
                <a
                  key={article.id}
                  href={`/${locale}/articles/${article.attributes.slug}`}
                  className="block p-3 hover:bg-sage-50 rounded-lg transition-colors"
                  onClick={() => setShowResults(false)}
                >
                  <h5 className="font-medium text-sage-900">
                    {article.attributes.title}
                  </h5>
                  {article.attributes.teaser && (
                    <p className="text-sm text-sage-600 line-clamp-1 mt-1">
                      {article.attributes.teaser}
                    </p>
                  )}
                </a>
              ))}
            </div>
          )}

          {/* Products */}
          {results.products.length > 0 && (
            <div className="p-4 border-b border-sage-200">
              <h4 className="text-sm font-semibold text-sage-600 mb-2">
                {t('nav.products')}
              </h4>
              {results.products.slice(0, 3).map((product) => (
                <a
                  key={product.id}
                  href={`/${locale}/products/${product.attributes.slug}`}
                  className="block p-3 hover:bg-sage-50 rounded-lg transition-colors"
                  onClick={() => setShowResults(false)}
                >
                  <h5 className="font-medium text-sage-900">
                    {product.attributes.name}
                  </h5>
                  <p className="text-sm text-primary-600 font-semibold mt-1">
                    {product.attributes.price} {product.attributes.currency}
                  </p>
                </a>
              ))}
            </div>
          )}

          {/* Supplements */}
          {results.supplements.length > 0 && (
            <div className="p-4">
              <h4 className="text-sm font-semibold text-sage-600 mb-2">
                {t('nav.supplements')}
              </h4>
              {results.supplements.slice(0, 3).map((supplement) => (
                <a
                  key={supplement.id}
                  href={`/${locale}/supplements/${supplement.attributes.slug}`}
                  className="block p-3 hover:bg-sage-50 rounded-lg transition-colors"
                  onClick={() => setShowResults(false)}
                >
                  <h5 className="font-medium text-sage-900">
                    {supplement.attributes.name}
                  </h5>
                  {supplement.attributes.latinName && (
                    <p className="text-sm text-sage-600 italic mt-1">
                      {supplement.attributes.latinName}
                    </p>
                  )}
                </a>
              ))}
            </div>
          )}

          {/* View All Results */}
          <div className="p-4 bg-sage-50 border-t border-sage-200">
            <button
              onClick={handleSubmit}
              className="w-full text-center text-primary-600 hover:text-primary-700 font-medium text-sm"
            >
              {t('common.viewAll')} ({totalResults})
            </button>
          </div>
        </div>
      )}

      {/* No Results */}
      {showResults && results && totalResults === 0 && (
        <div className="absolute w-full mt-2 bg-white rounded-2xl shadow-2xl border border-sage-200 p-6 text-center z-50">
          <p className="text-sage-600">{t('common.noResults')}</p>
        </div>
      )}
    </div>
  );
}

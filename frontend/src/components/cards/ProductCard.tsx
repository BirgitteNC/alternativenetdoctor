import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import type { Product, StrapiData } from '@/types/strapi';
import { getStrapiImageUrl } from '@/lib/strapi';

interface ProductCardProps {
  product: StrapiData<Product>;
  locale: string;
}

export default function ProductCard({ product, locale }: ProductCardProps) {
  const t = useTranslations();
  const { attributes } = product;
  
  const imageUrl = attributes.images?.[0]?.attributes?.url
  ? `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${attributes.images[0].attributes.url}`
  : 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800';

  const hasDiscount = attributes.compareAtPrice && attributes.compareAtPrice > attributes.price;
  const discountPercentage = hasDiscount
    ? Math.round(((attributes.compareAtPrice! - attributes.price) / attributes.compareAtPrice!) * 100)
    : 0;

  return (
    <Link href={`/${locale}/products/${attributes.slug}`}>
      <div className="card group h-full flex flex-col">
        {/* Image */}
        <div className="relative h-64 overflow-hidden bg-sage-50">
          <Image
            src={imageUrl}
            alt={attributes.name}
            fill
            className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {hasDiscount && (
            <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
              -{discountPercentage}%
            </div>
          )}
          {attributes.featured && (
            <div className="absolute top-4 left-4 bg-secondary-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              Featured
            </div>
          )}
          {attributes.stock === 0 && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="bg-white text-sage-900 px-4 py-2 rounded-lg font-semibold">
                {t('product.outOfStock')}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          {/* Product Type Badge */}
          <div className="mb-3">
            <span className="text-xs font-medium px-2 py-1 bg-secondary-100 text-secondary-700 rounded-full">
              {attributes.productType === 'dropshipping' ? 'Dropshipping' : 
               attributes.productType === 'affiliate' ? 'Partner' : 'Eget produkt'}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-sage-900 mb-2 group-hover:text-primary-700 transition-colors line-clamp-2">
            {attributes.name}
          </h3>

          {/* Short Description */}
          {attributes.shortDescription && (
            <p className="text-sage-600 text-sm leading-relaxed mb-4 line-clamp-2 flex-1">
              {attributes.shortDescription}
            </p>
          )}

          {/* Rating */}
          {attributes.rating && attributes.reviewCount && (
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(attributes.rating!)
                        ? 'text-yellow-400'
                        : 'text-sage-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs text-sage-600">
                ({attributes.reviewCount})
              </span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center justify-between pt-4 border-t border-sage-200">
            <div>
              {hasDiscount && (
                <p className="text-sm text-sage-500 line-through mb-1">
                  {attributes.compareAtPrice} {attributes.currency}
                </p>
              )}
              <p className="text-2xl font-bold text-primary-700">
                {attributes.price} {attributes.currency}
              </p>
            </div>
            <button
              className="btn-primary text-sm py-2 px-4"
              disabled={attributes.stock === 0}
            >
              {attributes.stock === 0 ? t('product.outOfStock') : t('product.buyNow')}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

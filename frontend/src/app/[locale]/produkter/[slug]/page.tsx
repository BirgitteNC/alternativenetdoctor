import { fetchProducts, getStrapiImageUrl } from '@/lib/strapi';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface ProductPageProps {
  params: {
    locale: string;
    slug: string;
  };
}

export async function generateStaticParams() {
  const products = await fetchProducts();
  return products.map((product) => ({
    slug: product.attributes.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps) {
  const products = await fetchProducts();
  const product = products.find(p => p.attributes.slug === params.slug);
  
  if (!product) {
    return { title: 'Ikke fundet' };
  }

  return {
    title: product.attributes.name,
    description: product.attributes.description?.substring(0, 160),
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const products = await fetchProducts();
  const product = products.find(p => p.attributes.slug === params.slug);

  if (!product) {
    notFound();
  }

  const imageUrl = getStrapiImageUrl(product.attributes.image);

  return (
    <article className="max-w-4xl mx-auto">
      <nav className="mb-6 text-sm text-gray-600">
        <Link href={`/${params.locale}`} className="hover:text-primary">
          Forside
        </Link>
        {' / '}
        <Link href={`/${params.locale}/produkter`} className="hover:text-primary">
          Produkter
        </Link>
        {' / '}
        <span className="text-gray-800">{product.attributes.name}</span>
      </nav>

      {imageUrl && (
        <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden">
          <Image
            src={imageUrl}
            alt={product.attributes.name}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <header className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {product.attributes.name}
        </h1>
        {product.attributes.price && (
          <p className="text-3xl text-primary font-bold">
            {product.attributes.price} kr
          </p>
        )}
      </header>

      <div className="prose prose-lg max-w-none mb-12">
        <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
          {product.attributes.description}
        </div>
      </div>

      <div className="border-t pt-8">
        <Link 
          href={`/${params.locale}/produkter`}
          className="inline-flex items-center text-primary hover:text-secondary font-medium"
        >
          Tilbage til produkter
        </Link>
      </div>
    </article>
  );
}
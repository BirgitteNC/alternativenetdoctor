import { fetchSupplementHerbs, getStrapiImageUrl } from '@/lib/strapi';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface SupplementPageProps {
  params: {
    locale: string;
    slug: string;
  };
}

export async function generateStaticParams() {
  const supplements = await fetchSupplementHerbs();
  return supplements.map((supplement) => ({
    slug: supplement.attributes.slug,
  }));
}

export async function generateMetadata({ params }: SupplementPageProps) {
  const supplements = await fetchSupplementHerbs();
  const supplement = supplements.find(s => s.attributes.slug === params.slug);
  
  if (!supplement) {
    return { title: 'Ikke fundet' };
  }

  return {
    title: supplement.attributes.name,
    description: supplement.attributes.description?.substring(0, 160),
  };
}

export default async function SupplementPage({ params }: SupplementPageProps) {
  const supplements = await fetchSupplementHerbs();
  const supplement = supplements.find(s => s.attributes.slug === params.slug);

  if (!supplement) {
    notFound();
  }

  const imageUrl = getStrapiImageUrl(supplement.attributes.image);

  return (
    <article className="max-w-4xl mx-auto">
      <nav className="mb-6 text-sm text-gray-600">
        <Link href={`/${params.locale}`} className="hover:text-primary">
          Forside
        </Link>
        {' / '}
        <Link href={`/${params.locale}/kosttilskud`} className="hover:text-primary">
          Kosttilskud
        </Link>
        {' / '}
        <span className="text-gray-800">{supplement.attributes.name}</span>
      </nav>

      {imageUrl && (
        <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden">
          <Image
            src={imageUrl}
            alt={supplement.attributes.name}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <header className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
          {supplement.attributes.name}
        </h1>
        <p className="text-xl text-gray-600 italic mb-4">
          {supplement.attributes.latinName}
        </p>
        <span className="inline-block px-3 py-1 bg-primary text-white rounded">
          {supplement.attributes.type}
        </span>
      </header>

      <div className="prose prose-lg max-w-none mb-12">
        <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
          {supplement.attributes.description}
        </div>
      </div>

      <div className="border-t pt-8">
        <Link 
          href={`/${params.locale}/kosttilskud`}
          className="inline-flex items-center text-primary hover:text-secondary font-medium"
        >
          Tilbage til kosttilskud
        </Link>
      </div>
    </article>
  );
}
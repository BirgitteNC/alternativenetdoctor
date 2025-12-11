import { fetchSymptomConditions, getStrapiImageUrl } from '@/lib/strapi';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface SymptomPageProps {
  params: {
    locale: string;
    slug: string;
  };
}

export async function generateStaticParams() {
  const symptoms = await fetchSymptomConditions();
  return symptoms.map((symptom) => ({
    slug: symptom.attributes.slug,
  }));
}

export async function generateMetadata({ params }: SymptomPageProps) {
  const symptoms = await fetchSymptomConditions();
  const symptom = symptoms.find(s => s.attributes.slug === params.slug);
  
  if (!symptom) {
    return { title: 'Ikke fundet' };
  }

  return {
    title: symptom.attributes.name,
    description: symptom.attributes.description?.substring(0, 160),
  };
}

export default async function SymptomPage({ params }: SymptomPageProps) {
  const symptoms = await fetchSymptomConditions();
  const symptom = symptoms.find(s => s.attributes.slug === params.slug);

  if (!symptom) {
    notFound();
  }

  const imageUrl = getStrapiImageUrl(symptom.attributes.image);

  return (
    <article className="max-w-4xl mx-auto">
      <nav className="mb-6 text-sm text-gray-600">
        <Link href={`/${params.locale}`} className="hover:text-primary">
          Forside
        </Link>
        {' / '}
        <Link href={`/${params.locale}/symptoms`} className="hover:text-primary">
          Symptomer
        </Link>
        {' / '}
        <span className="text-gray-800">{symptom.attributes.name}</span>
      </nav>

      {imageUrl && (
        <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden">
          <Image
            src={imageUrl}
            alt={symptom.attributes.name}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <header className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {symptom.attributes.name}
        </h1>
      </header>

      <div className="prose prose-lg max-w-none mb-12">
        <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
          {symptom.attributes.description}
        </div>
      </div>

      <div className="border-t pt-8">
        <Link 
          href={`/${params.locale}/symptoms`}
          className="inline-flex items-center text-primary hover:text-secondary font-medium"
        >
          Tilbage til symptomer
        </Link>
      </div>
    </article>
  );
}
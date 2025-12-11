import { getTranslations } from 'next-intl/server';
import { fetchSymptomConditions, getStrapiImageUrl } from '@/lib/strapi';
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
  return {
    title: 'Symptomer & Tilstande - Alternativ Netdoktor',
    description: 'Find information om symptomer og sundhedstilstande'
  };
}

export default async function SymptomsPage({ 
  params: { locale } 
}: { 
  params: { locale: string } 
}) {
  const symptoms = await fetchSymptomConditions();

  return (
    <div className="space-y-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-primary mb-4">
          Symptomer & Tilstande
        </h1>
        <p className="text-lg text-gray-700">
          Find information om forskellige symptomer og sundhedstilstande
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {symptoms.map((symptom) => {
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
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {symptom.attributes.name}
                </h2>
                <p className="text-gray-600 line-clamp-3">
                  {beskrivelse ? beskrivelse.substring(0, 150) + '...' : ''}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

import { fetchArticles, getStrapiImageUrl } from '@/lib/strapi';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface ArticlePageProps {
  params: {
    locale: string;
    slug: string;
  };
}

export async function generateStaticParams() {
  const articles = await fetchArticles();
  return articles.map((article) => ({
    slug: article.attributes.slug,
  }));
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const articles = await fetchArticles();
  const article = articles.find(a => a.attributes.slug === params.slug);
  
  if (!article) {
    return { title: 'Artikel ikke fundet' };
  }

  return {
    title: article.attributes.title,
    description: article.attributes.content.substring(0, 160),
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const articles = await fetchArticles();
  const article = articles.find(a => a.attributes.slug === params.slug);

  if (!article) {
    notFound();
  }

  const imageUrl = getStrapiImageUrl(article.attributes.featuredImage);
  const publishDate = new Date(article.attributes.publishedAt).toLocaleDateString('da-DK', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <article className="max-w-4xl mx-auto">
      <nav className="mb-6 text-sm text-gray-600">
        <Link href={`/${params.locale}`} className="hover:text-primary">
          Forside
        </Link>
        {' / '}
        <Link href={`/${params.locale}/articles`} className="hover:text-primary">
          Artikler
        </Link>
        {' / '}
        <span className="text-gray-800">{article.attributes.title}</span>
      </nav>

      {imageUrl && (
        <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden">
          <Image
            src={imageUrl}
            alt={article.attributes.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <header className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {article.attributes.title}
        </h1>
        <div className="flex items-center text-gray-600 text-sm">
          <time dateTime={article.attributes.publishedAt}>
            Publiceret: {publishDate}
          </time>
        </div>
      </header>

      <div className="prose prose-lg max-w-none mb-12">
        <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
          {article.attributes.content}
        </div>
      </div>

      <div className="border-t pt-8">
        <Link 
          href={`/${params.locale}/articles`}
          className="inline-flex items-center text-primary hover:text-secondary font-medium"
        >
          Tilbage til artikler
        </Link>
      </div>
    </article>
  );
}
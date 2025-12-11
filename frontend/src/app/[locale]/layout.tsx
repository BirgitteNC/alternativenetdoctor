import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n';
import Image from 'next/image';
import Link from 'next/link';
export const dynamic = 'force-dynamic';
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="bg-gray-50">
        <NextIntlClientProvider messages={messages}>
          <header className="bg-white shadow-md">
            <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
              <Link href={`/${locale}`} className="flex items-center">
                <Image
                  src="/logo.png"
                  alt="Alternativ Netdoktor"
                  width={60}
                  height={60}
                  className="rounded-full"
                />
                <span className="ml-3 text-xl font-bold text-primary">
                  Alternativ Netdoktor
                </span>
              </Link>
              
              <div className="flex items-center gap-6">
                <Link href={`/${locale}`} className="text-gray-700 hover:text-primary font-medium">
                  Forside
                </Link>
                <Link href={`/${locale}/articles`} className="text-gray-700 hover:text-primary font-medium">
                  Artikler
                </Link>
                <Link href={`/${locale}/symptoms`} className="text-gray-700 hover:text-primary font-medium">
                  Symptomer
                </Link>
                <Link href={`/${locale}/kosttilskud`} className="text-gray-700 hover:text-primary font-medium">
                  Kosttilskud
                </Link>
                <Link href={`/${locale}/produkter`} className="text-gray-700 hover:text-primary font-medium">
                  Produkter
                </Link>
                <div className="flex items-center gap-2 ml-4">
                  <span className="text-sm text-gray-600">DK</span>
                  <span className="text-gray-400">|</span>
                  <span className="text-sm text-gray-600">DA</span>
                </div>
              </div>
            </nav>
          </header>
          <main className="container mx-auto p-4">
            {children}
          </main>
          <footer className="bg-gray-800 text-white p-4 mt-8">
            <div className="container mx-auto text-center">
              <p>&copy; 2024 Alternativ Netdoktor</p>
            </div>
          </footer>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
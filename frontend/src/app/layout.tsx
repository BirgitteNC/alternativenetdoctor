import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
  title: 'Alternativ Netdoktor - Naturlig Sundhed & Velvære',
  description: 'Din kilde til naturlig sundhed, kosttilskud og alternative behandlinger. Find information om symptomer, lidelser og naturmedicin.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="da" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}

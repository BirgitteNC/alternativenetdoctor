'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface FooterProps {
  locale: string;
}

export default function Footer({ locale }: FooterProps) {
  const t = useTranslations();
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { href: `/${locale}/about`, label: t('nav.about') },
      { href: `/${locale}/contact`, label: t('nav.contact') },
    ],
    legal: [
      { href: `/${locale}/privacy`, label: t('footer.privacy') },
      { href: `/${locale}/terms`, label: t('footer.terms') },
      { href: `/${locale}/cookies`, label: t('footer.cookies') },
    ],
    resources: [
      { href: `/${locale}/articles`, label: t('nav.articles') },
      { href: `/${locale}/symptoms`, label: t('nav.symptoms') },
      { href: `/${locale}/supplements`, label: t('nav.supplements') },
      { href: `/${locale}/products`, label: t('nav.products') },
    ],
  };

  return (
    <footer className="bg-sage-900 text-sage-100 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Disclaimer */}
        <div className="bg-primary-900/30 rounded-lg p-6 mb-12 border border-primary-800/30">
          <div className="flex items-start space-x-3">
            <svg
              className="w-6 h-6 text-primary-400 flex-shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <p className="text-sm leading-relaxed text-sage-200">
              {t('footer.disclaimer')}
            </p>
          </div>
        </div>

        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">AN</span>
              </div>
              <span className="text-xl font-bold text-white">
                {t('common.siteName')}
              </span>
            </div>
            <p className="text-sm text-sage-300 leading-relaxed">
              Din kilde til naturlig sundhed og velvære
            </p>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Ressourcer</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sage-300 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Virksomhed</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sage-300 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Juridisk</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sage-300 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-sage-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-sage-400">
              © {currentYear} {t('common.siteName')}. Alle rettigheder forbeholdes.
            </p>
            <div className="flex space-x-6">
              {/* Social Media Icons - kan tilføjes senere */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

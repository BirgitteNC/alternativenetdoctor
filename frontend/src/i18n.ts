import { getRequestConfig } from 'next-intl/server';

export const locales = ['da', 'en', 'de', 'fr', 'es'];
export const defaultLocale = 'da';

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`./locales/${locale}.json`)).default,
}));

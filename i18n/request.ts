import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';

export default getRequestConfig(async ({locale}) => {
  if (!routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale as any;
  }

  let messages: any = {};
  try {
    messages = (await import(`@/messages/${locale}.json`)).default;
  } catch {
    messages = (await import(`@/messages/${routing.defaultLocale}.json`)).default;
  }

  return {
    messages,
    onError() {
    },
    getMessageFallback({namespace, key}) {
      return namespace ? `${namespace}.${key}` : key;
    }
  };
});

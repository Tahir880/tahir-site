import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';

export default getRequestConfig(async ({locale}) => {
  const supported = routing.locales as ReadonlyArray<'ar' | 'en' | 'fr'>;

  if (!supported.includes(locale as any)) {
    return {
      messages: {},
      timeZone: 'UTC',
      now: new Date(),
      onError(error) {
        // eslint-disable-next-line no-console
        console.warn('[i18n:invalid-locale]', String(error));
      },
      getMessageFallback({key}) {
        return key;
      }
    };
  }

  const messages = (await import(`../messages/${locale}.json`)).default;

  return {
    messages,
    timeZone: 'UTC',
    now: new Date(),
    onError(error: any) {
      // eslint-disable-next-line no-console
      if (error?.code === 'MISSING_MESSAGE') {
        console.warn('[i18n:missing]', error?.originalMessage ?? error?.message);
        return;
      }
      console.error('[i18n]', error);
    },
    getMessageFallback({key}) {
      return key;
    }
  };
});

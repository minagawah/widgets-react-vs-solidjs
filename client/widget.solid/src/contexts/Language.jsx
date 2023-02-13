import {
  createContext,
  useContext,
  createSignal,
  createEffect,
  onCleanup,
} from 'solid-js';
import { omit } from 'ramda';

import { useCookie } from '@/hooks/useCookie';

// ----------------------
// LanguageContext
// ----------------------

export const LanguageContext = createContext([
  'en',
  {
    setLanguage: () => {},
  },
]);

// ----------------------
// LanguageProvider
// ----------------------

export const LanguageProvider = props => {
  const [cookie, setCookie] = useCookie('locale', 'en');
  const [language, setLanguage] = createSignal(cookie || 'en');

  const _set_language = lang => {
    window.PubSub.publish('language', {
      payload: {
        language: lang,
      },
    });
  };

  const _onmessage = (msg, data) => {
    const lang = data?.payload?.language;
    if (msg && msg === 'language' && lang) {
      setLanguage(lang);
      setCookie(lang);
    }
  };

  createEffect(() => {
    window.PubSub.subscribe('language', _onmessage);
  });

  onCleanup(() => {
    window.PubSub.unsubscribe('language');
  });

  const value = [
    language(),
    {
      setLanguage: _set_language,
    },
  ];

  return (
    <LanguageContext.Provider value={value} {...omit(['children'], props)}>
      {props.children}
    </LanguageContext.Provider>
  );
};

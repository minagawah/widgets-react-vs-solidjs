import {
  createContext,
  useContext,
  createSignal,
  createEffect,
  onCleanup,
} from 'solid-js';
import { omit } from 'ramda';

import { WorkerContext } from '@/contexts/Worker';
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

  const value = [
    language,
    {
      setLanguage(lang) {
        setLanguage(lang);
        setCookie(lang);
      },
    },
  ];

  return (
    <LanguageContext.Provider value={value} {...omit(['children'], props)}>
      {props.children}
    </LanguageContext.Provider>
  );
};

export const useLanguageWorker = _origin => {
  const [worker] = useContext(WorkerContext);
  const [language, { setLanguage }] = useContext(LanguageContext);
  const [ready, setReady] = createSignal(false);

  const _set_language = lang => {
    worker().port.postMessage({
      action: 'language',
      origin: _origin,
      payload: {
        language: lang,
      },
    });
  };

  const _onmessage = event => {
    const { action, payload } = event?.data || {};
    if (!!action && !!payload) {
      if (action === 'language' && !!payload.language) {
        setLanguage(payload.language);
      }
    }
  };

  createEffect(() => {
    if (!!worker() && !worker().port.onmessage) {
      worker().port.onmessage = _onmessage;
      setReady(true);
    }
  });

  onCleanup(() => {
    if (!!worker()) {
      worker().port.onmessage = undefined;
      setReady(false);
    }
  });

  return [
    {
      language: language(),
      worker: worker(),
      ready,
    },
    { setLanguage: _set_language },
  ];
};

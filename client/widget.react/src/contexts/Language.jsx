import React, {
  useContext,
  createContext,
  useEffect,
  useCallback,
} from 'react';
import { useTranslation } from 'react-i18next';

import { COOKIE_BASE_NAME } from '@/constants';
import { useCookie } from '@/hooks/useCookie';

// ----------------------
// LanguageContext
// ----------------------

const LanguageContext = createContext({
  language: 'en',
  setLanguage: () => {},
});

// ----------------------
// LanguageProvider
// ----------------------

export const LanguageProvider = props => {
  const { i18n, t } = useTranslation();
  const [cookie, setCookie] = useCookie('locale', 'en');

  const _setLanguage = useCallback(locale => {
    i18n.changeLanguage(locale);
    setCookie(locale);
  }, []);

  return (
    <LanguageContext.Provider
      value={{
        language: i18n?.language,
        setLanguage: _setLanguage,
        i18n,
        t,
      }}
      {...props}
    />
  );
};

// ----------------------
// useLanguage
// ----------------------

export const useLanguage = () => useContext(LanguageContext);

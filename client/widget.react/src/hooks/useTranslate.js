import { useState, useEffect } from 'react';

import { capitalize, decode } from '@/lib/utils';
import { useLanguage } from '@/contexts/Language';

export const useTranslate = (innerHTML, dataset) => {
  const { language: lang, i18n, t } = useLanguage();
  const [dict, setDict] = useState(null);
  const [content, setContent] = useState(null);

  useEffect(() => {
    if (!dict) {
      setDict(makeDictionary(innerHTML, dataset));
    }
  }, [innerHTML]);

  useEffect(() => {
    if (dict) {
      const value = dict[lang] || dict[dict.fallback];
      if (value) {
        setContent(value);
      }
    }
  }, [dict, lang]);

  return { lang, i18n, t, content };
};

function makeDictionary(html, dataset) {
  let dict = null;

  if (html && dataset) {
    const fallback = dataset['lang'] || 'en';

    dict = { fallback };

    dict[fallback] = html ? html.trim() : '';

    ['en', 'ja'].forEach(lang => {
      if (lang !== fallback) {
        const value = dataset[`lang${capitalize(lang)}`];
        if (value) {
          dict[lang] = decode(value);
        }
      }
    });
  }

  return dict;
}

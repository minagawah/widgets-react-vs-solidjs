import React, { useState, useEffect } from 'react';
import sanitizeHtml from 'sanitize-html';
// import tw, { css } from 'twin.macro';

import { run_all } from '@/lib/service';
import { capitalize, decode } from '@/lib/utils';
import { LanguageProvider, useLanguage } from '@/contexts/Language';

const makeDictionary = (html, dataset) => {
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
};

const Translate = ({ innerHTML, dataset }) => {
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

  return (
    !!content && (
      <span
        dangerouslySetInnerHTML={{ __html: content }}
        className="translate-content"
      ></span>
    )
  );
};

run_all('[data-lang]', <Translate />, [[LanguageProvider]]);

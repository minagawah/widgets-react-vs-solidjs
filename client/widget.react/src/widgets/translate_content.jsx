import React, { useState, useEffect } from 'react';
import sanitizeHtml from 'sanitize-html';
// import tw, { css } from 'twin.macro';

import { run_all } from '@/lib/service';
import { LanguageProvider, useLanguage } from '@/contexts/Language';

const parser = new DOMParser();

const TranslateContent = ({ innerHTML }) => {
  const { language: lang, i18n, t } = useLanguage();
  const [content, setContent] = useState('');

  useEffect(() => {
    if (lang && innerHTML) {
      const html = parser.parseFromString(innerHTML, 'text/html');
      const pair = lang === 'en' ? ['ja', 'en'] : ['en', 'ja'];

      ['none', 'block'].forEach((action, i) => {
        html.querySelectorAll(`[data-lang-${pair[i]}]`).forEach((e, j) => {
          if (e?.style) {
            e.style.display = action;
          }
        });
      });

      const body = html.querySelector('body').innerHTML;

      if (body) {
        setContent(body);
      }
    }
  }, [lang, innerHTML]);

  return (
    !!content && (
      <span
        dangerouslySetInnerHTML={{ __html: content }}
        className="translate-content"
      ></span>
    )
  );
};

run_all(
  '[data-translate-content]',
  <TranslateContent />,
  [[LanguageProvider]]
);

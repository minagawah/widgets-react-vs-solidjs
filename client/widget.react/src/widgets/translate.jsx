import React from 'react';
import sanitizeHtml from 'sanitize-html';

import { run_all } from '@/lib/service';
import { LanguageProvider } from '@/contexts/Language';
import { useTranslate } from '@/hooks/useTranslate';

const Translate = ({ innerHTML, dataset }) => {
  const { content } = useTranslate(innerHTML, dataset);

  return (
    !!content && (
      <div
        dangerouslySetInnerHTML={{ __html: content }}
        className="translate-content"
        style={{ lineHeight: 1.2 }}
      ></div>
    )
  );
};

run_all('[data-lang]', <Translate />, [[LanguageProvider]]);

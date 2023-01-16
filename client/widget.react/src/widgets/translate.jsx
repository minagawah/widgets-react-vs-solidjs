import React from 'react';
import sanitizeHtml from 'sanitize-html';
// import tw, { css } from 'twin.macro';

import { run_all } from '@/lib/service';
import { LanguageProvider } from '@/contexts/Language';
import { useTranslate } from '@/hooks/useTranslate';

const Translate = ({ innerHTML, dataset }) => {
  const { content } = useTranslate(innerHTML, dataset);

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

import React, { useCallback } from 'react';
import tw, { css } from 'twin.macro';

import { useLanguage } from '@/contexts/Language';

const styles = {
  base: css`
    display: inline-block;
    width: 36px;
  `,
};

export const Language = ({ styles: extra }) => {
  const { language, setLanguage } = useLanguage();

  const _setLanguage = useCallback((e, language) => {
    e.stopPropagation();
    setLanguage(language);
  }, []);

  return (
    <>
      <img
        src="images/flag_us.png"
        css={[styles.base, extra?.base, extra?.first]}
        onClick={e => _setLanguage(e, 'en')}
      />

      <img
        src="images/flag_jp.png"
        css={[styles.base, extra?.base, extra?.second]}
        onClick={e => _setLanguage(e, 'ja')}
      />
    </>
  );
};

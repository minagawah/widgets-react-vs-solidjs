import React from 'react';
import tw, { css } from 'twin.macro';

import { run } from '@/lib/service';
import { LanguageProvider } from '@/contexts/Language';
import { Language as LanguageComponent } from '@/components/language';

const styles = {
  language: {
    second: tw`ml-2`,
  },
};

export const Language = ({ styles: extra }) => {
  return <LanguageComponent styles={styles.language} />;
};

run('#language', <Language />, [[LanguageProvider]]);

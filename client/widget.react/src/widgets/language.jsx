import React, { useState, useEffect } from 'react';
import moment from 'moment';
import tw, { css } from 'twin.macro';

import { run_all } from '@/lib/service';
import { LanguageProvider } from '@/contexts/Language';
import { Language as LanguageComponent } from '@/components/language';

const styles = {
  container: tw`inline flex flex-row justify-center items-center`,
  language: {
    base: css`
      width: 36px;
    `,
    second: tw`ml-2`,
  },
};

export const Language = ({ dataset, styles: extra }) => {
  const [datetime, setDatetime] = useState(null);

  useEffect(() => {
    if (!datetime) {
      const _dt = dataset?.datetime;
      if (_dt) {
        const dt = moment(_dt);
        console.log(
          '[widget/Language] datetime:',
          dt.format('YYYY-MM-DD HH:mm:ss')
        );
        setDatetime(dt);
      }
    }
  }, [dataset?.datetime]);

  return (
    <div css={styles.container}>
      <LanguageComponent styles={styles.language} />
    </div>
  );
};

run_all('[data-language]', <Language />, [[LanguageProvider]]);

import React, { useState, useEffect, useCallback } from 'react';
import tw, { css } from 'twin.macro';

import { int } from '@/lib/utils';
import { run } from '@/lib/service';
import { LanguageProvider } from '@/contexts/Language';
import { WorkerProvider, useWorker } from '@/contexts/Worker';
import { Language } from '@/components/language';

import { genericContentWrapper } from '@/styles';

const styles = {
  container: css`
    ${tw`w-full flex flex-col justify-start items-center bg-gray-200`}
  `,
  content: css`
    ${genericContentWrapper}
    ${tw`pt-2 pb-2 border-b border-gray-300`}
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 1fr 1px;
  `,
  left: css`
    grid-column: 1 / 2;
    grid-row: 1 / 2;
    ${tw`pl-4 flex flex-row justify-start items-center`}
  `,
  title_link: css`
    display: inline-block;
    ${tw`
      text-gray-900
      link:text-gray-900 link:no-underline
      hover:text-gray-900 hover:no-underline
      visited:text-gray-900 visited:no-underline
    `}
    h1 {
      ${tw`font-bold text-xl`}
    }
  `,
  right: css`
    grid-column: 2 / -1;
    grid-row: 1 / 2;
    ${tw`pr-4 flex flex-row justify-end items-center`}
  `,
  language: {
    second: tw`ml-2`,
  },
  bottom: css`
    grid-column: 1 / -1;
    grid-row: 2 / -1;
    ${tw`flex flex-col justify-center items-center`}
  `,
};

export const Header = ({ datetime, styles: extra }) => {
  const { worker } = useWorker();
  const [size, setSize] = useState({ width: 0, height: 0 });

  const onmessage = useCallback((event = {}) => {
    const { action, payload } = event?.data || {};
    if (action && payload) {
      if (action === 'resize') {
        const { width: _w, height: _h } = payload;
        console.log(`[header] ${int(_w)}x${int(_h)}`);
        if (_w) {
          setSize({ width: _w, height: _h });
        }
      }
    }
  }, []);

  useEffect(() => {
    if (worker?.port) {
      worker.port.onmessage = onmessage;
    }
  }, [worker?.port]);

  return (
    <div id="header-container" css={styles.container}>
      <div id="header-content" css={styles.content}>
        <div id="header-left" css={styles.left}>
          <a href="./index.html" css={styles.title_link}>
            <h1>Sample</h1>
            {datetime}
          </a>
        </div>

        <div id="header-right" css={styles.right}>
          <Language styles={styles.language} />
        </div>

        <div id="header-bottom" css={styles.bottom}></div>
      </div>
    </div>
  );
};

run('#header', <Header />, [[WorkerProvider], [LanguageProvider]]);

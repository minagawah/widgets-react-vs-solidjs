import React, { useState, useEffect } from 'react';
import tw, { css } from 'twin.macro';

import { int } from '@/lib/utils';
import { run } from '@/lib/service';
import { Sep } from '@/components/sep';
import { TW_CUSTOM_COLORS, linkStyle, genericContentWrapper } from '@/styles';

const styles = {
  container: css`
    ${tw`w-full flex flex-col justify-start items-center bg-gray-200`}
  `,
  content: css`
    ${genericContentWrapper}
    ${tw`
      px-4 py-1
      flex flex-row justify-start items-center
      font-bold text-gray-900 border-b border-gray-300
    `}
  `,
  link: css`
    ${linkStyle}
    ${tw`
      text-gray-900
      link:text-gray-900 link:no-underline link:font-normal
      hover:text-gray-900 hover:no-underline hover:font-normal
      visited:text-gray-900 visited:no-underline visited:font-normal
    `}
  `,
};

const Breadcrumbs = ({ dataset }) => {
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  useEffect(() => {
    if (dataset?.breadcrumbs) {
      try {
        const arr = JSON.parse(dataset.breadcrumbs);
        setBreadcrumbs(arr);
      } catch (err) {
        console.warn(err);
      }
    }
  }, [dataset?.breadcrumbs]);

  const lastindex = breadcrumbs.length - 1;

  return (
    <div id="breadcrumbs-container" css={styles.container}>
      <div id="breadcrumbs-content" css={styles.content}>
        {lastindex > -1 &&
          breadcrumbs.map((bread, i) => {
            const { link, text } = bread;
            const show = i < lastindex;

            return link ? (
              <a key={i} href={link} css={styles.link}>
                {text}
                {show && <Sep styles={tw`mx-2`} />}
              </a>
            ) : (
              <div key={i}>
                {text}
                {show && <Sep styles={tw`mx-2`} />}
              </div>
            );
          })}
      </div>
    </div>
  );
};

run('#breadcrumbs', <Breadcrumbs />);

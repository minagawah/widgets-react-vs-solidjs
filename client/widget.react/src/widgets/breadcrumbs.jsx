import React, { useState, useEffect } from 'react';
import tw, { css } from 'twin.macro';

import { run } from '@/lib/service';
import { Sep } from '@/components/sep';
import { linkStyle } from '@/styles';

const styles = {
  content: tw`
    w-full flex flex-row justify-start items-center
    text-xl font-bold text-gray-900
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
  );
};

run('#breadcrumbs', <Breadcrumbs />);

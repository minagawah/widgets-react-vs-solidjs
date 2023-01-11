import React from 'react';
import tw, { css } from 'twin.macro';

import { run } from '@/lib/service';
import { linkStyle } from '@/styles';

const styles = {
  wrapper: tw`
    w-full px-4 py-6 bg-gray-700
  `,
  content: tw`
    w-full flex flex-col justify-center items-center
    md:flex-row md:justify-center md:items-center
    text-xl
  `,
  link: css`
    ${linkStyle}
    ${tw`
      md:mr-5
      text-gray-400
      link:text-white link:no-underline
      hover:text-white hover:no-underline
      visited:text-white visited:no-underline
    `}
  `,
  content2: tw`
    w-full flex flex-col justify-center items-center
  `,
};

export const Footer = ({ innerHTML, styles: extra }) => {
  return (
    <div id="footer-content-wrapper" css={styles.wrapper}>
      <div id="footer-content" css={styles.content}>
        <a href="./index.html" css={styles.link}>
          Home
        </a>
        <a href="./react.html" css={styles.link}>
          React
        </a>
        <a href="./solid.html" css={styles.link}>
          SolidJS
        </a>
      </div>

      {/*
      {!!innerHTML && (
        <div
          id="footer-content2"
          dangerouslySetInnerHTML={{ __html: innerHTML }}
          css={styles.content2}
        ></div>
      )}
        */}

      <div id="footer-content2" css={styles.content2}></div>
    </div>
  );
};

run('#footer', <Footer />);

import React from 'react';
import tw, { css } from 'twin.macro';

import { run } from '@/lib/service';
import { linkStyle, inputStyle } from '@/styles';

const styles = {
  container: tw`w-full flex flex-col justify-center items-center`,
  content: tw`
    w-full flex flex-col justify-center items-center
    md:flex-row md:justify-center md:items-center
    text-xl
  `,
  content2: css`
    ${tw`w-full flex flex-col justify-center items-center`}
    input {
      ${inputStyle}
      ${tw`mt-3 block px-1 py-2 bg-gray-300 text-center`}
    }
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
};

export const Footer = ({ innerHTML, styles: extra }) => {
  return (
    <div id="footer-container" css={styles.container}>
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

      {!!innerHTML && (
        <div
          id="footer-content2"
          dangerouslySetInnerHTML={{ __html: innerHTML }}
          css={styles.content2}
        ></div>
      )}
    </div>
  );
};

run('#footer', <Footer />);

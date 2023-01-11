import { register, compose } from 'component-register';
import { withSolid } from 'solid-element';
import { useContext, createEffect, Show } from 'solid-js';
import { createStore } from 'solid-js/store';
import tw from 'twin.macro';

import { EmotionContext, EmotionProvider } from '@/contexts/Emotion';
import { LanguageContext, LanguageProvider } from '@/contexts/Language';

import * as TW_CUSTOM_COLORS from '../../../../tw.colors';

const createStyles = ({ css }) => {
  const shared = {
    linkStyle: css`
      display: block;
      &,
      &:link,
      &:visited {
        text-decoration: underline;
        color: ${TW_CUSTOM_COLORS['tomato-dark']};
      }
      &:hover,
      &:active {
        text-decoration: underline;
        color: ${TW_CUSTOM_COLORS['tomato-light']};
      }
    `,
    input: css`
      ${tw`
        px-2 py-2 rounded
        border border-solid border-gray-300
        shadow-inner drop-shadow-2xl text-xl
      `}
    `,
  };

  return {
    wrapper: css(tw`w-full px-4 py-6 bg-gray-700`),
    content: css`
      ${tw`
        w-full flex flex-col justify-center items-center
        md:flex-row md:justify-center md:items-center
        text-xl
      `}
    `,
    link: css`
      ${shared.linkStyle}
      ${tw`
        md:mr-5
        text-gray-400
        link:text-white link:no-underline
        hover:text-white hover:no-underline
        visited:text-white visited:no-underline
      `}
    `,
    content2: css`
      ${tw`w-full flex flex-col justify-center items-center`}
      input {
        ${shared.input}
        ${tw`mt-3 block px-1 py-2 bg-gray-300 text-center`}
      }
    `,
  };
};

export const Footer = props => {
  const [emotion] = useContext(EmotionContext);
  const [language] = useContext(LanguageContext);
  const [breadcrumbs, setBreadcrumbs] = createStore([]);
  const [styles, setStyles] = createStore(null);

  // const { innerHTML } = props?.element || {};

  createEffect(() => {
    if (emotion()) {
      setStyles(createStyles(emotion()));
    }
  });

  return (
    <Show when={emotion() && styles && language()} fallback={<div></div>}>
      {(({ cx }) => (
        <div id="footer-content-wrapper" className={cx(styles.wrapper)}>
          <div id="footer-content" className={cx(styles.content)}>
            <a href="./index.html" className={cx(styles.link)}>
              Home
            </a>
            <a href="./react.html" className={cx(styles.link)}>
              React
            </a>
            <a href="./solid.html" className={cx(styles.link)}>
              SolidJS
            </a>
          </div>

          <div id="footer-content2" className={cx(styles.content2)}></div>
        </div>
      ))(emotion())}
    </Show>
  );
};

compose(
  register('footer-widget'),
  withSolid
)((props, options) => {
  const element = options?.element;

  return (
    <LanguageProvider>
      <EmotionProvider key="footer-widget" element={element}>
        <Footer element={element} {...props} />
      </EmotionProvider>
    </LanguageProvider>
  );
});

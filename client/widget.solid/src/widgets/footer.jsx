import { register, compose } from 'component-register';
import { withSolid } from 'solid-element';
import { useContext, createEffect, Show } from 'solid-js';
import { createStore } from 'solid-js/store';
import tw from 'twin.macro';

import { EmotionContext, EmotionProvider } from '@/contexts/Emotion';
import { LanguageProvider, LanguageContext } from '@/contexts/Language';
import { createSharedStyles } from '@/styles';

const createStyles = ({ css }) => {
  const shared = createSharedStyles({ css, list: ['linkStyle', 'input'] });

  return {
    container: css`
      ${tw`w-full flex flex-col justify-center items-center`}
    `,
    content: css`
      ${tw`
        w-full flex flex-col justify-center items-center
        md:flex-row md:justify-center md:items-center
        text-xl
      `}
    `,
    content2: css`
      ${tw`w-full flex flex-col justify-center items-center`}
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
  };
};

export const Footer = props => {
  const [emotion] = useContext(EmotionContext);
  const [styles, setStyles] = createStore(null);
  const [language] = useContext(LanguageContext);
  const [breadcrumbs, setBreadcrumbs] = createStore([]);

  createEffect(() => {
    if (emotion()) {
      setStyles(createStyles(emotion()));
    }
  });

  return (
    <Show when={emotion() && styles && language()} fallback={<div></div>}>
      {(({ cx }) => (
        <div id="footer-container" className={cx(styles.container)}>
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

          <div id="footer-content2" className={cx(styles.content2)}>
            <slot name="footer-input-spyware"></slot>
          </div>
        </div>
      ))(emotion())}
    </Show>
  );
};

compose(
  register('footer-widget'),
  withSolid
)((props, options) => {
  return (
    <LanguageProvider>
      <EmotionProvider key="footer" element={options?.element}>
        <Footer {...props} />
      </EmotionProvider>
    </LanguageProvider>
  );
});

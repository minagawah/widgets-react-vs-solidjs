import { register, compose } from 'component-register';
import { withSolid } from 'solid-element';
import { useContext, createEffect, Show } from 'solid-js';
import { createStore } from 'solid-js/store';
import tw from 'twin.macro';

import { EmotionContext, EmotionProvider } from '@/contexts/Emotion';
import { WorkerProvider } from '@/contexts/Worker';
import { LanguageProvider } from '@/contexts/Language';
import { Language } from '@/components/language';

const createStyles = ({ css }) => {
  const shared = {
    genericContentWrapper: css`
      width: 96%;
      @media (min-width: 768px) {
        width: 85%;
        max-width: 1024px;
      }
    `,
  };

  return {
    container: css`
      ${tw`
        w-full box-border
        flex flex-col justify-start items-center
        bg-gray-200
      `}
    `,
    content: css`
      box-sizing: border-box;
      ${shared?.genericContentWrapper},
      ${tw`pt-2 pb-2`}
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: 1fr 1px;
      border-bottom: 1px solid #d6d6d6;
    `, // border-b border-gray-300
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
      second: css(tw`ml-2`),
    },
    bottom: css`
      grid-column: 1 / -1;
      grid-row: 2 / -1;
      ${tw`flex flex-col justify-center items-center`}
    `,
  };
};

const Header = props => {
  const [emotion] = useContext(EmotionContext);
  const [styles, setStyles] = createStore(null);

  createEffect(() => {
    if (emotion()) {
      setStyles(createStyles(emotion()));
    }
  });

  return (
    <Show when={emotion() && styles} fallback={<div></div>}>
      {(({ cx }) => (
        <div className={cx(styles.container)}>
          <div className={cx(styles.content)}>
            <div className={cx(styles.left)}>
              <a href="./index.html" className={cx(styles.title_link)}>
                <h1>Sample</h1>
                {props?.datetime}
              </a>
            </div>

            <div className={cx(styles.right)}>
              <Language styles={styles.language} />
            </div>

            <div className={cx(styles.buttom)}></div>
          </div>
        </div>
      ))(emotion())}
    </Show>
  );
};

// We could use `withProvider` of `component-register`,
// but that of Solid.js is more convenient for
// we need to feed the former a function when initializing
// the context, whereas we can simply feed an object for the later.
// Also, we can't use `element.shadowRoot` when using the former...
compose(
  register('header-widget'),
  withSolid
)((props, options) => {
  return (
    <WorkerProvider>
      <LanguageProvider>
        <EmotionProvider key="header-widget" element={options?.element}>
          <Header {...props} />
        </EmotionProvider>
      </LanguageProvider>
    </WorkerProvider>
  );
});

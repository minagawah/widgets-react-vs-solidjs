import { customElement } from 'solid-element';
import {
  useContext,
  createSignal,
  createEffect,
  createMemo,
  Show,
} from 'solid-js';
// import { createStore } from 'solid-js/store';
import tw from 'twin.macro';

import { EmotionContext, EmotionProvider } from '@/contexts/Emotion';
import { LanguageProvider, LanguageContext } from '@/contexts/Language';
import { createSharedStyles } from '@/styles';

import { Sep } from '@/components/sep';

const createStyles = ({ css }) => {
  const shared = createSharedStyles({ css, list: ['linkStyle'] });

  return {
    content: css`
      ${tw`
        w-full flex flex-row justify-start items-center
        text-xl font-bold text-gray-900
      `}
    `,
    link: css`
      ${shared.linkStyle}
      ${tw`
        text-gray-900
        link:text-gray-900 link:no-underline link:font-normal
        hover:text-gray-900 hover:no-underline hover:font-normal
        visited:text-gray-900 visited:no-underline visited:font-normal
      `}
    `,
    sep: css`
      ${tw`mx-2`}
    `,
  };
};

const Breadcrumbs = props => {
  const [emotion] = useContext(EmotionContext);
  const [styles, setStyles] = createSignal(null);
  const [language] = useContext(LanguageContext);
  const [breadcrumbs, setBreadcrumbs] = createSignal([]);

  const lastindex = createMemo(() => breadcrumbs().length - 1);

  createEffect(() => {
    if (emotion()) {
      setStyles(createStyles(emotion()));
    }
  });

  createEffect(() => {
    const { dataset } = props?.element || {};

    if (dataset?.breadcrumbs) {
      try {
        const arr = JSON.parse(dataset.breadcrumbs);
        setBreadcrumbs(arr);
      } catch (err) {
        console.warn(err);
      }
    }
  });

  return (
    <Show
      when={emotion() && styles() && language() && lastindex() > -1}
      fallback={<div></div>}
    >
      {(({ cx, css }) => (
        <nav id="breadcrumbs-content" className={cx(styles().content)}>
          {breadcrumbs().map((bread, i) => {
            const [text, link] = bread;
            const show = i < lastindex();

            return link ? (
              <a key={i} href={link} className={cx(styles().link)}>
                {text}
                {show && <Sep styles={cx(styles().sep)} />}
              </a>
            ) : (
              <div key={i}>
                {text}
                {show && <Sep styles={cx(styles().sep)} />}
              </div>
            );
          })}
        </nav>
      ))(emotion())}
    </Show>
  );
};

customElement('breadcrumbs-widget', {}, (props, { element }) => {
  return (
    <LanguageProvider>
      <EmotionProvider key="breadcrumbs" element={element}>
        <Breadcrumbs element={element} {...props} />
      </EmotionProvider>
    </LanguageProvider>
  );
});

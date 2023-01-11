import { register, compose } from 'component-register';
import { withSolid } from 'solid-element';
import { useContext, createEffect, createMemo, Show } from 'solid-js';
import { createStore } from 'solid-js/store';
import tw from 'twin.macro';

import { int } from '@/lib/utils';
import { EmotionContext, EmotionProvider } from '@/contexts/Emotion';
import { LanguageContext, LanguageProvider } from '@/contexts/Language';

import * as TW_CUSTOM_COLORS from '../../../../tw.colors';

import { Sep } from '@/components/sep';

const createStyles = ({ css }) => {
  const shared = {
    genericContentWrapper: css`
      width: 96%;
      @media (min-width: 768px) {
        width: 85%;
        max-width: 1024px;
      }
    `,
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
      ${shared.genericContentWrapper}
      ${tw`
        px-4 py-1
        flex flex-row justify-start items-center
        font-bold text-gray-900
      `}
      border-bottom: 1px solid #d6d6d6;
    `, // border-b border-gray-300
    link: css`
      ${shared.linkStyle}
      ${tw`
        text-gray-900
        link:text-gray-900 link:no-underline link:font-normal
        hover:text-gray-900 hover:no-underline hover:font-normal
        visited:text-gray-900 visited:no-underline visited:font-normal
      `}
    `,
  };
};

const Breadcrumbs = props => {
  const [emotion] = useContext(EmotionContext);
  const [language] = useContext(LanguageContext);
  const [breadcrumbs, setBreadcrumbs] = createStore([]);
  const [styles, setStyles] = createStore(null);

  const lastindex = createMemo(() => breadcrumbs.length - 1);

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

  createEffect(() => {
    if (emotion()) {
      setStyles(createStyles(emotion()));
    }
  });

  return (
    <Show
      when={emotion() && language() && lastindex() > -1}
      fallback={<div></div>}
    >
      {(({ cx, css }) => (
        <div className={cx(styles.container)}>
          <div className={cx(styles.content)}>
            {breadcrumbs.map((bread, i) => {
              const { link, text } = bread;
              const show = i < lastindex();

              return link ? (
                <a key={i} href={link} className={cx(styles.link)}>
                  {text}
                  {show && <Sep styles={cx(css(tw`mx-2`))} />}
                </a>
              ) : (
                <div key={i}>
                  {text}
                  {show && <Sep styles={cx(css(tw`mx-2`))} />}
                </div>
              );
            })}
          </div>
        </div>
      ))(emotion())}
    </Show>
  );
};

compose(
  register('breadcrumbs-widget'),
  withSolid
)((props, options) => {
  const element = options?.element;

  return (
    <LanguageProvider>
      <EmotionProvider key="breadcrumbs-widget" element={element}>
        <Breadcrumbs element={element} {...props} />
      </EmotionProvider>
    </LanguageProvider>
  );
});

import { customElement } from 'solid-element';
import {
  useContext,
  createSignal,
  createEffect,
  createMemo,
  Show,
  onCleanup,
} from 'solid-js';
import { createStore } from 'solid-js/store';
import tw from 'twin.macro';
// import sanitizeHtml from 'sanitize-html';

import { capitalize, decode } from '@/lib/utils';
import { EmotionContext, EmotionProvider } from '@/contexts/Emotion';
import { WorkerProvider } from '@/contexts/Worker';
import { LanguageProvider, useLanguageWorker } from '@/contexts/Language';

const makeDict = (html, dataset) => {
  let res;
  if (html && dataset) {
    const fallback = dataset['lang'] || 'en';
    res = {
      ready: true,
      fallback,
      [fallback]: html ? html.trim() : '',
    };
    ['en', 'ja'].forEach(lang => {
      if (lang !== fallback) {
        const value = dataset[`lang${capitalize(lang)}`];
        if (value) {
          const decoded = decode(value);
          res[lang] = decoded;
        }
      }
    });
  }
  return res;
};

const createStyles = ({ css }) => {
  return {
    content: css`
      display: inline;
    `,
  };
};

const Translate = props => {
  const [emotion] = useContext(EmotionContext);
  const [styles, setStyles] = createSignal(null);
  const [languageworker] = useLanguageWorker();
  const [dict, setDict] = createStore({
    ready: false,
    fallback: 'en',
    en: '',
    ja: '',
  });

  const { innerHTML, dataset } = props?.element || {};
  const language = createMemo(() => languageworker.language());

  createEffect(() => {
    if (emotion()) {
      const { cx, css } = emotion();
      setStyles({
        content: cx(createStyles(emotion()), dataset?.css && css(dataset.css)),
      });
    }
  });

  createEffect(() => {
    if (!dict.ready) {
      const _dict = makeDict(innerHTML, dataset);
      if (_dict) {
        setDict(_dict);
      }
    }
  });

  return (
    <>
      {/**
       * Has 'display: none' initially being set
       * for the widget, however, show it
       * as the SolidJS app mounts.
       */}
      <style>{`:host { display: block !important; }`}</style>

    <Show
      when={emotion() && styles() && dict.ready && languageworker.ready()}
      fallback={<div></div>}
    >
      {(({ cx }) => (
        <div class="translate-content" className={cx(styles().content)}>
          {dict[language()]}
        </div>
      ))(emotion())}
    </Show>
    </>
  );
};

customElement('translate-widget', {}, (props, { element }) => {
  return (
    <WorkerProvider>
      <LanguageProvider>
        <EmotionProvider key="translate" element={element}>
          <Translate element={element} {...props} />
        </EmotionProvider>
      </LanguageProvider>
    </WorkerProvider>
  );
});

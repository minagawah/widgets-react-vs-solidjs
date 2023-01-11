import { register, compose } from 'component-register';
import { withSolid } from 'solid-element';
import {
  useContext,
  createSignal,
  createEffect,
  createMemo,
  Show,
  onCleanup,
} from 'solid-js';
import { createStore } from 'solid-js/store';
// import tw from 'twin.macro';
// import sanitizeHtml from 'sanitize-html';

import { capitalize, decode } from '@/lib/utils';
import { EmotionContext, EmotionProvider } from '@/contexts/Emotion';
import { WorkerProvider } from '@/contexts/Worker';
import { LanguageProvider, useLanguageWorker } from '@/contexts/Language';

const Translate = props => {
  const [emotion] = useContext(EmotionContext);
  const [languageworker] = useLanguageWorker();
  const [dict, setDict] = createStore({
    ready: false,
    fallback: 'en',
    en: '',
    ja: '',
  });

  const language = createMemo(() => languageworker.language());

  createEffect(() => {
    if (!dict.ready) {
      const { innerHTML, dataset } = props?.element || {};
      const _dict = makeDict(innerHTML, dataset);
      if (_dict) {
        setDict(_dict);
      }
    }
  });

  return (
    <Show
      when={emotion() && dict.ready && languageworker.ready()}
      fallback={<div></div>}
    >
      <div style="line-height:1.2;">{dict[language()]}</div>
    </Show>
  );
};

compose(
  register('translate-widget'),
  withSolid
)((props, options) => {
  const element = options?.element;

  return (
    <WorkerProvider>
      <LanguageProvider>
        <EmotionProvider key="translate-widget" element={element}>
          <Translate element={element} {...props} />
        </EmotionProvider>
      </LanguageProvider>
    </WorkerProvider>
  );
});

function makeDict(html, dataset) {
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
}

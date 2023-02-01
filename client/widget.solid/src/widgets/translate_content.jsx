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

import { capitalize, decode } from '@/lib/utils';
import { EmotionContext, EmotionProvider } from '@/contexts/Emotion';
import { WorkerProvider } from '@/contexts/Worker';
import { LanguageProvider, useLanguageWorker } from '@/contexts/Language';

const createStyles = ({ css }) => {
  return {
    content: css`
      ${tw`w-full flex flex-col justify-start items-start`}
    `,
  };
};

const TranslateContent = props => {
  const [emotion] = useContext(EmotionContext);
  const [styles, setStyles] = createSignal(null);
  const [languageworker] = useLanguageWorker();

  const { dataset } = props?.element || {};
  const language = createMemo(() => languageworker.language());

  createEffect(() => {
    if (emotion()) {
      const { cx, css } = emotion();
      const _styles = createStyles(emotion());
      _styles.content = cx(_styles.content, dataset?.css && css(dataset.css));
      setStyles(_styles);
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
        when={emotion() && styles() && language() && languageworker.ready()}
        fallback={<div></div>}
      >
        {(({ cx }) => (
          <div class="translate-content" className={cx(styles().content)}>
            <slot name={`translate-${language()}`}></slot>
          </div>
        ))(emotion())}
      </Show>
    </>
  );
};

customElement('translate-content-widget', {}, (props, { element }) => {
  return (
    <WorkerProvider>
      <LanguageProvider>
        <EmotionProvider key="translate-content" element={element}>
          <TranslateContent element={element} {...props} />
        </EmotionProvider>
      </LanguageProvider>
    </WorkerProvider>
  );
});

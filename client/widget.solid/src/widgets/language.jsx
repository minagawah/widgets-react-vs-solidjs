import { register, compose } from 'component-register';
import { withSolid } from 'solid-element';
import { useContext, createEffect, Show } from 'solid-js';

import { EmotionContext, EmotionProvider } from '@/contexts/Emotion';
import { WorkerProvider } from '@/contexts/Worker';
import { LanguageProvider } from '@/contexts/Language';
import { Language as LanguageComponent } from '@/components/language';

const Language = props => {
  const [emotion] = useContext(EmotionContext);

  return (
    <Show when={emotion()} fallback={<div></div>}>
      {(({ cx }) => (
        <LanguageComponent {...props} />
      ))(emotion())}
    </Show>
  );
};

compose(
  register('language-widget'),
  withSolid
)((props, options) => {
  return (
    <WorkerProvider>
      <LanguageProvider>
        <EmotionProvider key="language-widget" element={options?.element}>
          <Language {...props} />
        </EmotionProvider>
      </LanguageProvider>
    </WorkerProvider>
  );
});

import { register, compose } from 'component-register';
import { withSolid } from 'solid-element';
import { useContext, createSignal, createEffect, Show } from 'solid-js';
import moment from 'moment';
import tw from 'twin.macro';

import { EmotionContext, EmotionProvider } from '@/contexts/Emotion';
import { WorkerProvider } from '@/contexts/Worker';
import { LanguageProvider } from '@/contexts/Language';
import { Language as LanguageComponent } from '@/components/language';

const createStyles = ({ css }) => {
  return {
    container: css`
      display: inline;
      ${tw`flex flex-row justify-center items-center`}
      .language-button {
        width: 36px;
      }
      .language-button-second {
        ${tw`ml-2`}
      }
    `,
  };
};

const Language = props => {
  const [emotion] = useContext(EmotionContext);
  const [styles, setStyles] = createSignal(null);
  const [datetime, setDatetime] = createSignal(null);

  createEffect(() => {
    if (emotion()) {
      setStyles(createStyles(emotion()));
    }
  });

  createEffect(() => {
    if (!datetime()) {
      const _dt = props?.element?.dataset?.datetime;
      if (_dt) {
        const dt = moment(_dt);
        console.log(
          '[widget/Language] datetime:',
          dt.format('YYYY-MM-DD HH:mm:ss')
        );
        setDatetime(dt);
      }
    }
  });

  return (
    <Show when={emotion() && styles()} fallback={<div></div>}>
      {(({ cx }) => (
        <div className={styles().container}>
          <LanguageComponent {...props} />
        </div>
      ))(emotion())}
    </Show>
  );
};

compose(
  register('language-widget'),
  withSolid
)((props, options) => {
  const element = options?.element;
  return (
    <WorkerProvider>
      <LanguageProvider>
        <EmotionProvider key="language" element={element}>
          <Language element={element} {...props} />
        </EmotionProvider>
      </LanguageProvider>
    </WorkerProvider>
  );
});

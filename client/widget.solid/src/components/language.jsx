import { useContext, createSignal, createEffect, Show, on } from 'solid-js';
// import tw from 'twin.macro';

import { EmotionContext } from '@/contexts/Emotion';
import { useLanguageWorker } from '@/contexts/Language';

const createStyles = ({ css }) => {
  return {
    base: css`
      display: inline-block;
      width: 90px;
    `,
  };
};

export const Language = props => {
  const [languageworker, { setLanguage }] = useLanguageWorker();
  const [emotion] = useContext(EmotionContext);
  const [styles, setStyles] = createSignal(null);

  const _set_language = (e, lang) => {
    e.stopPropagation();
    setLanguage(lang);
  };

  createEffect(() => {
    if (emotion()) {
      setStyles(createStyles(emotion()));
    }
  });

  return (
    <Show
      when={emotion() && styles() && languageworker.ready()}
      fallback={<div></div>}
    >
      {(({ cx }) => (
        <>
          <img
            src="images/flag_us.png"
            class="language-button language-button-first"
            className={cx(styles().base)}
            onClick={e => _set_language(e, 'en')}
          />

          <img
            src="images/flag_jp.png"
            class="language-button language-button-second"
            className={cx(styles().base)}
            onClick={e => _set_language(e, 'ja')}
          />
        </>
      ))(emotion())}
    </Show>
  );
};

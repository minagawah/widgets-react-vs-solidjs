import { useContext, createSignal, createEffect, Show, on } from 'solid-js';
import { createStore } from 'solid-js/store';
import tw from 'twin.macro';

import { EmotionContext } from '@/contexts/Emotion';
import { useLanguageWorker } from '@/contexts/Language';

const createStyles = ({ css }) => {
  return {
    base: css`
      display: inline-block;
      width: 36px;
    `,
  };
};

export const Language = props => {
  const [languageworker, { setLanguage }] = useLanguageWorker();
  const [emotion] = useContext(EmotionContext);
  const [styles, setStyles] = createStore(null);
  const [extra, setExtra] = createStore(null);

  const _set_language = (e, lang) => {
    e.stopPropagation();
    setLanguage(lang);
  };

  createEffect(() => {
    if (emotion()) {
      setStyles(createStyles(emotion()));
      props?.styles && setExtra(props.styles);
    }
  });

  return (
    <Show
      when={emotion() && styles && languageworker.ready()}
      fallback={<div></div>}
    >
      {(cx => (
        <>
          <img
            id="language-first"
            src="images/flag_us.png"
            className={cx(styles.base, extra?.base, extra?.first)}
            onClick={e => _set_language(e, 'en')}
          />

          <img
            id="language-second"
            src="images/flag_jp.png"
            className={cx(styles.base, extra?.base, extra?.second)}
            onClick={e => _set_language(e, 'ja')}
          />
        </>
      ))(emotion().cx)}
    </Show>
  );
};

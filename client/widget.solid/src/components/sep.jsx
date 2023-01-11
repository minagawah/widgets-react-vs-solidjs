import { useContext, Show } from 'solid-js';
import sanitizeHtml from 'sanitize-html';
import tw from 'twin.macro';

import { int } from '@/lib/utils';
import { EmotionContext, EmotionProvider } from '@/contexts/Emotion';

export const Sep = props => {
  const { sep = '>', styles: extra } = props || {};
  const [emotion] = useContext(EmotionContext);

  return (
    <Show when={emotion()} fallback={<div></div>}>
      {((cx, css) => (
        <span className={cx(css(tw`mx-1`), extra)}>{sep}</span>
      ))(emotion().cx, emotion().css)}
    </Show>
  );
};

import { createContext, createSignal, createEffect } from 'solid-js';
import { createStore } from 'solid-js/store';

import createEmotion from '@emotion/css/create-instance';

// ----------------------
// EmotionContext
// ----------------------

export const EmotionContext = createContext([]);

// ----------------------
// EmotionProvider
// ----------------------

/**
 * If you destructure `children` out of props, the children
 * will be considered OUTSIDE THE PROVIDER!!!
 * Make sure to directly use `props.children`.
 * https://github.com/solidjs/solid/discussions/713
 */
export const EmotionProvider = props => {
  const { key, element } = props || {};
  const [emotion, setEmotion] = createSignal();

  createEffect(() => {
    const { shadowRoot: container } = element || {};
    if (container) {
      const emo = createEmotion({ key, container });
      setEmotion(emo);
    }
  });

  return (
    <EmotionContext.Provider value={[emotion]}>
      {props.children}
    </EmotionContext.Provider>
  );
};

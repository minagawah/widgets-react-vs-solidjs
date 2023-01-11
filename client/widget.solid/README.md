# SolidJS Widgets

## About

This is about SolidJS widgets implemented for `widgets-react-vs-solidjs`.

## Install

```shell
# Install
cd client/widget.solid
npm install
```

## SolidJS Widget Tips

SolidJS is a bit tricky compared to React.
In React, you need to pay attentions to what to specify for dependencies.
Whereas in SolidJS, dependencies are pretty much taken care automatically,
yet, you need to specify _behaviors_ for how you want
your stored values to be reactive.  
Anyways, hope the following helps someone.

### Watch Out for Destructure!

While the official documentations mention in many occasions,
it is worth mentioning to watch out for _destructure_.
When you receive props from parent components,
make sure **_NOT_** to _destructure_ the props.
In SolidJS, it will lose reactivity when you do that.

### CSS-in-JS for Web Components

For the given samples, I use
[Emotion CSS](https://emotion.sh/docs/introduction)
and [Tailwind CSS](https://tailwindcss.com/docs/installation).
Because I made them Web Components,
a _Shadow Root_ is created for each widget when visiting the page.
And, this is very important; when widgets are within _Shadow Roots_,
they can _NOT_ look up globally defined CSS styles...
For any CSS-in-JS solutions usually inject styles globally,
however, for widgets in Shadow Roots can _NOT_ look up the definitions...

For Emotion CSS has a way to create a local instance.
So, I have a some voodoo tricks to locally inject Emotion instances.
See the actual codes for details.

Here are the voodoo tricks in `src/contexts/Emotion.jsx`:

```js
import { createContext, createSignal, createEffect } from 'solid-js';
import { createStore } from 'solid-js/store';

import createEmotion from '@emotion/css/create-instance';

export const EmotionContext = createContext([]);

export const EmotionProvider = props => {
  const { key, element } = props || {};
  const [emotion, setEmotion] = createSignal();

  createEffect(() => {
    const { shadowRoot: container } = element || {};

    if (container) {
      // Creating the instance
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
```

In `src/widgets/header.jsx`, asking `EmotionContext` to create the instance:

```js
import { register, compose } from 'component-register';
import { withSolid } from 'solid-element';
import { useContext, createEffect, Show } from 'solid-js';
import { createStore } from 'solid-js/store';
import tw from 'twin.macro';

import { EmotionContext, EmotionProvider } from '@/contexts/Emotion';

const createStyles = ({ css }) => {
  return {
    container: css`
      ${tw`
        w-full box-border
        flex flex-col justify-start items-center
        bg-gray-200
      `}
    `,
  };
};

const Header = props => {
  const [emotion] = useContext(EmotionContext);
  const [styles, setStyles] = createStore(null);

  createEffect(() => {
    if (emotion()) {
      setStyles(createStyles(emotion()));
    }
  });

  return (
    <Show when={emotion() && styles} fallback={<div></div>}>
      {(({ cx }) => (
        <div className={cx(styles.container)}>
          {...}
        </div>
      ))(emotion())}
    </Show>
  );
};

compose(
  register('header-widget'),
  withSolid
)((props, options) => {
  return (
    <WorkerProvider>
      <LanguageProvider>
        <EmotionProvider key="header-widget" element={options?.element}>
          <Header {...props} />
        </EmotionProvider>
      </LanguageProvider>
    </WorkerProvider>
  );
});
```

### When to use `createSignal` and `createStore`?

For both, values are proxy objects for the actual.
Whenever values are updated, proxy objects can keep track of the changes.
When to use `createSignal` and `createStore` and how are they different?
Well, when using `createSignal`, you want to manually define behaviors for reactivity by:  
(1) Executing the proxy (e.g. `if (pizza())` instead of `if (pizza)`),  
(2) Using `on` to listen to changes (e.g. `on(() => pizza, () => {})`), or  
(3) Using `createMemo` (e.g. `createMemo(() => pizza())`).  
For `createStore`, you won't worry much for it pretty much does the jobs automatically.
However, if you want to update values nested in the store, you need `produce`.  
There is
[a great post in StackOverflow](https://stackoverflow.com/questions/73440069/how-to-listen-to-only-a-certain-value-of-an-object-in-solid-js#answer-73872077)
that I highly recommend reading.
It describes with good examples how to use `createSignal` and `createStore`,
and I would say this post is way better than official documentations!

### Issue on Context Providers

Instead of using ordinary SolidJS, the sample uses [solid-element](https://github.com/solidjs/solid/tree/main/packages/solid-element).
It allows you to easily register SolidJS apps as Web Components.
However, it could get a bit tricky when adding context providers to your app when using `solid-element`.
`solid-element` uses
[component-register](https://github.com/ryansolid/component-register)
when registering widgets as Web Components.
It has a utility called `withProvider` which allows you to compose multiple providers at once.
However, when you feed providers, the structure for providers are a bit different from that of ordinary SolidJS apps;
where you usually define an object for context (in SolidJS providers), you need a _function_ for that of `component-register`.
Drawback is, it currently does not support async tasks at the apps startups (it allows async tasks at app's runtime).
Moreover, one of the major drawbacks following the way of `component-register` is that _you can't work with `element`_
(where `element` is the Shadow Root for the Web Component you register).
For instance, I can not create Emotion instances for my Shadow Roots.
So, instead of the way of `component-register`, I follow the oridinary SolidJS way for my Emotion provider.

## Installed NPM Packages

### dependencies

- core-js
- solid-element
- solid-js
- @emotion/css
- js-cookie
- moment
- sanitize-html
- axios
- ramda

### devDependencies

- @babel/core
- @babel/preset-env
- regenerator-runtime
- babel-loader
- babel-plugin-preval
- babel-preset-solid
- babel-plugin-macros
- webpack
- webpack-cli
- file-loader
- css-loader
- style-loader
- postcss-loader
- @svgr/webpack
- raw-loader
- worker-loader
- autoprefixer
- html-webpack-plugin
- mini-css-extract-plugin
- license-webpack-plugin
- webpack-bundle-analyzer
- prettier
- tailwindcss
- twin.macro
- nodemon
- rimraf

```
npm install --save core-js solid-element solid-js @emotion/css js-cookie moment sanitize-html axios ramda

npm install --save-dev @babel/core @babel/preset-env regenerator-runtime babel-loader babel-plugin-preval babel-preset-solid babel-plugin-macros webpack webpack-cli file-loader css-loader style-loader postcss-loader @svgr/webpack raw-loader worker-loader autoprefixer html-webpack-plugin mini-css-extract-plugin license-webpack-plugin webpack-bundle-analyzer prettier tailwindcss twin.macro nodemon rimraf
```

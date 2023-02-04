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
Whereas in SolidJS, dependencies are pretty much taken care automatically.
Yet, you need to specify _behaviors_ for how you want
your stored values to be reactive.  
Anyways. Hope the following contents will help you out there.

### Watch Out for Destructure!

While the official documentations mention in many occasions,
it is worth mentioning to watch out for _destructure_.
When you receive props from parent components,
make sure _NOT_ to _destructure_ the props.
In SolidJS, it will lose reactivity when you do that.

### CSS-in-JS for Web Components

For the given samples, I use
[Emotion CSS](https://emotion.sh/docs/introduction)
and [Tailwind CSS](https://tailwindcss.com/docs/installation).
Because I made them Web Components,
a _Shadow Root_ is created for each widget when visiting the page.
And (this is very important) when widgets are within _Shadow Roots_,
they can _NOT_ look up globally defined CSS styles!
For any CSS-in-JS solutions usually inject styles globally,
however, for widgets in _Shadow Roots_ can _NOT_ look up the definitions...

For Emotion CSS has a way to create a local instance,
I have some voodoo tricks to locally inject Emotion instances (per widget).
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

In `src/widgets/breadcrumbs.jsx`, asking `EmotionContext` to create the instance:

```js
import { customElement } from 'solid-element';
import {
  useContext,
  createSignal,
  createEffect,
  createMemo,
  Show,
} from 'solid-js';
import tw from 'twin.macro';

import { EmotionContext, EmotionProvider } from '@/contexts/Emotion';
import { LanguageContext, LanguageProvider } from '@/contexts/Language';

import { Sep } from '@/components/sep';

const createStyles = ({ css }) => {
  return {
    content: css`
      ${tw`
        w-full flex flex-row justify-start items-center
        text-xl font-bold text-gray-900
      `}
    `,
  };
};

const Breadcrumbs = props => {
  const [emotion] = useContext(EmotionContext);
  const [styles, setStyles] = createSignal(null);
  const [language] = useContext(LanguageContext);
  const [breadcrumbs, setBreadcrumbs] = createSignal([]);

  const lastindex = createMemo(() => breadcrumbs().length - 1);

  createEffect(() => {
    if (emotion()) {
      setStyles(createStyles(emotion()));
    }
  });

  createEffect(() => {
    const { dataset } = props?.element || {};

    if (dataset?.breadcrumbs) {
      try {
        const arr = JSON.parse(dataset.breadcrumbs);
        setBreadcrumbs(arr);
      } catch (err) {
        console.warn(err);
      }
    }
  });

  return (
    <Show
      when={emotion() && styles() && language() && lastindex() > -1}
      fallback={<div></div>}
    >
      {(({ cx, css }) => (
        <nav id="breadcrumbs-content" className={cx(styles().content)}>
          {breadcrumbs().map((bread, i) => {
            const [text, link] = bread;
            const show = i < lastindex();

            return link ? (
              <a key={i} href={link}>
                {text}
                {show && <Sep />}
              </a>
            ) : (
              <div key={i}>
                {text}
                {show && <Sep />}
              </div>
            );
          })}
        </nav>
      ))(emotion())}
    </Show>
  );
};

customElement('breadcrumbs-widget', {}, (props, { element }) => {
  return (
    <LanguageProvider>
      <EmotionProvider key="breadcrumbs" element={element}>
        <Breadcrumbs element={element} {...props} />
      </EmotionProvider>
    </LanguageProvider>
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

### Issues on Context Providers

Instead of ordinary SolidJS, we are using
[solid-element](https://github.com/solidjs/solid/tree/main/packages/solid-element).
When registering a custom tag as a web component,
the sample is using `customElement()` because it is the easiest way.

There is another way of registering web components using `regiser()` provided by
[component-register](https://github.com/ryansolid/component-register).
`solid-element` is using `component-register` under the hood.
So, whether using `customElement()` or `register()`, it is about the same.

```diff
-import { customElement } from 'solid-element';
+import { register, compose } from 'component-register';
+import { withSolid } from 'solid-element';
 import {
   useContext,
   createSignal,
@@ -97,12 +96,7 @@ const Breadcrumbs = props => {
   );
 };

-customElement('breadcrumbs-widget', {}, (props, { element }) => {
+compose(
+  register('breadcrumbs-widget'),
+  withSolid
+)((props, options) => {
+  const element = options?.element;
+
```

But, when using `userProvider` (also of `component-register`)
along with `register`,
there are certain things you need to watch out for.
`withProvider` allows you to compose providers.
However, when you feed providers, the structure for providers are a bit different from that of ordinary SolidJS apps;
where you usually define an object for context (in SolidJS providers), you need a _function_ for that of `component-register`.
Drawback is, it currently does not support async tasks at the apps startups (it allows async tasks at app's runtime).
Moreover, one of the major drawbacks following the way of `component-register` is that _you can't work with `element`_
(where `element` is the Shadow Root for the Web Component you register).
For instance, I can not create Emotion instances for my Shadow Roots.
So, instead of the way of `component-register`, I follow the oridinary SolidJS way for my Emotion provider.

### How to Share State Among Web Components?

Unlike the React example, you may not share state using context providers.
It is not because of SolidJS, but because widgets here are Web Components
(where SolidJS app is instantiated per widget).
So, I'm using _[Shared Worker](https://developer.mozilla.org/en-US/docs/Web/API/SharedWorker)_.

Use of _Shared Worker_ is not very difficult.
Since Webpack 5, it has a worker support,
and you won't need special loaders for your worker files.

I have `src/widgets/init.js`:

```js
const worker = new SharedWorker('./build/widget.solid.worker.js');
worker.port.start();
```

As long as I have

```html
<script src="build/widget.solid.init.js"></script>
```

in HTML pages, it will prepare the worker, and will start listening.

For my other widgets to communicate using the worker,
I have [WorkerContext](src/contexts/Worker.js)
in `src/contexts/Worker.js`, and does this:

```js
setWorker(
  new SharedWorker(
    /* webpackChunkName: "worker" */ new URL('@/worker', import.meta.url)
  )
);
```

Once `WorkerContext` is ready, you can use it from anywhere.  
In `src/components/language.jsx`:

```js
import { useContext, Show } from 'solid-js';
import { useLanguageWorker } from '@/contexts/Language';

export const Language = props => {
  const [languageworker, { setLanguage }] = useLanguageWorker();

  const _set_language = (e, lang) => {
    e.stopPropagation();
    setLanguage(lang);
  };

  return (
    <Show when={languageworker.ready()} fallback={<div></div>}>
      <img src="images/flag_us.png" onClick={e => _set_language(e, 'en')} />

      <img src="images/flag_jp.png" onClick={e => _set_language(e, 'ja')} />
    </Show>
  );
};
```

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

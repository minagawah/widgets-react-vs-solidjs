# Server Settings

## About

This is about server-side configurations for `widgets-react-vs-solidjs`.

- Using `http-server` to serve pages.
- Using PostCSS-CLI to build CSS files (with Tailwind CSS support).

## Install

```shell
# Install
cd server
cd client/widget.solid
npm install
```

## Server-Side Tips

### Tailwind CSS on Server-Side

The sample has an original CSS as `server/styles/main.css`,
and using PostCSS CLI to bundle the outputs to `server/public/css/main.css`.

It is pretty much covered in [Tailwinds' official documentation](https://tailwindcss.com/docs/installation/using-postcss),
however, I guess it is worth talking about it.

So, here are the NPM packages installed for CSS bundling:

```shell
# dependencies
npm install --save tailwindcss postcss autoprefixer

# devDependencies
npm install --save-dev postcss-cli postcss-preset-env
```

and I have the following simple command for NPM script (in `package.json`):

```json
  "build:css": "postcss styles --dir public/css"
```

In `postcss.config.js`, I have the following:

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    'postcss-preset-env': {
      stage: 2, // default
      features: {
        'nesting-rules': true,
        'custom-media-queries': true,
      },
    },
  },
};
```

Notice it is enabling "nesting-rulees" and "custom-media-queries" so that I can have an expressions for media queries:

```css
.generic-content-wrapper {
  width: 94%;
  @media (min-width: 768px) {
    width: 85%;
    max-width: 1024px;
  }
}
```

For `tailwind.config.js`, I have the following:

```js
module.exports = {
  content: ['./public/*.{html,js}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

Notice that I need to specify the path to my HTML files.

## Installed NPM Packages

#### dependencies

- tailwindcss
- postcss
- autoprefixer

#### devDependencies

- http-server
- postcss-cli
- postcss-preset-env
- nodemon
- concurrently
- prettier

```shell
npm install --save  tailwindcss postcss autoprefixer

npm install --save-dev http-server postcss-cli postcss-preset-env nodemon concurrently prettier
```

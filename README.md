# widgets-react-vs-solidjs

Compare widgets implemented in React and SolidJS.

See [Demo](https://tokyo800.jp/mina/widgets-react-vs-solidjs/)

## 1. About

Here, we are comparing 2 widget implementations; one with React, another with SolidJS.
Yet, this is more about the use of [Emotion CSS](https://emotion.sh/docs/introduction)
and [Tailwind CSS](https://tailwindcss.com/docs/installation) for React and SolidJS apps
because that's what make it hard. I mean it was really hard...
For those having similar issues using Emotion or Tailwind, hope it helps solving yours.

As you can see in the [Demo](https://tokyo800.jp/mina/widgets-react-vs-solidjs/),
there aren't much differences whether using React or SolidJS
probbly because the sample widgets are relatively small.
You may also notice it takes time for initial startup,
but that's what happens when using JS frameworks.
After finished with these samples,
I thought about writing them without any JS frameworks.
It could become much faster.
Give me your thoughts on this.

You may also notice the page appears to be shakey;
for widgets appear after about 1 second.
This is due to the widgets replacing DOMs when ready, giving height to each element.
It could improved if I combined some widgets into 1 widget
(then it would be no different from ordinary SPA though).
Or, I could apply some transition animations.

## 2. Settings

As I mentioned, it is more about using Emotion CSS and Tailwind CSS.  
Enjoy the content, or hope it helps someone with similar issues.

- [Client (Widgets in SolidJS)](client/widget.solid/)
- [Client (Widgets in React)](client/widget.react/)
- [Server](server/)

## 3. Install

For each `server`, `client/widget.react`, and `client/widget.solid`, run `npm install` within the folders.

## 4. Run

```shell
# Use 'http-server' to serve, watch changes for HTML and CSS.
make watch.server

# Build client widgets (both React and SolidJS) for DEV
make build.client.dev

# Build client widgets (both React and SolidJS) for RELEASE
make build.client.release

# Watch changes for React widgets, build whenever needed.
make watch.client.widget.react

# Watch changes for SolidJS widgets, build whenever needed.
make watch.client.widget.solid
```

## 5. License

Dual-licensed under either of the followings.  
Choose at your option.

- The UNLICENSE ([LICENSE.UNLICENSE](LICENSE.UNLICENSE))
- MIT license ([LICENSE.MIT](LICENSE.MIT))

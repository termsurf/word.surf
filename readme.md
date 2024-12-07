<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

<p align='center'>
  <a href="https://word.surf">
    <img src='https://github.com/termsurf/word.surf/blob/make/moon.svg?raw=true' height='192'/>
  </a>
</p>

<h3 align='center'>
  <a href="https://word.surf">word.surf</a>
</h3>
<p align='center'>
  Open Source Language Website
</p>

<br/>
<br/>
<br/>

## Welcome

CodeSurf is an open source language website where you can:

- Publish your conlang or natural language
- Publish a language's vocabulary
- Publish a language's grammar
- Publish word lists
- Publish your conscript or other writing system

It's basically like Wiktionary but with a different bar for quality, a more integrated and helpful UI (with various tools and such), an API for developers to use, and easier for others to contribute to (assuming you are familiar with Git/GitHub). And of course we would welcome all conlangs which Wiktionary probably won't support.

You'll also be able to:

- Download a PDF of your grammar.
- Download a spreadsheet of your dictionary entries and word lists.

## Ecosystem

- `@termsurf/basesurfbase`: Base content for standard languages, scripts, and worlds.
- `@termsurf/basesurfhost`: Generator for creating your own content repository.
- `@termsurf/leaf`: Generator for creating your own content repository.

## Motivation

We are working on a conlang, [Tune](https://github.com/termsurf/tune), and a conscript, [Tone](https://github.com/termsurf/tone), and there's nothing really that nice out there for working on it in public and sharing your creations. There are some Facebook groups, and some language websites, but nothing that really aggregates and centralizes all of the language stuff.

In addition, I personally would like to learn how to communicate in these 7 ancient languages:

1. Hebrew
2. Sanskrit
3. Tibetan
4. Chinese
5. Arabic
6. Greek
7. Latin

So needed a system to normalize and unify the lexicons and rules for the different languages, so you can see more at once, in as nice and easy a way as possible.

That plus it would be amazing to turn this into a small revenue stream somehow, to fund further open developments in the future.

## Site Notes

- REST API documentation at https://word.surf/*.json

## Contributing

- Add a script
- Add a language
- [Add a font](https://github.com/termsurf/word.surf/issues/new?assignees=termhare&labels=font%2Ctriage&projects=&template=font.yaml&title=%5BFont%5D%3A+)

## Development

This repo is currently a frontend **Next.js v14** "app router" style app. It used [`@termsurf/leaf`](https://github.com/termsurf/leaf) for most of the UI. Leaf is a simple UI kit for TermSurf projects, just the general theme basically, didn't reinvent the wheel too much here. Built on top of some of these things:

- [React](https://react.dev/)
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/) (some helpful headless UI components)
- [MDX](https://mdxjs.com/) (markdown for writing language guides)
- [Supabase](https://supabase.com/) (for real-time collaboration)
- [yjs](https://docs.yjs.dev/) (for real-time collaboration)
- [TypeScript](https://www.typescriptlang.org/)
- [zod](https://zod.dev/) (data validation)
- [XLSX.js](https://github.com/SheetJS/sheetjs) (for spreadsheets)
- [CodeMirror](https://github.com/codemirror/codemirror5) (text editing and code highlighting)
- [Immutable.js](https://immutable-js.com/)
- [ESLint](https://eslint.org/)
- https://supabase.com/docs/guides/auth/social-login/auth-google

#### Start the server

```bash
pnpm work
```

Then visit http://localhost:3000 or whatever port it takes you to.

#### Test production build

```bash
pnpm make
```

## License

[aGPLv3](https://en.wikipedia.org/wiki/GNU_Affero_General_Public_License)

## TermSurf

This is being developed by the folks at [TermSurf](https://term.surf), a
California-based project for helping humanity master information and
computation. Find us on [X](https://x.com/termsurf),
[LinkedIn](https://www.linkedin.com/company/termsurf), and
[Facebook](https://www.facebook.com/termsurf). Check out our other
[GitHub projects](https://github.com/termsurf) as well!

- https://www.ashleydanyew.com/posts/latin-pronunciation-guide

```
/symbols/icons
/symbols/unicode
/symbols/U+1234
/scripts/latin/fonts
/scripts/latin/symbols/d/fonts
/fonts/noto-sans/symbols/d
/fonts/noto-sans/blocks/:block
```

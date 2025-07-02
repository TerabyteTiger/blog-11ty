---
title: Fixing "Global is not Definied" in Vite and Vue 3
layout: libdoc_page.liquid
published: true
date: "2023-01-25"
permalink: "{{ libdocConfig.archiveSlug }}/{{date}}-{{page.fileSlug}}/index.html"
description: "How to fix a `ReferenceError: global is not defined` error when using Vite, Vue 3, and Piana"
tags:
    - vue
    - vite
    - piana
---

While starting my first full project with [Vite](https://vitejs.dev/) + [Vue 3](https://vuejs.org/) after trying to start using [Pinia](https://pinia.vuejs.org/), I as getting an error:

```console {codeTitle: "Console Error"}
ReferenceError: global is not defined
    at node_modules/immediate/lib/mutation.js (mutation.js:6:16)
    at __require (chunk-DFKQJ226.js?v=321f6407:8:50)
    at node_modules/immediate/lib/index.js (index.js:5:3)
    at __require (chunk-DFKQJ226.js?v=321f6407:8:50)
    at index-browser.es.js:1:23
```

After commenting lines in and out, I was able to trace down that the root of the issue was coming from my [PouchDB](https://pouchdb.com/) import line, which led me to [this Github Issue solution](https://github.com/pouchdb/pouchdb/issues/8266#issuecomment-769462216).

In my case it seems like the only change that was necessary is to add this to the top of `main.js`:

```js {codeTitle: "main.js"}
import process from "process/browser";
window.process = process;

window.global = window;
// Rest of your file goes here 👇🏻
```

Hope this helps you not struggle for an hour 💕

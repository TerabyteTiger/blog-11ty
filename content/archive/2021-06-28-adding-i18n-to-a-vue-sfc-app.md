---
title: How to add Internationalization to a Vue Single File Component App
published: true
description: A complete guide on adding Internationalization (I18n) to a Single File Component (SFC) Vue App using vue-i18n.
tags:
    - internationalization
    - vue
layout: libdoc_page.liquid
cover_image: ../../assets/archive/blogImgs/cover-images/vue-i18n-in-sfc-components-DEV.png
date: "2021-06-28"
twitter_image: ../../assets/archive/blogImgs/twitter-images/vue-i18n-in-sfc-components-Twitter.png
permalink: "{{ libdocConfig.archiveSlug }}/{{date}}-{{page.fileSlug}}/index.html"
---

## What is Internationalization (I18n)?

You may have run across the abbreviation I18n before and been unsure what it stood for. Similar to how A11y stands for Accessibility, with 11 representing the 11 letters between the "A" and "Y", I18n stands for Internationalization and the 18 letters between the "I" and "N". But what is internationalization?

> Internationalization means supporting your app or site for multiple languages via translations.

I18n is supporting your app at an "international level" - namely by providing translations so users that don't speak your native language can still use your app. Despite sounding like a tricky problem to solve, the solution we will look at using the [vue-i18n plugin](https://kazupon.github.io/vue-i18n/introduction.html#sponsors) makes things relatively straightforward for developers!

## Setup & Installation

**Note: this guide will use Vue 2.\* syntax**

How do you get started with vue-i18n? If you're using [npm](https://www.npmjs.com/) you'll run:

```cmd{codeTitle: "Terminal"}
npm install vue-i18n
```

and if you're using [yarn](https://yarnpkg.com/) you'll run:

```cmd{codeTitle: "Terminal"}
yarn add vue-i18n
```

Then in your `main.js` file you'll need to add the following, which will import the plugin across your whole application so you don't need to import the plugin on every page of your application.

```js{codeTitle: "/src/main.js"}
import VueI18n from "vue-i18n";

Vue.use(VueI18n);

// You can set a default language like this:
const i18n = new VueI18n({
  locale: "English",
  fallbackLocale: "English",
});
new Vue({
  //...
  i18n,
  render: (h) => h(App),
}).$mount("#app");
```

That's it! Now we're ready to start translating!

## How to add languages in SFC files

So now consider the following example component file, `Hello.vue`:

```vue{codeTitle: "/src/components/Hello.vue"}
<template>
  <h1>Hello!</h1>
</template>
```

While this file is great for English speakers in the crowd, we want our page to be a bit more dynamic than that. To do so, we need to replace our `Hello` with {% raw %}`{{ $t("hello") }}`{% endraw %} - which will look for the specified `"hello"` "variable" for the selected language, and return it to the user. We specify our i18n variables inside of an `i18n` tag that sits at the same level as our `template`, `script` and `style` tags.

```vue{codeTitle: "/src/components/Hello.vue"}
<template>
  <h1>
  {% raw %}
    {{ $t("hello") }}!
  {% endraw %}
  </h1>
</template>

<i18n>
{
  "English": {
    "hello": "Hello",
  },
  "Español": {
    "hello": "Hola",
  },
  "Deutsche": {
    "hello": "Hallo",
  },
  "Français": {
    "hello": "Bonjour",
  }
}
</i18n>
```

Now, as the user changes languages via the Language Picker (see below) it will swap out "Hello" for "Hola", "Hallo", and "Bonjour"!

## Language Drop-down

So now we have the translations set up for our users, but how do we enable them to select which language to display the page in? With a component, of course! This component is ready for English, Spanish, German, and French:

```vue {codeTitle: "/src/components/LangChanger.vue"}
<template>
    <div>
        <select name="LanguageSelection" v-model="$root.$i18n.locale">
            <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">
                {% raw %}
                {{ lang }}
                {% endraw %}
            </option>
        </select>
    </div>
</template>

<script>
export default {
    name: "locale-changer",
    data() {
        // 👇 These are the languages that are available for users to select from.
        // They need to match the values in the <i18n> block in the previous code sample.
        return { langs: ["English", "Español", "Deutsche", "Français"] };
    },
};
</script>
```

## Read More

-   [vue-i18n plugin documentation](https://kazupon.github.io/vue-i18n/)

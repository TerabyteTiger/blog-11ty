---
title: Creating your own Links page in Nuxt
layout: libdoc_page.liquid
published: true
date: "2022-12-22"
permalink: "{{ libdocConfig.archiveSlug }}/{{date}}-{{page.fileSlug}}/index.html"
description: Do you want to set up a simple links page on your Nuxt blog to share on social medias? Here's how I created mine!
tags:
    - vue
    - social
---

This is a quick code sample of how I created [my own "Where to find me" page for my blog](https://terabytetiger.com/links).

I'm using [Nuxt](https://nuxtjs.org/), [Font Awesome](https://fontawesome.com/), and [Tailwind (v2)](https://v2.tailwindcss.com/) but with minor adjustments you can adapt this to any stack of your liking 😊

## My Social Component

I already had this component that I was using to show a list of Font Awesome Icons with links to my various social accounts around the internet and figured I would reuse it for my new links page.

After initial setup I realized I didn't have a way to link from my links page back to my actual blog, so I added it as a link and an `isHome()` computed property to check if the user was already on my home page or not.

```html {codeTitle: "/components/Social.vue"}
<template>
    <div class="max-w-4xl mx-auto py-4 text-center">
        <h2 class="my-4 text-3xl font-display font-bold">
            Find me around the internet
        </h2>
        <ul
            class="flex flex-wrap justify-around max-w-lg mx-auto text-center list-none"
        >
            <li v-if="isHome" class="w-1/2 md:w-1/4 mt-4">
                <a href="https://terabytetiger.com/">
                    <div>
                        <font-awesome-icon
                            :icon="['fas', 'home']"
                            :style="{
                fontSize: '3rem',
              }"
                            class="text-purple-0"
                        />
                    </div>
                    Blog
                </a>
            </li>
            <li class="w-1/2 md:w-1/4 mt-4">
                <a href="https://dev.to/terabytetiger">
                    <div>
                        <font-awesome-icon
                            :icon="['fab', 'dev']"
                            :style="{
                fontSize: '3rem',
              }"
                        />
                    </div>
                    Dev.to
                </a>
            </li>
            <li class="w-1/2 md:w-1/4 mt-4">
                <a href="https://github.com/TerabyteTiger">
                    <div>
                        <font-awesome-icon
                            :icon="['fab', 'github']"
                            :style="{
                fontSize: '3rem',
              }"
                        />
                    </div>
                    Github
                </a>
            </li>
            <li class="w-1/2 md:w-1/4 mt-4">
                <a rel="me" href="https://dftba.club/@TerabyteTiger">
                    <div>
                        <font-awesome-icon
                            :icon="['fab', 'mastodon']"
                            :style="{
                fontSize: '3rem',
              }"
                            class="text-blue-700"
                        />
                    </div>
                    Mastodon
                </a>
            </li>
            <li class="w-1/2 md:w-1/4 mt-4">
                <a href="https://www.instagram.com/t.vanblargan/">
                    <div>
                        <font-awesome-icon
                            :icon="['fab', 'instagram']"
                            :style="{
                fontSize: '3rem',
              }"
                            class="text-pink-500"
                        />
                    </div>
                    Instagram
                </a>
            </li>
            <li class="w-1/2 md:w-1/4 mt-4">
                <a
                    href="https://www.youtube.com/channel/UCZeMnP2XoSh724u4v8Oskwg"
                >
                    <div>
                        <font-awesome-icon
                            :icon="['fab', 'youtube']"
                            :style="{
                fontSize: '3rem',
              }"
                            class="text-red-500"
                        />
                    </div>
                    YouTube
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "Social",
        computed: {
            isHome() {
                return !(this.$route.fullPath === "/");
            },
        },
    };
</script>
```

Over time as my usage of different social medias ebbs and flows, I tend to update my list and comment in/out the various links so that only sites I'm active on are listed.

## The Links Page Layout

Once I had my `Social` component configured, I added a new Layout that would exclude my normal Header and Footer from the links page to keep it minimalistic.

```html {codeTitle: "/layouts/links.vue"}
<template>
    <div
        class="bg-gradient-to-br from-blue-400 to-purple-400 w-screen h-screen p-12"
    >
        <Nuxt />
    </div>
</template>
```

## The Links Page

Next I set up my Links page to be a simple card with the `Social` component and a fun shaped profile picture at the top.

```html {codeTitle: "/pages/Links.vue"}
<template>
    <div class="">
        <img
            src="/profileImg.png"
            alt="(your alt text goes here)"
            class="rounded-full h-48 mx-auto mb-8 py-4 filter drop-shadow-2xl"
        />
        <div
            class="bg-white mx-auto w-7/8 lg:w-1/2 rounded-lg p-4 filter drop-shadow-2xl"
        >
            <Social></Social>
        </div>
    </div>
</template>

<script>
    export default {
        layout: "links",
    };
</script>
```

And that is all it took to get a central location I could link to from various social accounts!

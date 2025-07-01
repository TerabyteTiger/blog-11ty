---
title: How to Add Web Monetization to a Gridsome Blog
layout: libdoc_page.liquid
published: true
cover_image: ../../assets/archive/blogImgs/cover-images/monetizeGridsome-DEV.png
date: "2021-11-29"
twitter_image: ../../assets/archive/blogImgs/cover-images/monetizeGridsome-DEV.png
permalink: "{{ libdocConfig.archiveSlug }}/{{date}}-{{page.fileSlug}}/index.html"
description: Learn how to add web monetization to a Gridsome blog to better understand webmon and add bonus features to your site!
tags:
    - webmon
    - gridsome
    - blogging
---

## Register for Web Monetization with Coil

I'm sure there are more options out there, but in my experience [Coil](https://coil.com/creator) was easy to get set up with and has been what I've been using since my [JS13K development](https://terabytetiger.com/lessons/my-first-game-jam-in-13k-or-less/).

Note that while you'll need to set up an account for money to be deposited to, you _do not_ need to pay for a monthly membership in order to get paid via web monetization with Coil (at least as of the time of writing).

## Get your payment location

Once your Coil account is set up, login and head to https://coil.com/settings/monetize to get your `meta` tag - it should look something like this (it will be a bit different if you setup your payment account with something other than Uphold):

```html {codeTitle: "Monetization Meta Tag HTML"}
<meta name="monetization" content="$ilp.uphold.com/FYGWHFNNRHg8" />
```

Next we'll be injecting this into the `head` tag of the pages in our blog!

## Inject your monetization meta tag into your head tags

In your `main.js` file:

```js {codeTitle: "main.js"}
// Imports/component registration still goes here

export default function (Vue, { router, head, isClient }) {
  // Component registration/other config work
  head.meta.push({
    name: "monetization",
    content: "$ilp.uphold.com/FYGWHFNNRHg8",
    // Replace with your monetization endpoint from the "Content" from the previous step
  })
}
```

And just like that you're ready to publish and start getting paid! 💰

## Adding Content behind a paywall

I'm going to cover two ways to check if the user has web monetization. Each has it's pros and cons, but if you know a way to do it without either of the cons I list, [tweet at me about it](https://twitter.com/TerabyteTiger)!

### Method 1: Check for monetization on mount

The first way you can check if the user is using a form of web monetization is to check on mount (or create - they both work, but you may want to use one or the other depending on your exact use case).

```vue {codeTitle: "ComponentWithPaidContent.vue"}
<template>
  <div>
    <div v-if="showMonetization">Paywall blocked content goes here</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showMonetization: false,
    }
  },
  mounted() {
    this.showMonetization =
      document.monetization && document.monetization.state === "started"
  },
}
</script>
```

The key part of what's happening here is `document.monetization` checking if there is a monetization element in the document and if there is, checking if it's state is set to "started" with `document.monetization.state === "started"`

The state of monetization can be one of `stopped`, `pending`, or `started`([source](https://webmonetization.org/docs/api/))

#### The downside to method 1

When using this approach, I've had an issue where a user navigating directly to a page with paywall content will never see the content, even if they have a service enabled and running without navigating to another page then back to the page with the monetized content.

### Method 2: Add an event listener to the monetization element

To counter the issue listed above with requiring users to navigate away and back to the page you can add an event listener to the monetization element instead of immediately checking if it's ready when the component loads.

This works because adding the listener will wait for the monetization to load in, then once it's ready update our data flag and start showing the content at that point.

```vue {codeTitle: "ComponentWithPaidContent.vue"}
<template>
  <div>
    <div v-if="showMonetization">Paywall blocked content goes here</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showMonetization: false,
    }
  },
  mounted() {
    document.monetization.addEventListener("monetizationstart", () => {
      this.showMonetization =
        document.monetization && document.monetization.state === "started"
    })
  },
}
</script>
```

#### The downside to method 2

Unfortunately, this comes with it's own slight downside. When a user _doesn't_ have monetization, this method throws a console error and could potentially cause other portions of your app to not load in properly.

I believe the risk of this can be minimized by adding the event listener after any other mounted logic you may be calling on the page.

## Conclusion

Now you know how to add web monetization to your content and how to use that to put some of your content behind a webmon paywall. Personally, I'm a huge fan of the [100 + 20 philosophy outlined by Coil](https://coil.com/p/coil/The-100-20-Rule-for-Premium-Content/3l1ALJ3M6) which proposes that the best approach to maximize paid content is to offer 100% of your normal content for free, then adding in an additional 20% bonus content for your paid subscribers. Thanks for reading ✌🏻

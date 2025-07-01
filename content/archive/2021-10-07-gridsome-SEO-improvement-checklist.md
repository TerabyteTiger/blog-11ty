---
title: Gridsome SEO Improvement Guide
layout: libdoc_page.liquid
published: true
description: Improving the SEO of your Gridsome site's blog post with easy to add code snippets.
tags:
    - seo
    - gridsome
    - blogging
cover_image: ../../assets/archive/blogImgs/cover-images/gridsomeSEO-DEV.png
date: "2021-10-07"
updated: "2021-11-04"
permalink: "{{ libdocConfig.archiveSlug }}/{{date}}-{{page.fileSlug}}/index.html"
---

Gridsome does an excellent job of enabling the "non-SEO" part of SEO (Search Engine Optimization - the act of creating and describing a page in the best way so Google can correctly serve it to the users that are looking for your site) thanks to being a static site and having optimizations included with the `<img>` tag for images (among other things). But how can you make sure you're pushing the SEO of your site to the next level?

With this checklist ✅

> This list can apply to non-Gridsome sites as well!

## Wrap your main content in a `<main>` tag

The first thing you're going to want to do is make sure the correct HTML tags are getting used throughout our site. The first of which is [the `<main>` tag](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/main) to indicate where in your Layout the main content of the page lives.

In my `Layout.vue` Gridsome File I have the following layout:

```vue {codeTitle: "Layout.vue"}
<template>
    <div>
        <!-- Wrapper div until Vue 3 -->
        <header>My header title and navigation links go here</header>

        <main>
            <!-- This is where the page contents render -->
            <slot />
        </main>

        <footer>Footer content goes here</footer>
    </div>
</template>
```

## Use the `<article>` tag

Along the same lines as the above point, make sure you're using [`<article>` tags](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/article) where applicable.

The article tag calls out to Google that everything between the opening and closing tag will make sense to users without additional context from the page being needed.

On my site I use these tags in 2 ways - for the actual blog post contents and in my components that link to a blog post.

In my components:

```vue {codeTitle: "src/components/BlogPostCard.vue"}
<!-- Component -->
<template>
    <!-- I pass in article as a prop -->
    <g-link :to="article.path">
        <article>
            <!-- Image/emoji/title/description of article here -->
        </article>
    </g-link>
</template>
```

In my template files:

```vue{codeTitle: "src/templates/Post.vue"}
<!-- Template File -->
<template>
  <Layout>
    <article>
    {% raw %}
      <h1>{{ $page.post.title }}</h1>
  {% endraw %}
      <div v-html="$page.post.content"></div>
    </article>
  </Layout>
</template>
```

## Set your page's meta title

Have you noticed a trend with improving SEO? It's all about the HTML!

Inside of our `<head>` tag for each page we want to include a [`<title>` tag](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/title) which will be both the main header for our page when shown on Google, and update the contents of the tab title making our site look super cool 😎

In standard HTML this look like this:

```html{codeTitle: "index.html"}
<head>
  <title>The awesome title of our page 🚀</title>
</head>
```

For a static page in Gridsome we can achieve this like this:

```vue {codeTitle: "src/pages/AwesomePage.vue"}
<script>
import Layout from "~/layots/Default.vue";
// note that we don't need to import metaInfo()!
export default {
    components: {
        Layout,
    },
    metaInfo() {
        return {
            title: "The awesome title of our page 🚀",
        };
    },
};
</script>
```

And for our template pages:

```vue {codeTitle: "src/templates/Post.vue"}
<script>
import Layout from "~/layots/Default.vue";
// note that we don't need to import metaInfo()!
export default {
    components: {
        Layout,
    },
    metaInfo() {
        return {
            // This sets the title to the post title for the page
            title: this.$page.post.title,
            // If you're using something other than post, you'll need to update this accordingly
        };
    },
};
</script>
```

## Set a canonical URL

The power of `metaInfo()` doesn't stop with setting the title of the page - we can also use it to harness the most powerful meta information a blogger can become familiar with - **Canonical URLs**.

In particular, for our blog post pages, we want Google to know that our page is the most legit page, so we need to add a tag that will look like this to our `<head>`:

```html {codeTitle: "index.html"}
<head>
    <link
        rel="canonical"
        content="https://yourdomain.com/slug/path/whatever/"
    />
</head>
```

In Gridsome's `metaInfo()` being generated for each page:

```vue {codeTitle: "src/template/Post.vue"}
<script>
import Layout from "~/layouts/Default.vue";
// No need to import metaInfo()!
export default {
    components: {
        Layout,
    },
    metaInfo() {
        return {
            title: this.$page.post.title,
            link: [
                {
                    rel: "canonical",
                    content: "https://yourdomain.com" + this.$page.post.path,
                },
                // Don't forget to swap in your domain! ^
                // You can also set this manually, for example on your About page
            ],
        };
    },
};
</script>
```

[Learn more about canonical URLs in this post!](https://terabytetiger.com/lessons/what-is-a-canonical-url/)

## Create more sharable pages with OG and Twitter information

One of the coolest (and also more time consuming - but we'll get to that) things you can do with `metaInfo()` is the addition of details so that when someone shares your site on Twitter or Slack or Facebook, your page pops up with a snazzy cover image and description of what the page is about.

In order to do this, you'll need to add 2 sets of very similar information (thanks Twitter for insisting on being different). All the items with the `twitter:` prefix are for Twitter shares, while the `og:` prefix is for basically everything else (I think technically Pinterest wants something extra also, but I haven't dug into that hole yet).

```vue {codeTitle: "src/template/Post.vue"}
<script>
import Layout from "~/layouts/Default.vue";
export default {
    components: {
        Layout,
    },
    metaInfo() {
        return {
            title: this.$page.post.title,
            meta: [
                {
                    name: "description",
                    content: this.$page.post.description,
                    // You may notice there are 3 description items
                    // This one is for Google, the others are for OG and Twitter :)
                },
                {
                    name: "twitter:description",
                    content: this.$page.post.description,
                },
                {
                    name: "twitter:card",
                    content: "summary_large_image",
                    // Supposedly there are multiple options for this value
                    // However, Twitter's docs only vaguely mention them existing
                },
                {
                    name: "twitter:title",
                    content: this.$page.post.title,
                },
                {
                    name: "twitter:image",
                    content:
                        this.$static.metadata.baseURL +
                        this.$page.post.twitter_image.src,
                    // I'm using my twitter_image field from markdown for this
                },
                {
                    name: "twitter:creator",
                    content: "@authorsTwitterAccount",
                },
                {
                    name: "twitter:site",
                    content: "@siteTwitterAccount",
                },
                {
                    name: "og:image",
                    content:
                        this.$static.metadata.baseURL +
                        this.$page.post.cover_image.src,
                    // I'm using my cover_image field from markdown for this
                },
                {
                    name: "og:description",
                    content: this.$page.post.description,
                },
                {
                    name: "og:title",
                    content: this.$page.post.title,
                },
            ],
        };
    },
};
</script>
```

So now the (relatively) bad news - in order to really optimize your site's "shareability" you'll need to be creating the images for `og:image` and `twitter:image` uniquely. The recommended image size for `og:image` is 1200px x 627px and `twitter:image` is 1024px x 512px (at the time of writing).

## Make sure you're only using one `<h1>` tag

As a final tip to help optimize - make sure you're only using 1 `<h1>` tag on your page. The way I handle this is by plugging in the post's `title` as an `<h1>` in my template and starting all of my post headers with `##` (or greater - make sure you always increase header levels by at most 1 at a time).

This has the added benefit of making cross-posting to DEV easier (although technically I write my posts on DEV then copy/paste to my blog, but that's not important here).

I look forward to seeing your posts at the top of my Google searches soon! 😉

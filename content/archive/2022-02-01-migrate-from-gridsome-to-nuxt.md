---
title: Migrating from Gridsome to Nuxt
published: true
description: Walkthrough of what steps are required to migrate a Gridsome blog to Nuxt and highlight potential problems with the migration.
tags:
    - nuxt
    - gridsome
    - vue
    - blogging
layout: libdoc_page.liquid
permalink: "{{ libdocConfig.archiveSlug }}/{{date}}-{{page.fileSlug}}/index.html"
date: "2022-02-01"
---

## Why Migrate

When I transitioned from trying to learn React to using Vue, I also converted my personal site from Gatsby to Gridsome so that it would function as a playspace for working with the tools of my new ecosystem. I've had a great time working with Gridsome and will continue to work with it when appropriate, but after waiting 4 months from the Gridsome team teasing that Vue 3 + Gridsome was only a few weeks away I decided to migrate to Nuxt since the Vue 3 timeline was a lot more promising.

In addition to the Vue 3 timeline, there were also a few small tweaks I had tried to make to my blog with Gridsome that just weren't possible or a huge time sink to get working and look like they will be either possible or mostly out of the box functionality with Nuxt, which helped push me to give Nuxt a try.

## Migration Plan

> This guide is specifically for blogs using Markdown.md and the source-filesystem Gridsome plugin - exact steps will vary for other sources.

When it came to migrating my blog over, I broke the process into some "Key checkpoints" in the process, all of which should be working in my development environment before working towards the next checkpoint.

1. Create a new blank Nuxt project | This will make sure my directories are structured in the way Nuxt likes them
1. Install Tailwind CSS & Content Module | These actually just work™ out of the box with the Nuxt configuration options
1. Get my Layout & static pages rendering | Start with the least complex pages, then move to getting the Content module setup working
1. Setup Content Module & Generate Pages | This ended up taking less time than expected initially
1. Update the Metadata across my site | I was really dreading setting up Twitter share cards again, so I saved this step for last 😅 It was also the least likely feature to present enough issues that I'd give up on the conversion.

Because Nuxt is still a Vue framework, about 90% of the process is find and replacing the Gridsome specific components and copying the files to the correct directory in Nuxt - which makes most of the transition easy. Unfortunately, until you find and replace _all_ of the components, your site won't render and only shows an error 😅.

## Where to copy files to and file changes to make

The biggest directory adjustment between Gridsome and Nuxt is that while Gridsome uses the `src/` folder similar to Vue (`yourBlog/src/`), Nuxt just puts the subfolders in the project's root directory (`yourBlog/`). Otherwise, you'll still have your `pages/` directory for one off pages (templates will also be moved here, but I'll cover that in a bit), `layouts/` for your repeating layouts, `components/` for your component files, and `static/` for your static files (`static/` isn't in the `src/` folder in Gridsome, but works exactly the same in Nuxt).

I'm going to take a second to call out a very specific part of the transition process that took me longer than it should have to realize the issue - You need to change your `Index.vue` file to be `index.vue` with a lowercase "i". This is also the case for the default layout, which must be `layouts/default.vue`! The only other spot where this came up was if you have a custom 404 page in Gridsome you'll need to rename the page to `error.vue` and move it from your `pages/` directory to the `layouts/` directory.

> You need to change your `Index.vue` file to be `index.vue` with a lowercase "i". This is also the case for the default layout, which must be `layouts/default.vue`!

Now it's time to start finding & replacing!

### Links

The first component we'll replace is `<g-link>` with `<NuxtLink>`. This is a one-to-one replacement with the same options, so no need to change your options around (there may be small exceptions depending on how you're using links to your markdown files).

### Images

Nuxt offers an optional [Image Module (nuxt-img and nuxt-picture)](https://image.nuxtjs.org/), but for the sake of quickly getting things moved over, I didn't fuss with the optional images and used `<img>` tags to replace `<g-image>`. Once again the options are the same, so unless you're also reorganizing your directories or using `../..` pathing to get to your images instead of `~/assets/` you shouldn't have anything to change around!

### Layout

Unlike in Gridsome, Nuxt doesn't require us to import and wrap our pages in a `<Layout/>` tag - so they can all be deleted! If you're using more than one layout, you can specify it in a `NuxtPage.vue` file's script:

```vue
<script>
export default {
  layout: "yourLayoutName",
}

// source: https://nuxtjs.org/docs/directory-structure/layouts
</script>
```

### Updates to SEO metadata

In Gridsome, you have a `metaInfo` object which takes a `title`, `meta` array, and `link` array (and probably more that I don't know of). In Nuxt we don't use an object, but rather a function called `head()` which returns our metadata object. Note that we can also use a computed `meta()` value - from which I'm sending my data to a utility function to process everything into an array of objects (for more specifics on this see the [Redfern.dev blog post](https://redfern.dev/articles/adding-social-media-seo-meta-data-using-nuxt-content/).

```vue
// Nuxt

<script>
export default {
  head() {
    return {
      title: "Posts",
      meta: [
        ...this.meta,
        { name: "twitter:label1", content: "Written by" },
        { name: "twitter:data1", content: "Tyler VanBlargan" },
      ],
      link: [
        {
          hid: "canonical",
          rel: "canonical",
          href: `https://terabytetiger.com/lessons`,
        },
      ],
    }
  },
  computed: {
    meta() {
      const metaData = {
        type: "article",
        title: "Blog",
        description:
          "Terabyte Tiger's articles covering web development topics",
        url: `https://terabytetiger.com/lessons`,
      }
      return getSiteMeta(metaData)
      // Learn more about the getSiteMeta() function here:
      // https://redfern.dev/articles/adding-social-media-seo-meta-data-using-nuxt-content/
    },
  },
}
</script>
```

> Huge thanks to [Redfern.dev](https://redfern.dev/articles/adding-social-media-seo-meta-data-using-nuxt-content/) for the `getSiteMeta()` utility function!

## Moving Markdown Files

Now it's time to move our markdown (`.md`) files - but first a quick issue that I ran into!

In my Gridsome folder structure, I had nested my posts into a few subfolders with subfolders to help organize my topics a bit better. When using our `$content()` function one of the options you can pass in is `{deep: true}` which will return files within subfolders. Unfortunately, this has some complications with the routing portion of the content module and after wrestling with it for a while I decided to avoid complications and keep all my files within a single subdirectory of the content folder.

> I decided to avoid complications and keep all my files within a single subdirectory of the content folder.

### Replacing Gridsome's `/templates/` folder

This was by far the hardest change for me to wrap my head around and figure out why I couldn't get my pages to generate. In Gridsome the dynamic pages that generate on build are located in our `/templates/` folder separate from our `/pages/` folder. In Nuxt, we don't have a second folder for templates and instead we create a folder in our `/pages/` directory and add a `_slug.vue` page in that folder.

Example:

```
// Gridsome Directory Structure
|- src/
   |- pages/
      |- About.vue
      |- Index.vue
   |- templates/
      |- Blog.vue

-------------------------------------------

// Same Structure in Nuxt
/
|- pages/
   |- blog/
      |-_slug.vue // This was our Blog.vue file above
   |- index.vue // Remember: lower case index in Nuxt!
   |- About.vue
```

And now within our `_slug.vue` file we can utilize the content module to create our blog pages!

### Content Module

This part of the migration isn't necessarily the hardest part to figure out (Big credit to the infographics [on the module docs](https://nuxtjs.org/docs/directory-structure/content)), but if you're like me and have multiple slightly different GraphQL queries on your "All Posts" pages in Gridsome, it was a bit tedious to migrate over to the Content Module.

The convenient part of the content module is that it locates itself within the script section of the Vue file and makes linting a lot smoother.

```vue
<script>
// This is my "All Posts" page
export default {
  async asyncData({ $content, params, error }) {
    const lessons = await $content("lessons", { deep: true })
      .only([
        "id",
        "title",
        "description",
        "excerpt",
        "cover_image",
        "path",
        "date_published",
        "emoji",
        "updated",
      ])
      .where({
        published: true,
      })
      .sortBy("date_published", "desc")
      .fetch()
      .catch(() => {
        error({ statusCode: 409, message: "Error Fetching posts" })
      })

    return {
      lessons,
    }
  },
}
</script>
```

And within our `_slug.vue` pages we can grab each page in a similar way:

```vue
<template>
  <article>
    <!-- 
      Pass your const value as the document 
      and it will render automagically!
    -->
    <nuxt-content class="prose" :document="lesson" />
  </article>
</template>
<script>
export default {
  async asyncData({ $content, params }) {
    const lesson = await $content("lessons", params.slug).fetch()
    return { lesson }
  },
}
</script>
```

> Note the `<nuxt-content/>` component that we use to render the article - this automatically pulls out the content of your markdown file and renders it!

You may have noticed that in my `_slug.vue` page I'm not including a `.where()` filter, which means that items with `published: false` **will be generated**. The Content module has an inline editor if you double click inside the `<nuxt-content/>` component while in development mode and I've been playing around with it a bit. There are a [bunch of useful features](https://content.nuxtjs.org/writing/) in the content module and I recommend you check out all it has to offer for markdown content!

> I'm not including a `.where()` filter, which means that items with `published: false` **will be generated**.

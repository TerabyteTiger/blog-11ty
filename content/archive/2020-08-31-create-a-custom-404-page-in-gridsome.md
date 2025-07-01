---
title: How to Create A Custom 404 Page In Gridsome
layout: libdoc_page.liquid
published: true
description: How I created a custom 404 page in Gridsome for my site!
tags:
    - vue
    - webdev
    - gridsome
cover_image: ../../assets/archive/blogImgs/cover-images/gridsome404-DEV.png
date: "2020-08-31"
twitter_image: ../../assets/archive/blogImgs/twitter-images/gridsome404-twitter.png
permalink: "{{ libdocConfig.archiveSlug }}/{{date}}-{{page.fileSlug}}/index.html"
---

The other day I was playing around in [Gravit](gravit.io) and made this:

![the word error with a rainbow gradient and black shadow 3D pop-out effect](../../assets/archive/blogImgs/errorsAllTheWayDown.png)

And thought "Hmmm, I should find something to do with this." I decided it would fit perfectly on my site as the [404 page](https://terabytetiger.com/404).

So let's see how that's done!

## Gridsome's 404.vue file

> add a `404.vue` page to your `src/pages/` folder

By default, navigating to a path that doesn't exist will return a plain page with "404 - not found" in an h1 tag - not particularly interesting or helpful since the user now has to either go back a page or change the URL themselves.

Gridsome makes replacing the default 404 page fairly straightforward - add a `404.vue` page to your `src/pages/` folder.

Besides displaying the error message, I also applied my default layout to the page so that the user could easily get back to a valid page, and so the error page wasn't as jarring.

As of the time of writing, this is the code behind my 404 page:

```vue{codeTitle: "src/pages/404.vue"}
<template>
  <Layout>
    <div class="post max-w-4xl mx-auto text-center">
      <h1>
        404 - page not found
      </h1>
      <p>Oops! That page returns an</p>
      <img
        src="~/assets/errorsAllTheWayDown.png"
        width="500"
        quality="50"
        alt="error text with a rainbow gradient and shadows creating a pop-out 3d effect"
      />
    </div>
  </Layout>
</template>
```

Now that I have some customization in place, I might start experimenting with adding fun elements to turn my 404 page into a bit of an Easter Egg like [DEV's offline page](https://dev.to/offline)!

---

I also made a 'flat' version of the error image which is [available on RedBubble](https://www.redbubble.com/i/sticker/Bubbly-Rainbow-Error-Message-by-12vanblart/55968987.EJUG5)! 👀

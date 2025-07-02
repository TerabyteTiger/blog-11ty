---
title: Why use Gridsome?
published: true
description: Gridsome is a Vue-based Static Site Generator, but why would someone use Gridsome? When is Gridsome best suited for a project? What features and developer quality of life benefits does it offer?
tags:
    - vue
    - beginner
    - gridsome
layout: libdoc_page.liquid
date: "2021-08-02"
cover_image: ../../assets/archive/blogImgs/cover-images/whyGridsome-DEV.png
twitter_image: ../../assets/archive/blogImgs/twitter-images/whyGridsome-Twitter.png
permalink: "{{ libdocConfig.archiveSlug }}/{{date}}-{{page.fileSlug}}/index.html"
---

Gridsome is a Static Site Generator (SSG) that takes heavy influence from [Gatsby](https://www.gatsbyjs.com/) and brings many of the benefits of Gatsby to the Vue ecosystem. But what are those benefits? How do you know if Gridsome is right for your next project?

If any of the following describe your situation, Gridsome might be for you:

-   Want to work with Vue?
-   Need to build a statically generated site?
-   Looking for a solid jump off point?
-   Do you need GraphQL integration?

In this post I'll be breaking down the reasons why a developer would choose Gridsome!

## Vue

Out of the box, Gridsome includes [vue-meta](https://github.com/nuxt/vue-meta), dynamic routing (no more v-router settings to setup for every page!), Single File Component development structure, and more! Whether you're an experienced Vueveloper or dipping your toes in, you'll have access to the power of the ecosystem where you need it while Gridsome handles a lot of the Vue setup management for you.

## GraphQL

One of the keystones to empowering developers leveraging Jamstack architecture, GraphQL is built in to Gridsome, including development tools when running `gridsome develop` at `/___explore` so you can develop and test queries with ease. Regardless if the data is coming from a Content Management System (CMS) like Wordpress, Local markdown files, or APIs - GraphQL can pull the information into the site with a developer-friendly approach.

## Starters

When starting a new project, it can be overwhelming to start with a completely blank project - especially when using a new framework with a particular folder structure. [Gridsome Starters](https://gridsome.org/starters/) are templates projects developed by other developers and available for use as a starting point to get your site up and running quickly. Many of the starters even include a quick start readme to get the settings pages updated and ready to roll so you don't have to track down what setup is needed to get working on your new project!

## Plugins

While Gridsome offers some amazing functionality up front, there are often times you want to extend the base functionality - from simplifying the process of hooking in to a data source to [adding sitemap generation](https://gridsome.org/plugins/@gridsome/plugin-sitemap). Plugins are the way for developers to create extensions of Gridsome that can hook in and easily add additional functionality to your site.

[Click here to see all Gridsome Plugins](https://gridsome.org/plugins/)

## SEO & Speed

As with other Jamstack frameworks, one of the biggest benefits to Gridsome is the inclusion of SEO considerations and setup behind the scenes to help keep your pages SEO optimized and ready to include all the SEO information you'll need to rank highly in Google Search results.

But SEO isn't just SEO anymore - recently Google started leaning more heavily into loading speeds being a factor in page rankings. Since Gridsome is a Static Site Generator, the pages will load exceptionally fast out of the box and help keep your Lighthouse scores green and healthy!

## Conclusion

As you can probably tell, I'm a huge fan of Gridsome because of how well it streamlines handling some tricky development problems around data and configurations. If you have questions or have been inspired to give Gridsome a try, I'd love if you let me know on [Twitter](https://twitter.com/terabytetiger)! Have fun!

[Click here to see the full Gridsome docs and learn more about the benefits of Gridsome!](https://gridsome.org/docs/)

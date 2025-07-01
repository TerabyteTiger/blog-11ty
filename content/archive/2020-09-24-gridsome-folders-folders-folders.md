---
title: Intro to Gridsome's Folder Structure
layout: libdoc_page.liquid
published: true
description: Outlining the differences between the many folders of Gridsome's file structure.
tags:
    - Gridsome
    - Vue
    - Beginner
    - Javascript
date: "2020-09-24"
cover_image: ../../assets/archive/blogImgs/cover-images/foldersfoldersfolders-DEV.png
twitter_image: ../../assets/archive/blogImgs/twitter-images/foldersfoldersfolders-Twitter.png
permalink: "{{ libdocConfig.archiveSlug }}/{{date}}-{{page.fileSlug}}/index.html"
---

## What is a Static Site Generator?

Static site generators (SSG) are utilities/frameworks that allow you to write your website in your preferred language and then compile your code down to efficient HTML/CSS/JS. You may even have heard of some popular generators such as [Gatsby](https://www.gatsbyjs.com/), [Jekyll](https://jekyllrb.com/), [Hugo](https://gohugo.io/), or [VuePress](https://vuepress.vuejs.org/)!

The general flow for static sites is:

1. Write your code in a base folder (i.e. `src/`)
2. Run a build command (i.e. `gridsome build`)
3. Deploy the static output folder (i.e. `dist/`)

In this post, we're going to break down the different folders in a Gridsome Project!

_Folder names may vary by Static Site Generator_

## Folders, Folders, Folders

The biggest barrier that I see with Static Site Generators as a whole are the folder structures used and understanding which folder is for what functionality.

In particular, the distinction between `src/layouts` and `src/templates` can be quite confusing since they're fairly similar in concept, but very different in use and output.

The two most important folders to note for Gridsome are `src/` and `dist/`.

### dist

When you first start a new project, you won't have a `dist/` folder since that's Gridsome's output folder. The code that ends up in `dist/` after running `gridsome build` is the code you'll want to deploy to users.

### src

The `src` folder is where you'll be writing most of your code. This is the folder that Gridsome will compile down into the `dist` folder when you run `gridsome build`!

### static

The `static` folder stands out from the rest of the items on this list because it's the only one that isn't located in the `src` folder, but still have special functionality.

The `static` folder is used to tell Gridsome that everything inside is off limits for the compiler and it should se sent directly to `dist/`. Do not pass GO. Do not collect \$200.

![Kuzko from The Emperor's new groove saying "No Touchy" while making karate gestures at Kronk](https://media.giphy.com/media/DkaZuJGcwwN32/giphy.gif)

### src/components

Since we're working with Vue, we want to be able to leverage the power of component-based frameworks. The `src/components` folder is where you can build your components to drop into your pages, layouts, and/or templates later!

Files in this folder will use the `.vue` file extension and be structured as [Single File Components](https://vuejs.org/v2/guide/single-file-components.html).

### src/layouts

Let's get this out of the way - _technically_ you don't need to use the `src/layouts` folder. It's a best practice to use it so that you can easily find and modify your layout ~if~ when changes are needed.

Layouts at their base are `.vue` file extension Single File Components, but with the understanding that these components will include at least one [`<slot/>` component](https://vuejs.org/v2/api/#slot) and be used as a general structure for your pages - think a header, footer, and sidebar that will be the same on every page.

> Don't forget to import and wrap your pages in your `` component!

### src/pages

The TL;DR for `src/pages` is any one off page that you want to add. For example:

- Home page
- About page
- Uses page
- Contact page
- Blog index page

The slightly longer summary is any page that you want to tweak the contents/layout of without impacting any other pages.

### src/templates

If you're familiar with Static Site Generators, this is the section you've probably been waiting for - where to pass in your data and spit out a bunch of pages!

The key piece here is that you can add a `<page-query>` to your `.vue` file which will wrap a GraphQL query allowing you to access your data to generate your pages!

Combining this with plugins such as [`@gridsome/source-filesystem`](https://gridsome.org/plugins/@gridsome/source-filesystem) to work with local markdown files, you can generate your pages.

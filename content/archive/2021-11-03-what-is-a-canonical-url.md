---
title: "Intro to SEO | What is a Canonical URL?"
description: "Introduction to Canoncial URLs answering questions such as 'What is a canonical URL?', 'How do I use a canonical URL?', and 'When do I need a canonical URL?'"
layout: libdoc_page.liquid
published: true
cover_image: ../../assets/archive/blogImgs/cover-images/canonicalURL-DEV.png
date: "2021-11-03"
twitter_image: ../../assets/archive/blogImgs/cover-images/canonicalURL-DEV.png
permalink: "{{ libdocConfig.archiveSlug }}/{{date}}-{{page.fileSlug}}/index.html"
series: Intro to SEO
tags:
    - seo
    - webdev
    - blogging
---

## What is a canonical URL?

We live in a world where information is posted, shared, re-shared, listicled, compiled, tweeted, re-blogged - I could go on. With so many copies of the same article existing on the internet, this presents an interesting issue for Search Engines: How do Search Engines know the original source of the post?

Canonical URLs are a way to indicate where the original post came from.

## What are the benefits of a canonical URL?

The high level response to this question is "SEO Benefits" - but let's look at a more detailed level.

If canonical URLs didn't exist and you posted an article on your blog, DEV, and Hashnode search engines would find themselves in a predicament when trying to serve your article to a search query - how do they know which to serve? Instead of getting "full credit" for your post, each post would have their own search result profile and in turn look like spam to search engines - effectively resulting each fighting with each other for ranking and dragging each other down the results page.

Thanks to canonical URLs, search engines don't need to assume the posts are all spam and can properly serve the original post to users searching for information - returning to a situation where the original post is claiming full credit!

## When to use a canonical URL?

Based on the description of the benefits, you can probably guess that any time you post your post on another platform you'll want to include a canonical URL linking back to your blog (or wherever you want the "True source" to be coming from).

Not as intuitive is that you also want to include the canonical URL back to the original source _on the original source's page!_ This essentially functions as an extra indicator to search engines that you are in fact the original source that other sites are claiming you are!

## How to use a canonical URL

Now we know what a canonical URL is - so how do we use one?

If you're working with a personal site and can alter the HTML, you'll want to include the following in your `<head>`:

```html{codeTitle: "index.html"}
<head>
  <link rel="canonical" content="https://yourdomain.com/slug/path/whatever/" />
</head>
```

Replacing the `https://yourdomain.com/slug/path/whatever/` with the full URL to your post! If you're working with a Static Site Generator there are ways to help automate the setting of these values - [Example of setting canonical URL in Gridsome](https://terabytetiger.com/lessons/gridsome-seo-improvement-checklist/#set-a-canonical-url)

On sites like DEV or Hashnode, there are also ways to create these links back - usually under names such as "Original Source", "Canonical URL", or "Reposting from".

🙏🏻 Go forth and Repost! 🙏🏻

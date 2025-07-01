---
title: How to Fix Vuex Unknown Mutation Type Error
published: true
description: A common spelling typo gotcha that can cause a `[vuex] Unknown mutation type:` error.
tags:
    - vuex
    - mutations
    - byte-sized
layout: libdoc_page.liquid
date: "2022-06-29"
permalink: "{{ libdocConfig.archiveSlug }}/{{date}}-{{page.fileSlug}}/index.html"
---

<h2 id="tldr"> <a href="#tldr" aria-describedby="fn-1">TL;DR</a></h2>

Double check you spelled it `mutations:` and not `mutation:`

## Specifics

### Error

Despite basing my new vuex module off of another file that was working, I was getting an error in my console - `[vuex] unknown mutation type:`. 

### My Typo

When retyping the file setup, I had typed `mutation:` instead of `mutations:` - causing vuex to be unable to find my mutation! 

<ol>
  <li id="fn-1"> Too Long Didn't Read</li>
</ol>

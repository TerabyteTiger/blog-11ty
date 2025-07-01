---
title: Always check your versions!
layout: libdoc_page.liquid
published: true
date: "2025-03-19"
permalink: "{{ libdocConfig.archiveSlug }}/{{date}}-{{page.fileSlug}}/index.html"
description: "Just a reminder to double check your versions when you run into a weird error on the server and not on your machine"
tags:
    - Servers
    - Node.js
---

Did you know that `String.Prototype.replaceAll()` was added in Node v15? Because as of this morning I do!

After weeks of daily emails only sending periodically, I finally zeroed in on the issue - I was on Node version 16 and the server was on 14 for developing this script. It was a tricky issue to diagnose since the emails were sending _sometimes_ - but last night my error logging finally caught the issue in the act and I was able to trace that the issue was with a `String.replaceAll()` - hmm that's odd, I've _surely_ used `replaceAll()` in my scripts before 🤔

As it turns out, this was the first time I had set up a script to use `replaceAll()` on _this_ server. When you run into a weird dev machine vs server error, don't forget to check your versions (and maybe even check them periodically just to be safe).

<sticky-note content='Note to self: Check versions!'>
</sticky-note>

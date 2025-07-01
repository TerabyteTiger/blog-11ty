---
title: 3 takeaways from my experience as a Technical Reviewer
layout: libdoc_page.liquid
published: true
description: Things I wish I had done differently as a first-time technical reviewer.
tags:
    - books
cover_image: ../../assets/archive/blogImgs/cover-images/technical-reviewer-takeaways-DEV.png
date: "2020-11-04"
twitter_image: ../../assets/archive/blogImgs/twitter-images/technical-reviewer-takeaways-Twitter.png
permalink: "{{ libdocConfig.archiveSlug }}/{{date}}-{{page.fileSlug}}/index.html"
---

Recently I had the incredible opportunity to work as a technical reviewer for [Packt](https://www.packtpub.com/) reviewing chapters from [Vue.js 3 Cookbook](https://www.packtpub.com/product/vue-js-3-cookbook/9781838826222). I'll be working on a review of the book itself soon™, but for now I want to touch on my experience to hopefully make things smoother for anyone going into the process!

## 1 - Technical Reviewing is really debugging

About halfway through my first chapter, I realized I was highlighting a lot of grammatical issues - so I double checked with the Project Manager and it turns out I should only review that the code worked!

> "Perfect! That means it'll only take me like an hour tops per chapter!" - Me 4 hours before finishing my first chapter.

I thought this would mean the process would be a quick copy/paste the code from the book.

For some chapters, this would hold true. But for the others... Holy wow was I wrong!

There were a few code blocks where it seems like the author forgot to change the name of a variable or two (who hasn't been there before) and trying to debug exactly what was going on was quite the challenge!

## 2 - Ask for the author's repo up front

A few chapters in, I reached a pattern I had previously not seen for handling routing. After spending 30 minutes on it, I eventually moved on and handled the rest of the chapter only to come back and spend another hour on the unfamiliar pattern.

Still unable to solve the puzzle, I reached out to the project manager to request a code sample for that section from the author. Instead of just that code block, they ended up sending the full repo of code from all the chapters of the book, and **what a lifesaver that turned out to be**.

In a few other segments, that repo would save me time by offering a clear look at what the author was intending - at which point I would note how the author could make the instructions more clear and I was on my way again.

## 3 - Schedule a feedback gap after the first chapter

Due to the pandemic, the normal schedule of a chapter every few weeks got thrown for a loop and I received most of the chapters I needed to review immediately and the review cycle was every 3 days I was to send a chapter back to them.

In retrospect, I wish I had pushed back to create a gap between the first chapter and the second chapter to allow wiggle room with asking questions about the process during the first chapter. It worked out without it, but I was nervous going into the project and would have appreciated a window for feedback before jumping into more chapters for review (Hello, imposter syndrome, my old friend 👋).

## Conclusion

Overall, I think my first technical book review was a fairly positive experience - although probably won't be something I do again for a while since it ate up a lot of my free time. That said, it was a rewarding challenge to work through someone else's tutorials with the goal of improving the quality for readers following along more easily when the book releases!

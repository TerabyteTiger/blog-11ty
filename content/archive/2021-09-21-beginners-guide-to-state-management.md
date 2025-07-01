---
layout: libdoc_page.liquid
cover_image: ../../assets/archive/blogImgs/cover-images/stateManagementBeginnersGuide-DEV.png
date: "2021-09-21"
twitter_image: ../../assets/archive/blogImgs/cover-images/stateManagementBeginnersGuide-DEV.png
permalink: "{{ libdocConfig.archiveSlug }}/{{date}}-{{page.fileSlug}}/index.html"
title: Beginner's guide to state management
published: true
description: What is state management and what problem does state management solve for developers building an application?
tags:
    - beginner
    - codeNewbie
---

## What is state management?

State management is the idea of maintaining a status of an application, preferably in a way so that when one part of the application makes a change to the application (changing the state of the application), the rest of the application is aware of the new changes.

## What problem does state management solve?

Consider this example: Your younger brother has played a prank on you and set your name as "John Doe" in one of the applications you use. You head to the user profile and update the account back to your name, but when you return to the homepage, you're still greeted by the message "Hello, John Doe 👋🏻"

Did you really save the changes? Are you not actually able to correct the name change?

By using state management, the application should have been able to start showing your updated name even though the change was made on another page. Not only would better state management prevent this potential user confusion - it could also indicate that other parts of the application may not work as intended!

Another instance where state management commonly comes into play is developing with component-based architecture (e.g. Vue or React). If one component needs to talk to another component on a different page (or even the same page for that matter), using a state management system can ease the headache attached with such a task!

### State Management for frameworks

- [Vuex](https://vuex.vuejs.org/) for Vue
- [Redux](https://redux.js.org/) for React (This is usable with other JS frameworks as well, but is often the recommended option for React)
- [svelte/store](https://svelte.dev/docs#svelte_store) for Svelte

## A real world example of state management

Consider this example from my recent [13Kjs gamejam entry - Spacebar's Space Bar](https://github.com/TerabyteTiger/spacebar-space-bar/blob/master/game.js)

```js
let state = {
  ingredients: {
    //... Removing for brevity
  },
  money: 15,
  debt: 150,
  interest: 0,
  difficulty: "short",
  day: 0,
  message: "",
  customersToday: 0,
  customersScheduled: 2,
}
```

This is the first thing I do in my `game.js` file, creating an initial state for the application to exist in and use. A little later on I define the function `updateMoney()` which updates the user interface to show the amount of money on hand.

```js
function updateMoney() {
  document.querySelector("#money").innerHTML = state.money
}
```

Now, regardless of how the user is gaining/spending money, afterwards I call `updateMoney()` and the user's amount will be updated to reflect their new amount of money. I even use the state for when the user shares their victory on Twitter using the end screen's share button!

```js
function shareVictory() {
  // share to twitter using the twitter intent to tweet url config
  window.open(
    `https://twitter.com/intent/tweet?text=I%20just%20beat%20Spacebar%27s%20Space%20bar%20on%20${state.difficulty}%20in%20${state.day}%20days%21%20Can%20you%20finish%20faster%3F%20%0A%0ACreated%20by%20%40terabytetiger%0A%0Ahttps%3A%2F%2Fspacebar.terabytetiger.com%2F`,
    "newwindow",
    "width=500, height=300, top=" +
      (window.innerHeight - 300) / 2 +
      ", left=" +
      (window.innerWidth - 500) / 2
  )
}
```

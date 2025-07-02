---
title: Creating a rainbow in Vue using v-for
layout: libdoc_page.liquid
published: true
description: Learn how to use an array of colors with v-for to generate a colored pattern.
cover_image: ../../assets/archive/blogImgs/cover-images/vue-rainbow.png
tags:
    - vue
date: "2019-08-28"
twitter_image: ../../assets/archive/blogImgs/cover-images/vue-rainbow.png
permalink: "{{ libdocConfig.archiveSlug }}/{{date}}-{{page.fileSlug}}/index.html"
---

This post will cover:

-   A brief overview of `v-for`
-   Using `v-for` to display items from an array
-   Adding alternating colors to the items
-   Adding multiple colors to the items

_Note: I'll be using `<template>` syntax for all code snippets here_

### Demo

Example of the final components that will be covered:

<a class="dev" href="https://codesandbox.io/s/v-for-example-zeusm">Codesandbox</a>

## V-for Intro

Within Vue, often you will find yourself wanting to display a list of items. Vue has an elegant solution which allows you to repeat an HTML block utilizing the `v-for` directive ([Vue's v-for Full Documentation](https://vuejs.org/v2/guide/list.html)).

This is what a general template for `v-for` would look like for an array of item objects:

```html
<ul>
    <li v-for="(item, index) in itemList" v-bind:key="index">
        {{index}} - {{item}}
    </li>
</ul>
```

Which will look like this:

<a class="dev" href="https://codesandbox.io/s/v-for-example-he36t">Codesandbox</a>

Three points to note about this code snippet:

1. `index` doesn't need to be imported, but doing so will enable you to easily reference where in the array the current item is .
1. Often `v-bind:` will be shortened to simply `:`. In this case `v-bind:key="index"` can be written as `:key="index"`
1. The `key` is used as an identifier for Vue so that if an item in your list needs to be re-rendered, it can update only the specific item(s) that need it instead of the entire list every time!

For a more detailed introduction to `v-for`, I highly recommend checking here:

<a class="dev" href="https://dev.to/vuevixens/hands-on-vuejs-for-beginners-part-4-324l">Hands on Vue.js for Beginners part 4</a>

## Building the Components

Now that we have a list of items displayed (see above example) we'll add static CSS (which we will build upon in future components).

### Static Color Component

Before we get into the fancy work, we are going to start with the basics. Due to what we will be doing in the next two components, we're going to add the following to our `<li>` element:

```diff
<li
    v-for="(item, index) in itemList"
    v-bind:key="index"
+   v-bind:style="{
+       backgroundColor: 'firebrick',
+       color: 'white'
+   }"
>

// I also added the following to the to make it feel less dense //
<style>
+li {
+  padding: 5px;
+}
</style>
```

Let's review our changes line by line:

`v-bind:style="{` - This creates a vue binding for style, which allows us to reference our data and/or item values for setting our style. In this case, we will be using [Object Syntax](https://vuejs.org/v2/guide/class-and-style.html#Object-Syntax-1).

`backgroundColor: 'firebrick',` - Vue uses camelCase for CSS properties instead of kebab-case. For now, we are statically setting our property value to 'firebrick'

`color: 'white'` - Similar to background color, we are statically assigning our font color to 'white'.

`}"` - Close our object!

At this point, our component will look like this:

<a class="dev" href="https://codesandbox.io/s/v-for-example-tshp5">Codesandbox</a>

### Alternating Colors Component

Now, let's spice it up and alternate colors! For the first example, we're going to alternate between `rebeccapurple` (`#663399`) and `firebrick` (`#B22222`) using an array with our colors. For demonstration purposes, I'll be mixing a hexcode with a CSS color name.

`<template>` updates:

```diff
<li
    v-for="(item, index) in itemList"
    v-bind:key="index"
    v-bind:style="{
-       backgroundColor: 'firebrick',
+       backgroundColor: colors[index % 2],
        color: 'white'
    }"
>
```

`<script>` updates:

```diff
data() {
    return {
-       itemList: ["Item A", "Item B", "Item C", "Item D", "Item E"]
+       itemList: ["Item A", "Item B", "Item C", "Item D", "Item E"],
+       colors: ["rebeccapurple", "#B22222"]
    };
}
```

Line by line review:

`colors: ["rebeccapurple", "#B22222"]` - Create an array of colors we would like to cycle through for our background color. Note that unlike in CSS, these need to be wrapped in `"` to set the values as a string.

`backgroundColor: colors[index % 2]`

-   `index % 2` - If you've never seen the [Modulo (or Remainder)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators#Remainder) operator before, this might look strange to you. What happens here is the number after the `%` is removed from the number before it until it cannot be subtracted out and result in a non-negative number.

i.e) `7 % 3` => `7 - 3 = 4` => `4 - 3 = 1` => 3 cannot be removed from 1, so `7 % 3` will return `1`

-   `backgroundColor: colors[index % 2]` - The background color will be set based on what value is returned from our colors array. In this case, colors[0] will return `rebeccapurple` and colors[1] will return `#B22222`.

Current State:
<a class="dev" href="https://codesandbox.io/s/v-for-example-dn9cb">Codesandbox</a>

### Rainbow Component

Now that we have our alternating colors setup, we can make 2 minor tweaks to our code to alternate through as many colors as we want!

`<template>`

```diff
<li
    v-for="(item, index) in itemList"
    v-bind:key="index"
    v-bind:style="{
-       backgroundColor: colors[index % 2],
+       backgroundColor: colors[index % colors.length],
        color: 'white'
    }"
>
```

`<script>` updates:

```diff
data() {
    return {
-       itemList: ["Item A", "Item B", "Item C", "Item D", "Item E"],
+       itemList: ["Item A", "Item B", "Item C", "Item D", "Item E","Item A", "Item B", "Item C", "Item D", "Item E"],
-       colors: ["rebeccapurple", "#B22222"]
+       colors: ["rebeccapurple", "#B22222", "black", "navy", "green"]
    };
}
```

Line by line review:

```
colors[index % colors.length]
```

Here, we replaced 2 with `colors.length` which will use the length of our `colors` array to determine how many colors we would like to cycle through.

```
itemList: ["Item A", "Item B", "Item C", "Item D", "Item E","Item A", "Item B", "Item C", "Item D", "Item E"]
```

Here, I'm doubling the list of items for demonstration purposes 😉

```
colors: ["rebeccapurple", "#B22222", "black", "navy", "green"]
```

This adds `black`, `navy`, and `green` to our list of colors to cycle through.

Final State:
<a class="dev" href="https://codesandbox.io/s/v-for-example-bu9i1">Codesandbox</a>

## Closing Remarks

This post is brought to you by my work on https://gridsomeairtable.netlify.com/ where I'm using this technique on the Events page to cycle through the yellow, blue, and red borders!

<a class="github" href="https://github.com/12vanblart/gridsome-airtable-starter"> GitHub: Gridsome-Airtable-Starter </a>

**If you use this technique somewhere, I'd love if you would comment below or [tweet a link to me](https://twitter.com/TerabyteTiger) so I can check it out!**

---
title: "Moving from Vue 2's Option API to Vue 3's Composition API"
layout: libdoc_page.liquid
published: true
cover_image: ../../assets/archive/blogImgs/cover-images/vue3migration-DEV.png
date: "2021-09-29"
twitter_image: ../../assets/archive/blogImgs/cover-images/vue3migration-DEV.png
permalink: "{{ libdocConfig.archiveSlug }}/{{date}}-{{page.fileSlug}}/index.html"
description: Quick introduction to help migrate from the Vue 2 options API to Vue 3's Composition API.
tags:
    - vue
---

Since Gridsome recently hinted that it would be [considering Vite + Vue 3 with the 1.0 release](https://twitter.com/gridsome/status/1436343468717191172), I've started poking around the [Vue 3 docs](https://v3.vuejs.org/) to start figuring out this fancy new composition API. Specifically the [Vue 2 to 3 migration guide](https://v3.vuejs.org/guide/migration/introduction.html) is where I started. While this does a great job at highlighting breaking changes and addressing those, it doesn't really highlight transitioning Single File Components from V2's Option API to V3's Composition API (at least not in a way that I could easily process).

This is me creating my own cheat sheet to hopefully help me with the transition.

## What is script setup?

With the release of Vue 3, the big new feature that everyone is talking about is the composition API, which includes a function called `setup()` which is kind of like a rollup of the script export from V2 Single File Components (e.g. props, data, methods, etc...).

As the Vue team does, they realize that in most scenarios, you'll be needing to type out `setup(props, context) { //component stuff// }` and created a nice syntactic sugar and allow you to use `<script setup>`. For the purposes of this post, I'm going to be using `<script setup>` because that's how I intend to write 99%+ of my components (and is [the recommended way to write new SFC components](https://github.com/vuejs/rfcs/discussions/378#discussioncomment-1197332)).

## How to convert my data function to the Vue 3 Composition API?

With the Composition API if we want something to be reactive, we declare it as a variable (let or const) and use `ref()`. to declare that value as reactive (Other variables can be declared and used within the script tag also, they just don't get the coolio Vue features).

So instead of having:

```vue {codeTitle: "Vue-2/Component.vue"}
<!-- Vue 2.x -->
<script>
export default {
  data() {
    return {
      messageToUser: "Hello, welcome to our app! 👋🏻",
      buttonClicks: 0,
    }
  },
}
</script>
```

We have:

```vue {codeTitle: "Vue-3/Component.vue"}
<!-- Vue 3 Composition API -->
<script setup>
// We need to import the Vue Functions we need:
import { ref } from "vue"
const messageToUser = ref("Hello, welcome to our app! 👋🏻")
const buttonClicks = ref(0)

// Note that ref() creates an object and you can use
// variable.value to refer to the value in your <script setup>

// {{ buttonClicks }} will still work like in Vue 2
// in our <template>

console.log(buttonClicks.value)
// logs 0 to the console
</script>
```

> Note that `ref()` creates an object and you can use `variable.value` to refer to the value in your `<script setup>`, but `{{ buttonClicks }}` will still work like in Vue 2 in our `<template>`.

## How do I use props in the Vue 3 Composition API?

Within script setup, a function called `defineProps()` can be used in two ways to create . Consider the following Component call:

```vue {codeTitle: "src/App.vue"}
<!-- Vue 2.x or 3.X -->
<!-- Parent Component Reference to child component-->
<template>
  <Component msg="Hello World!" :start="4" />
</template>
```

And how we would use props in Vue 2.X:

```vue {codeTitle: "Vue-2/src/components/Component.vue"}
<!-- Vue 2.x -->
<!-- Child Component -->
<script>
export default {
  props: ["msg", "start"],
}
</script>
```

In Vue 3, we can define our props using `defineProps()` like this if we don't need to reference them for any JavaScript:

```vue {codeTitle: "Vue-3/src/components/Component.vue"}
<!-- Vue 3 -->
<script setup>
defineProps({
  msg: String,
  start: Number,
})
</script>

<!-- This is now usable as {{ msg }} like in Vue 2! -->
```

But if we want to create a reactive value `count` that starts at our `start` prop value we can do:

```vue {codeTitle: "Vue-3/src/components/Component.vue"}
<!-- Vue 3 -->
<script setup>
const props = defineProps({
  msg: String,
  start: Number,
})

const count = ref(props.start)
// Updating count will be covered shortly in the methods section 😄
</script>

<!-- {{ msg }} is still usable in our template as in Vue 2! -->
```

**If you aren't using `<script setup>` make sure you look into the difference between `toRef()` and `toRefs()` [in the docs](https://v3.vuejs.org/guide/composition-api-setup.html#props)**

## Where do my methods go in the Vue 3 Composition API?

Similar to our data function, the methods object is no more! Now we can declare our functions as a `const` and call it the same as in Vue 2.X!

In Vue 2 we would use:

```vue {codeTitle: "Vue-2/src/components/Component.vue"}
<!-- Vue 2.X -->
<!-- Child Component -->
<template>
  <div>
    <h1>{{ msg }}</h1>

    <button type="button" @click="doubleCount()">
      The current count is: {{ count }}
    </button>
  </div>
</template>

<script>
export default {
  props: ["msg", "start"],
  methods: {
    doubleCount: function () {
      this.count = this.count * 2
    },
  },
}
</script>
```

In Vue 3 we can do:

```vue {codeTitle: "Vue-3/src/components/Component.vue"}
<!-- Vue 3 -->
<template>
  <!-- Note that we don't need the wrapper div! -->
  <!-- Vue 3 auto fragments for us! -->
  <h1>{{ msg }}</h1>

  <button type="button" @click="doubleCount()">
    The current count is: {{ count }}
  </button>
</template>

<script setup>
import { ref } from "vue"

const props = defineProps({
  msg: String,
  start: Number,
})

const count = ref(props.start)
const doubleCount = () => {
  return count.value * 2
}
</script>
```

## How do I use computed values in the Vue 3 Composition API?

Similar to how we can now use `ref()` to define a variable as reactive, we can use a new `computed()` function to define a variable as a computed value.

Consider if we wanted to show users what the new count value would be before they clicked the button.

In both Vue 2.X and Vue 3 we can update our child component's template to be:

```vue {codeTitle: "src/components/Component.vue"}
<!-- Vue 2.X or Vue 3 Child Component -->
<template>
  <!-- In Vue 3 the wrapper div is optional -->
  <div>
    <h1>{{ msg }}</h1>

    <button type="button" @click="doubleCount()">
      The current count is: {{ count }}
    </button>

    <p>
      If you click the multiply button, the new value will be {{ futureValue }}
    </p>
  </div>
</template>
```

In Vue 2.X our script will look like this:

```vue {codeTitle: "Vue-2/src/components/Component.vue"}
<!-- Vue 2.X Child Component -->
<script>
export default {
  props: ["msg", "start"],
  data() {
    return {
      count: 0,
    }
  },
  methods: {
    doubleCount: function () {
      this.count = this.count * 2
    },
  },
  mounted() {
    this.count = this.start
  },
  computed: {
    futureValue: function () {
      return this.count * 2
    },
  },
}
</script>
```

And in Vue 3 our script will look like this:

```vue {codeTitle: "Vue-3/src/components/Component.vue"}
<!-- Vue 3 Child Component -->
<script setup>
import { ref, computed } from "vue"

const props = defineProps({
  msg: String,
  start: Number,
})

const count = ref(props.start)

const doubleCount = () => {
  count.value = count.value * 2
}

const futureValue = computed(() => count.value * 2)
</script>
```

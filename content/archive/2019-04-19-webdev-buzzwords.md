---
title: "Crash Course: WebDev Buzzwords"
published: true
tags:
    - beginner
    - webdev
date: "2019-04-19"
description: Explaining frequently used web development keywords and phrases in a beginner friendly way
layout: libdoc_page.liquid
permalink: "{{ libdocConfig.archiveSlug }}/{{date}}-{{page.fileSlug}}/index.html"
---

## Intro

As a Webdev beginner, you'll hear a lot of words thrown around by the more seasoned folks and find yourself swimming in a pool of buzzwords. What's worse is that when you start trying to distinguish between them, you find your list is getting longer and longer, and all you've done is look at the "What is {Buzzword}" landing page!

Look no further! I'll break down some Javascript household names into beginner friendly language.

## The Buzzwords

### API (Application Programming Interface)

When working on the web, you'll be writing HTML, CSS, and Javascript. As long as everything is happening within your site, there are no issues,but what if you want to pull some information from another applications database? This is where APIs come in! APIs provide guidelines for you to request information from another location and offer a way to communicate between programs, even if they are written in different languages!

[Learn More about APIs](https://medium.com/@perrysetgo/what-exactly-is-an-api-69f36968a41f)

#### SOAP vs REST

> "SOAP is squeaky clean. REST is for people that like sleep"

SOAP and REST are protocols for creating APIs. The way it was explained to me is that SOAP has a more strict list of rules while REST is like the Wild West (every API gets to set its own rules). This is because SOAP is a set of interactions that can get your data, while REST lets you grab the data and do what you need with it.

Most likely, you'll spend more time working with REST APIs as my understanding is that SOAP is primarily delegated to legacy code.[Learn More about SOAP vs REST](https://www.guru99.com/comparison-between-web-services.html)

---

### Framework

You've most likely heard of frameworks but may not have realized it was a framework (e.g. React, Angular, and Vue).

_Analogy time!_

Imagine you're sitting in Math class and asked to draw a graph of `y=x` on one of 3 pieces of paper in front of you (blank, college ruled, graph paper).

If you would use a blank piece of paper to achieve this, that would be like using no framework or programming language. There's no guidance other than remaining within the physical bounds of the paper.

If you used college-ruled paper, you've added a programming language. One of your axes will be able to follow the pre-drawn lines, but outside of that, you're on your own.

Finally, using the graph paper is adding a framework to your programming language. With the assistance of the graph paper, your graph will be much cleaner and easier to draw.

#### Components

Many modern frameworks utilize something called "Components", which are reusable pieces of code. Imagine a website with 3 pages, but you want to add the same Header to every page. One way to do this would be to copy and paste your header's HTML for each page. > But what if you need to update part of the header? To update the header, you would need to go to each page and make the same adjustment. This might not be a huge issue for a 3-page site, but what if your site was 100 pages? That's where components come in! If you build your navbar as it's own component file, you can import it into each page of your site as you build it and end up with something like this:

```jsx
// page1
// import navbar statement
<navbar />
```

```html
// page2 // import navbar statement <navbar />
```

```html
// page3 // import navbar statement <navbar />
```

```jsx
//navbar file
`<nav>
  <ul>
    <li>
      <a href="#">
        <h1>Clever Site Name!</h1>
      </a>
    </li>
  </ul>
</nav> `;
// Export navbar statement
```

Now when you need to change your navbar from being `Clever Site Name!` to `Cool Site Name!` you can do it by only adjusting the single line of the navbar file instead of adjusting each page individually!

#### React/Angular/Vue/Ember

Cool! So how do you use components? That's where React, Angular, Vue and Ember come into the picture. They are all frameworks that allow you to create components and build websites/apps using your components. They each have differing opinions about how you should create components, but they all help you achieve the same goal. There are some nuances to why you would choose one over the other, but when it comes to picking which you want to dive into, I recommend trying each of them and deciding for yourself.

Docs: [React](https://reactjs.org/) | [Angular](https://angular.io/) | [Vue](https://vuejs.org/) | [Ember](https://emberjs.com/)

##### Gatsby & Friends

![](../../assets/blog/400/TheCloudAteMyImage400.png)

(The following holds true for any of the three frameworks above. Gatsby pertains to React, but feel free to swap Gatbys for Gridsome and React for Vue \[Or any other child/parent framework pair that you want])

As you work with React, you'll find that there are certain things that require a lot of frustration and setup to get working. Gatsby is a React-based framework that helps ease these frustrations by offering pre-configured setups so you don't have to figure it out yourself.

Docs: [Gatsby](https://www.gatsbyjs.org/) | [Gridsome](https://gridsome.org/) | [Other Static Site Generators](https://www.staticgen.com/)

#### Node.js

So you can use Javascript on your site to add interactions, but what if you wanted to also use Javascript for your server?

**Node.js is here to help!**

While not usually referred to as a framework, Node is very similar. It gives a set of guidelines and does the background legwork for you to get your server up and running.

[About Node.js](https://nodejs.org/en/about/)

##### npm (Node package manager)

`npm explain`

npm is a command line tool that is used to easily manage dependencies for your project. It allows you to run a command as simple as `npm install react` to add everything you need to add React to your project, including any npm packages that React relies on to do React things!

_Note that there are a lot of nuances to using npm, this is just a very high-level overview._

[Learn more about npm](https://nodesource.com/blog/an-absolute-beginners-guide-to-using-npm/)

#### Electron/Nativescript/React Native

Okay, okay. So We've got JS on the front end adding functionality. We've got JS on the back end running the server. _What else can we use JS for?_

As it turns out, basically everything.

Electron lets you build desktop applications in JS that can be run on Linux, Windows, and even macOS! Once you've written your Javascript, Electron takes your code, performs some voodoo magic on it, and spits out an application! These apps can get popular. Perhaps you've heard of one called VS Code?

Nativescript and React Native let you do the same magic to convert Javascript to iOS and Android deployable apps.

_Note:Even though JS is used for Electron, Nativescript, React Native, and Node.js, they do require different rules when developing them. Sadly it isn't as easy as: write your website, run 3 commands on it, and suddenly you have an iOS app, Android App, and Desktop app. That's where PWA's come in!_

Docs: [Electron](https://electronjs.org/) | [Nativescript](https://www.nativescript.org/) | [React Native](https://facebook.github.io/react-native/)

#### PWA (Progressive Web App)

Progressive web apps are a very new feature for web developers. While they can take a bit to get up and running the first time, what they do is really cool! They let you take your website and save it as an app for whichever platform you're on (macOS support coming soon)!

I think PWAs are best described as the next evolution of bookmarks.

> For an example on how these work, you can open Chrome's `...` menu for [dev.to](https://dev.to) and click `Install DEV community...`

Learn More: [Google's Guide to PWA's](https://developers.google.com/web/progressive-web-apps/) | [Free Code Camp](https://medium.freecodecamp.org/progressive-web-apps-101-the-what-why-and-how-4aa5e9065ac2)

---

### JAMstack

> Why are bloggers always talking about PB&J?

JAM is an abbreviation for Javascript + APIs + Markup. The JAMstack is a way to describe that a site is utilizing these 3 pieces to generate its information. Many of the "sub-frameworks" described under **Gatsby & Friends** above are built to make developing a JAMstack easier.

"_Wait! What's Markup?!_"

Markup is something you're probably more familiar with than you realize. It's a set of styles to apply to specific `tags`. If this is sounding familiar, it's probably because the "M" in HTML stands for Markup! It's what tells the browser that `<h1>Title</h1>` should be larger than `<h2>Title</h2>`.

[Learn more at JAMstack.org](https://jamstack.org/)

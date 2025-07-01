---
title: "Creating blog post images automatically for Gridsome"
layout: libdoc_page.liquid
published: true
description: "Learn how to automate the blog cover image creation process for your Gridsome blog posts!"
tags:
    - gridsome
    - guide
    - blogging
    - blog
date: "2021-09-14"
updated: "2021-09-20"
cover_image: ../../assets/archive/blogImgs/cover-images/AutoBlogCovers-DEV.png
twitter_image: ../../assets/archive/blogImgs/cover-images/AutoBlogCovers-DEV.png
permalink: "{{ libdocConfig.archiveSlug }}/{{date}}-{{page.fileSlug}}/index.html"
---

When I started working on my [chess side-blog project](https://chess.terabytetiger.com) I didn't want to feel the pressure of creating blog cover images for each - so I started scrolling through the [Gridsome Plugins](https://gridsome.org/plugins/) and found [Edmund1645's blog-cover plugin](https://github.com/Edmund1645/gridsome-plugin-blog-cover)! Unfortunately for me, after going through the setup process I was receiving an error message.

After digging through the Plugin's and Gridsome's code for an hour or two, I found that the issue seemed to be occurring when [Vue-Remark](https://gridsome.org/plugins/@gridsome/vue-remark) is used in conjunction with the `collection.updateNode()` function.

I wasn't entirely set on using Cloudinary to host my images, so I decided to modify the code so that I didn't need to programmatically update the frontmatter of my articles, but rather could generate the images into a `/covers/` folder with the same name as the article, thus achieving my goal of saving time with creating blog cover images!

## npm installs

If you aren't familiar with npm, [check out my npm post](https://terabytetiger.com/lessons/beginners-guide-to-node-package-manager/).

If you are, run the following:

```cmd {codeTitle: "Terminal"}
npm install fs-extra node-html-to-image

# I'm going to reference vue-remark later,
# if you want to use that you'll also need:
npm install @gridsome/vue-remark

```

## Vue-Remark plugin config

The important part of the configuration for generating blog cover images is the `typeName` - for more details on configuring vue-remark see [the plugin's page](https://gridsome.org/plugins/@gridsome/vue-remark).

```js{codeTitle: "gridsome.config.js"}
module.exports = {
  siteName: "Your Site Name Here",
  plugins: [
    {
      use: "@gridsome/vue-remark",
      options: {
        typeName: "Post", // < Note this value! 📝
        baseDir: "./content/posts",
        pathPrefix: "/post",
        template: "./src/templates/Post.vue",
      },
    },
  ],
};
```

You'll also want to make sure you have at least one markdown file created in the `./content/posts/` directory with the bare minimum frontmatter:

```md{codeTitle: "content/posts/intro.md"}
## // intro.md

title: Intro Post
cover_image: "../covers/intro.png"

---

This is a sample post!
```

**If you're trying to follow along, make sure to create a `Post.vue` file in your templates folder so that `gridsome develop` can create your post pages properly!**

## HTML to an image

So now we've got our sample post ready to go - let's setup our html to be converted to an image!

In the root directory, create a `functions` folder with a `generateHtml.js` file inside. The HTML returned by this code is going to be what becomes our post cover image.

```js{codeTitle: "functions/generateHtml.js"}
// This creates a basic solid background with title and a white border
module.exports = function(
  title,
  { backgroundColors, imgHeight, imgWidth, border, domain }
) {
  const bgColor =
    backgroundColors[Math.floor(Math.random() * backgroundColors.length)];

  const template = `
    <html>
      <head>
        <style>
        * {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
      }

      body {
        width: ${imgWidth};
        height: ${imgHeight};
        padding: 40px;
        background: ${bgColor};
        color: #ffffff;
        font-family: -apple-system, system-ui, BlinkMacSystemFont,
          "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      }

      div.container {
        border: 3px solid #ffffff;
        text-align: left;
        padding: 30px;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
      }
      h1.title {
        font-size: 3.7rem;
        text-transform: capitalize;
        text-align: center;
      }
        </style>
      </head>
      <body>
          <div class="container">
            <h1 class="title">${title}</h1>
          </div>
      </body>
    </html>
  `;
  return template;
};
```

## gridsome.server Setup

Finally, our `gridsome.server` setup - this is where we will check each time `gridsome develop` or `gridsome build` is run to see if any posts are missing a cover image. If they are, the image will be generated in the covers folder.

```js{codeTitle: "gridsome.server.js"}
const fs = require("fs-extra");
const createImage = require("node-html-to-image");
const generateHtml = require("./functions/generateHtml");

const defaultOptions = {
  typeName: "Post", // This should be the typeName noted above 📝
  // 👇🏻 Each background will randomly have one of these colors
  backgroundColors: [
    "#23313B",
    "#636655",
    "#607077",
    "#806752",
    "#5d6f75",
    "#915335",
  ],
  imgWidth: "1024px", // The width of your cover image
  imgHeight: "512px", // The height of your cover image
  border: true, // I hard coded this to true in my html
  domain: "Your domain goes here", // Edmund includes this in their generated images
  outputDir: "content/covers/", // Where the cover images should be generated to
};

module.exports = function(api) {
  // Keeping this for easy modifications from gridsome-plugin-blog-cover
  const options = { ...defaultOptions };
  api.loadSource(async (actions) => {
    const collection = actions.getCollection(options.typeName);

    collection.data().forEach(function(node) {
      if (node.internal.typeName === options.typeName) {
        // Using the same filename as the file for easy frontmatter
        const imgName = node.fileInfo.name;
        fs.ensureDirSync(options.outputDir);
        const output = `${options.outputDir}/${imgName}.png`;
        // Only generate images for files that don't exist already
        console.log("Generating Missing Cover Images");
        fs.access(output, (error) => {
          if (error) {
            console.log(`Creating ${imgName}.png`);
            createImage({
              output,
              html: generateHtml(node.title, node.subtitle, options),
            });
          } else {
            console.log(`${output} already exists`);
          }
        });
        // if updateNode() worked, this is where it would go :)
      }
    });
  });
};
```

Thanks again to [Edmund1645](https://twitter.com/26th_edmund) for the baseline work for this!

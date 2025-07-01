---
title: "How to make your first Pull Request"
layout: libdoc_page.liquid
published: true
tags:
    - github
    - git
    - tutorial
    - codenewbie
cover_image: ../../assets/archive/blogImgs/cover-images/make-your-first-pull-request.png
date: "2019-05-02"
series-name: "Git Crash Course: Zero to Pull Request"
description: Tutorial walking through making your first pull request on GitHub
twitter_image: ../../assets/archive/blogImgs/cover-images/make-your-first-pull-request.png
permalink: "{{ libdocConfig.archiveSlug }}/{{date}}-{{page.fileSlug}}/index.html"
---

## Prerequisites

-   [Install git](https://git-scm.com/downloads) (Check with `git --version` in your terminal)
-   [Install npm - Look for the "Download Node.js and npm" button](https://www.npmjs.com/get-npm) (Check with `npm --v` in your terminal)
-   [A Github account](https://github.com/)

_The first Pull Request is always the hardest! If you're getting stuck on a step, feel free to reach out to me and I'll help walk you through where you're getting tripped up!_

## Basic Navigation in the Terminal

The following commands will help get you started with navigating through the terminal.

`pwd` - Shows the current directory you are in. Abbreviation for “Present Working Directory”
`ls` (`dir` for windows) - Lists the contents of the current directory
`cd ..` - Navigate to the directory above your current location
`cd {directory}` - Navigate to the designated directory. This can be an absolute path or relative path.

None of these commands alter anything, so feel free to try them out and become comfortable with them. You’ll be using them a lot.

## Setup

1. Navigate your browser to [https://github.com/12vanblart/color-themes](https://github.com/12vanblart/color-themes)
2. Click the "Fork" button in the top right
   ![Github's Fork Button](https://thepracticaldev.s3.amazonaws.com/i/apuq9zo6nwsicogsu740.png)
3. Once Github is done forking the repository, click the "Clone or Download" button and copy the url in the dialog box.
   ![Clone URL dialog box](https://thepracticaldev.s3.amazonaws.com/i/tv9b1l2eeth6947hrjvy.PNG)
4. Open your terminal & navigate to a directory where you're okay adding the project's directory (When you run the next command, it will create a folder in your current location).
5. Run `git clone url_copied_from_step_3` - this creates a copy of my repository in your directory
6. Run `cd ./color-themes` to open the project directory
7. Run `git checkout -b yourBranchName`, but replace `yourBranchName` with whatever you want to call your branch
8. Run `npm install` to install the project dependencies
9. If you use VS Code, run `code .` to open the directory in Code. If not, open your editor/IDE of choice and open the `color-themes` folder.
10. Run `npm run serve` to spin up a local copy of the app. (You can stop this at any point by pressing `Ctrl + c` and answering `y` to "Would you like to terminate the batch job?")
11. Open your web browser of choice and navigate to `localhost:8080`

At this point, you should see the same thing as on [themes.vanblargan.dev](https://themes.vanblargan.dev).

## Adding a theme

There are two files that you will need to update to add a new theme - `src/assets/themes.css` and `src/components/ThemePicker.vue`. These files were created when you used the `git clone` command above. Don't worry if you don't know any Vue, the changes you need to make to that file won't be anything too intense!

### Editing ThemePicker.vue

In this file, you'll see a list of `<Theme>` components starting on line 28. Add a new line after all existing `<Theme>`'s as follows:

```html
<Theme
    theme-name="your-theme-name"
    display-name="Your Theme Name"
    contributor="githubUsername"
/>
```

replacing `your-theme-name` with the class name (see Editing themes.css below), `Your Theme Name` with whatever you want your theme's name to display as on the option list, and `githubUsername` with your Github username.

### Editing themes.css

On line 15, you'll want to copy in the following (make sure your theme is at the top of the file after the comments end):

```css
.your-theme-name {
    --primary: #fff;
    --secondary: #fff;
    --accent: #fff;
    --link: #fff;
    --text: #fff;
}
```

You'll update `your-theme-name` to be whatever you want your theme's class to be called (check that there isn't already a theme with your chosen name!).

Next, update the `#fff`'s to be your colors of choice. If you're not sure where to start picking colors, I recommend playing around with [Pallettte](https://palettte.app/)

_Once you select your theme, saving themes.css will update localhost instantly without needing to reselect your new theme!_

### Requirements for accepted PR's

Note that each time a theme is selected, the `A11y` card's values are recalculated and updated to reflect the contrast ratio between various theme colors. In order for your theme to be approved, each of these numbers needs to be greater than or equal to 4.5 (WCAG AA Compliant).

## Committing your changes

Once you're happy with your theme and it's passing the contrast requirements, you'll want to save your changes so they can be added to the live site and everyone can see your awesome theme!

To do this, head back into your terminal and use `Ctrl + C` to stop the local server (type `y` and press enter when prompted to "Terminate batch job (Y/N)?"). Then we're going to run the following commands:

1. `git add *` -- This tells git you want to add all altered files to the commit
2. `git commit -m "Add theme your-theme-name" -- This saves your changes as a point that can be added to github.
3. `git push --set-upstream origin yourBranchName` (enter username/password if prompted) -- This uploads your commit to github!

## Making the Pull Request!

Now head to [github.com](https://github.com/) and navigate to your forked repository (github.com/yourUserName/color-themes) and select the "Pull Requests" tab, then push the "New Pull request" button.

1. Once the page loads, you'll want to make sure the dropdowns on the left are `base repository: 12vanblart/color-themes` and `base: master` and the options selected on the right are `head repository: yourUserName/color-themes` and `compare: yourBranchName`.
   ![Github Branch Comparison between 12vanblart master and stroudn1 theme](https://thepracticaldev.s3.amazonaws.com/i/m7cmtkmxg40067tq5epq.PNG)
2. Click "Create Pull Request" and fill in the details
   ![Create Pull Request Button](https://thepracticaldev.s3.amazonaws.com/i/kmys575jmfn4zg7i9ir2.PNG)
3. Click "Create Pull Request" to submit your theme for review!

## Closing Thoughts

Now you know enough to go make some PR's on the cool projects out there like this one from Emma:

<a class="dev" href="https://twitter.com/emmawedekind/status/1121835739065520131">View Tweet</a>

or this one from Brittany (which has excellent documentation & issues for getting started!):

<a class="dev" href="https://github.com/brittanyrw/emojiscreen"> Github Repo: emojiscreen</a>

### One last note

Thank you so much to Natalie for proofreading and bouncing around ideas about wording for this post!

<a class="dev" href="https://dev.to/_nataliestroud">Natalie Stroud</a>

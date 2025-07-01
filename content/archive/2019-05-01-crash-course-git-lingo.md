---
title: "Crash Course: git Lingo"
layout: libdoc_page.liquid
published: true
tags:
    - github
    - git
    - beginners
    - codenewbie
cover_image: ../../assets/archive/blogImgs/cover-images/crash-course-git-lingo.png
date: "2019-05-01"
series-name: "Git Crash Course: Zero to Pull Request"
description: A Git Crash Course breaking down common git keywords and lingo to be friendly for new git users.
twitter_image: ../../assets/archive/blogImgs/cover-images/crash-course-git-lingo.png
permalink: "{{ libdocConfig.archiveSlug }}/{{date}}-{{page.fileSlug}}/index.html"
---

## Intro

When getting started in coding, you'll probably hear "git" and "GitHub" thrown around, but trying to look into them may cause you to feel overwhelmed.

_Note: There are many options for using git and storing your code online. In this post, I'll be looking specifically at Github, as that's the platform I'm familiar with. Similarly, my friendship bracelet analogy is based on being created with knots._

### git vs GitHub

_Before we jump in, a quick note on these two terms._

"git" is a tool for saving moments in your code while "GitHub" is a platform that allows you to store the moments created using git in a shareable format.

## Git as a Friendship bracelet

![6 Steps to a Friendship bracelet](https://thepracticaldev.s3.amazonaws.com/i/y5isbie4l7p9g9vz9log.jpg)

Think about git as a friendship bracelet, where each strand making up the bracelet are small subsets of changes/additions to the code and when all the pieces come together, the final product is the finished bracelet!

One of the advantages of git is that it allows you to work on your bracelet with other developers, allowing them to bring in new colors (code) and techniques to help make your bracelet even more awesome than if you had tried to do it yourself!

## Keywords & Commands

### Contributors

> Contributors are anyone that has added to your bracelet.

Just like with friendship bracelets, there are many forms contributing can take on, and all of them are important! Some examples include:

- Reporting errors when trying to use code
- Adding to the code
- Writing blog posts about how to use the code

### Repository (Repo)

> Repositories are the friendship bracelets of the world!

Each bracelet is a repository made up of all the pieces of string (code) to form the repository. They can have any number of contributors, be any size or language, and be anywhere in the process from just getting started to a completed project.

### Branch/Checkout

> Branches are the "width" strands of the friendship bracelet.

Similar to working on a friendship bracelet, you can only work on one of the "width" strands at a time. The strand you're focused on is referred to as your "Checked out" branch.

When it comes to naming your branches, it's customary to name it after what feature the branch is meant to implement. When a new repository is created, it will come with a `master` branch by default. This is where all the "live" or "production" code lives, and changes should usually not be made directly to `master`.

#### Example code:

```bash
// list of branches (Current branch returns with a star)
git branch

// create a branch
git branch <branch_name>

// checkout (switch to) a branch
git checkout <branch_name>

// create & checkout branch
git checkout -b <branch_name>
```

### Clone Command

> Picking up your friend's bracelet.

`clone` is a terminal command that allows you to create a copy of a repository on your computer. When cloning, there are HTTPS and SSH links that you can use. For simplicity, I'll be sticking with HTTPS here, but more info on SSH can be found [here on GitHub](https://help.github.com/en/articles/connecting-to-github-with-ssh).

#### Example code:

```dos
// HTTPS Clone
git clone https://github.com/12vanblart/color-themes.git
```

### Pull Command

> Asking "Hey, friend! How's the bracelet coming along?"

When working on a branch, it's important to make sure you have any changes that may have been made by someone else before adding to it. Once you're on the branch you want to work on, you can get any changes using `git pull`.

#### Example code:

```dos
// Get changes for current branch
git pull

// Get changes for all local branches
git pull --all
```

### Staging / Add Command

> This is the moment where you have your string looped into a knot, but before you pull it tight.

The add command tells git which files you want to put in a 'staged' status. Staging is a fancy way of saying you would like to prepare the file(s) for saving to the branch.

```dos
// Stage a single file
git add <path_to_file>

// Stage all changed files
git add *
```

### Commit

> This is when you pull your knot mostly tight - enough to see what the change would look like, but not enough to be difficult to untie.

Committing takes all your stored items, attaches a message to them, and saves them to the branch. There's a saying to "Commit early, commit often" based on the fact that you can rewind your code to an earlier commit if you want to try something out and it ends up not working.

#### Example code:

```dos
// Commit currently staged files with a message
git commit -m "<your message here>"

// View past commits
git log

// Rewind to a specific commit
git reset <commit id from git log>

// Discard changes to a file (after rewind)
// Note: This is permanent and should be handled with care.
git checkout -- <file_name>
```

### Push Command

> "Hey! Look at the bracelet I'm working on!"

The push command is what saves your local branch's commits to the repository for everyone else to see, pull, and work on.

#### Example code:

```dos
// push your changes to GitHub
git push
```

### Pull Requests (PR's)

> Once you've added a branch to a repository and pulled your knot mostly tight to see what it looks like, the last thing to do is check with the owner of the bracelet if the change is okay to make.

Creating a Pull Request is the process used to make sure the repository's owner (or other authorized user) is okay with your branch's changes before adding them to the repository's main code. When a branch is added to the master branch, developers refer to that as "Merging a Pull Request".

### Fork

> Imagine for a moment that you had a magic printer that would let you put in a bracelet, and get out 2 exact copies of the bracelet you put in. So, you borrow your friend's bracelet, run it through the printer, and return the original bracelet. That's what forking a repository does!

Fork allows you to create a copy of a repository under your username, from which you can create branches and even make Pull Requests back to the initial repository.

> "Most commonly, forks are used to either propose changes to someone else's project or to use someone else's project as a starting point for your own idea." - [GitHub Docs](https://help.github.com/en/articles/fork-a-repo)

## Learn More

If you want to learn more about git or just want a solid bookmark you can always turn to when you need to know about git, I highly recommend [Pro Git (Free!)](https://git-scm.com/book/en/v2)! Not only is the breakdown very logical and concise, but I also find it does a good job of rewording into easy terms to understand.

### One last note

Thank you so much to Natalie for proofreading and bouncing around ideas about wording for this post!

<a class="dev" href="https://dev.to/_nataliestroud">Natalie Stroud</a>

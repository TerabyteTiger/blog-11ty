---
title: How to start coding on a Chromebook
layout: libdoc_page.liquid
published: true
tags:
    - beginner
    - chromebook
description: Beginner's guide to setting up a Chromebook for coding, including how to install VS Code on a Chromebook!
cover_image: ../../assets/archive/blogImgs/cover-images/chromebook-coding-kickoff.png
date: "2020-03-22"
twitter_image: ../../assets/archive/blogImgs/cover-images/chromebook-coding-kickoff.png
permalink: "{{ libdocConfig.archiveSlug }}/{{date}}-{{page.fileSlug}}/index.html"
---

Some Chromebooks have started to receive native Linux support on the stable channel since September 2018 (CrOS v. 69). Although still in beta while some features are finalized, the Linux support is fairly stable for jumping into programming, and this guide is for beginners looking to try out coding on their Chromebook.

## Crostini

When researching Linux on Chromebooks, it will often be under the title of “Crostini” which is the codename for Linux support. [Crostini](https://www.marthastewart.com/352633/crostini "Martha Stewart Crostini recipe") outside of Chromebooks is an Italian appetizer consisting of toast and a topping. This is meant as a parallel to [“Crouton”](https://www.reddit.com/r/Crouton "Crouton Subreddit") which is a way to install Linux on a Chromebook in a manner similar to jailbreaking an iPhone or rooting an Android. If you want to dive deeper into the Crostini world after this, I recommend checking out the subreddit, [r/crostini](https://www.reddit.com/r/Crostini/ "Crostini Subreddit") (This is also a good place to look if you ever run into issues).

## Containers

Containers are “buckets” where a system's code runs. Think of them as cardboard boxes where each of your Operating Systems run within your Chromebook. Chromebooks support up to 3 of these Containers:

![3 boxes. One for each of Android, Linux, and Chrome](../../assets/blog/400/TheCloudAteMyImage400.png)

Similar to how Android runs within CrOS (Chrome OS), Linux runs within its own container isolated from Android and CrOS.

## Eligible Devices

If you plan to follow along on your device, you’ll want to start by checking the list [here](https://www.reddit.com/r/Crostini/wiki/getstarted/crostini-enabled-devices) to make sure your device has Linux support available.

## Enable Linux (Beta)

Now that I’ve got the background details out of the way, let’s jump into things by enabling the Linux container on your computer!

1. Open your Settings
2. Open the side panel
3. Click “Linux (Beta)”
4. Click “Turn On”
5. Click through the wizard (there will be a few minutes of waiting for the download and installation)
6. You should now see a black box on your screen. This is your terminal. It will become your best friend.

## A quick note on 'sudo'

`sudo` tells the terminal to run a command as an admin. When you run into a permission error, you will often be able to resolve the issue by using `sudo {command}`.

**Please be careful with this as it does allow whatever command/program you’re running to execute as an elevated user.**

It’s recommended to look into the documentation for any Linux command you may be unfamiliar with before running it, even without sudo. Often a quick search for `Linux {Command} command` will get you a detailed look at a command’s intent and what to expect when you run it.

## First things first

The first thing you want to do in your terminal is run the following commands, which will download any updates for pre-installed programs and then install them.

```bash
Sudo apt update
Sudo apt upgrade -y
```

## Basic Navigation in the Terminal

The following commands will help get you started with navigating through the terminal.

`pwd` - Shows the current directory you are in. Abbreviation for “Present Working Directory”
`ls` - Lists the contents of the current directory
`cd ..` - Navigate to the directory above your current location
`cd {directory}` - Navigate to the designated directory. This can be an absolute path or relative path.

None of these commands alter anything, so feel free to try them out and become comfortable with them. You’ll be using them a lot.

## Installing VS Code

Code is my preferred text editor, and installing it is easy! First, download Code from https://code.visualstudio.com/docs/setup/linux. At this point, it will be within the Chrome box above. You can move it to the Linux box by opening `Files > Downloads` and Dragging the downloaded file to `Linux files`.

Next head back to your terminal and run

`sudo apt install -y ./{file}.deb`

> Pro Tip: Press `tab` to autocomplete the file name after typing ./c in the above command!

Once Code is installed, you can run the command `code .` to open VS Code for the current directory.

> Note: `.` represents the current directory

## What to do if you think you’ve goofed something up

_Have no fear!_ When playing around with Linux for the first time, you’ll probably reach a point where you don’t feel like everything is quite right. You can reset your Linux container back to a clean install by:

1. **SAVE ANY FILES THAT YOU NEED FROM YOUR LINUX FOLDER**
2. Settings &gt; Linux (Beta) &gt; Linux &gt; Remove Linux Apps for Chromebook
3. Click “Delete”
4. Head back up to the “Enable Linux (Beta)” steps above.

## What’s Next?

Now that you’ve got Linux setup, you may be wondering what to do next. Depending on your interest, I’d recommend checking out one of the following resources (Python even comes installed in the Linux container by default!):

<a class="dev" href="https://dev.to/aspittel/my-favorite-free-resources-for-new-programmers-bia">My Favorite Free Resources for new programmers </a>

<a class="dev" href="https://dev.to/colinmtech/learning-web-development-these-skills-will-make-you-stand-out-56fh">Learning Web Development? These skills will make you stand out</a>

<a class="dev" href="https://dev.to/jessicagarson/resources-for-learning-python-hd6/">Resources for Learning Python</a>

## Summary

```bash
Sudo apt update
Sudo apt upgrade -y
```

Download VS Code from https://code.visualstudio.com/docs/setup/linux link

```bash
sudo apt install -y ./{file}.deb
```

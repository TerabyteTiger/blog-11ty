---
title: Devalytics - DIY detailed Dev.to Analytics
layout: libdoc_page.liquid
published: true
description: Creating a self-hosted detailed Dev.to analytics site.
tags:
    - showdev
    - analytics
    - webdev
date: "2020-10-07"
updated: "2021-05-13"
cover_image: ../../assets/archive/blogImgs/cover-images/devalytics-DEV.png
twitter_image: ../../assets/archive/blogImgs/twitter-images/devalytics-Twitter.png
permalink: "{{ libdocConfig.archiveSlug }}/{{date}}-{{page.fileSlug}}/index.html"
---

> I am archiving this project because DEV has added [a more in-depth analytics](https://dev.to/dashboard/analytics) - The remaining portion of this post I will be leaving up because I think it's fairly educational

## Background

I'm a huge math nerd and love creating dashboard/data visualization pages whenever I have the chance. Recently I had some time to work on a personal creative project and decided to tackle one that's been on my "it'd be cool to do this eventually" list - create a daily breakdown dashboard for Dev.to stats!

### Personal Goals going into Devalytics

- **Launch Early** - Something I know I'm not particularly good at is sharing early and not getting caught in the "Not quite perfect yet" status until I move on to another project.
- **Use Dark Colors** - I'm not going to say the site is a pure Dark Theme, but I very intentionally wanted to use some darker colors in my design.
- **Minimize Cost** - This is both monetary cost and mental cost. I want this to hopefully be a viable option for anyone to spin up on their own and not require too many hoops to jump through.
  - **Note: Heroku and Firebase could require payments if you had enough posts or checked your stats enough on a given day, but I think the break point is high enough that most people won't hit it unless you have many people potentially visiting your site - so unless you share it publicly like I just did, you should be in the clear!**

### What I used

#### Backend

- [Heroku](https://dashboard.heroku.com/) with [Node.js](https://node.js.org/) for grabbing Dev's API data each morning and pushing the data to Firebase
- [Firebase](https://firebase.google.com/) for storing the data

#### Frontend

_The reasoning for all of these choices are familiarity and personal preference_

- [Vue.js (2.x)](https://vuejs.org/)
- [Tailwind](https://tailwindcss.com/)
- [Chart.js](https://www.chartjs.org/)

[Github Repo for Frontend](https://github.com/TerabyteTiger/devalytics-frontend)

## Set up your own Devalytics

### Firebase Setup

1. [Sign up for/Log in to Firebase](https://console.firebase.google.com/)
2. Create a new project (Name it however you'd like!)
3. Set up a Service Account. This is located on your **Project's Settings > Service Accounts > Create one for Node.js** and save the .json file for reference later (For the Environment variables on Heroku).
4. Configure a Firestore Database under Cloud Firestore > Create Database

- I started in Production mode and set the location as the default.

5. Set your Firestore rules as:

```firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read;
      allow write: if false;
    }
  }
}
```

### Heroku Setup

1. Sign up for/Log in to a Heroku Account
2. Create a new Heroku app (You can name it whatever you want)
3. [Fork the Devalytics GitHub Repo](https://github.com/TerabyteTiger/devalytics)
4. Connect the fork to your Heroku app in your app's dashboard under **Deploy > Deployment Method**
5. Add Environment variables for Firebase & Service Account (Variable names listed below)
6. Add the "Heroku Scheduler" add-on to your project and set it to run `npm run daily` once a day at whatever time you desire.

Your Dev.to API Key

- DEV_API_KEY

Your Firebase Information (This is presented as a JSON object by firebase - var firebaseConfig)

- FIREBASE_APP_ID
- FIREBASE_AUTH_DOMAIN
- FIREBASE_DB_URL
- FIREBASE_KEY
- FIREBASE_MESSAGING_SENDER_ID
- FIREBASE_PROJECT_ID
- FIREBASE_STORAGE_BUCKET

The following Service Account Variables:

- SA_auth_provider_x509_cert_url
- SA_auth_uri
- SA_client_email
- SA_client_id
- SA_client_x509_cert_url
- SA_private_key
- SA_private_key_id
- SA_project_id
- SA_token_uri
- SA_type

### Netlify Setup

1. Fork the front end repository
2. [Sign up for/Log in to a Netlify Account](https://app.netlify.com/)
3. Create a new Netlify Site
4. Link the new site to your fork of the Frontend repository

- Build Command: `yarn build`
- Publish Directory: `dist`

4. Add Environment variables for Firebase (The same variables as the Firebase section from Heroku above):

- This is located under **Settings > Build & Deploy > Environment**

- FIREBASE_APP_ID
- FIREBASE_AUTH_DOMAIN
- FIREBASE_DB_URL
- FIREBASE_KEY
- FIREBASE_MESSAGING_SENDER_ID
- FIREBASE_PROJECT_ID
- FIREBASE_STORAGE_BUCKET

## Where to from here?

One of the unfortunate parts of Devalytics is the inability to backdate data - and if there's ever a day the Heroku script doesn't run for any reason, that day will be lost to the void. Because of that, I wanted to start collecting data as soon as I could, so that as I build more analytics into the site, it will be easier to verify everything is working properly since data will exist for more than 3 (low-activity) days.

Some additions I already know I'd like to add:

- Date Filters
- Article specific data views
- Tag breakdowns
- Don't require clicking "Update" for the _Daily Summary_ chart

---
title: Fixing UserProfilelookup Nintex Function returning blank values in Nintex Forms
layout: libdoc_page.liquid
published: true
description: This post acts as both a collection of the documentation for UserProfilelookup() in Nintex Forms and offers the troubleshooting steps for when UserProfilelookup() is returning no values.
tags:
    - nintex
    - low-code
cover_image: ../../assets/archive/blogImgs/cover-images/nintexUserProfileLookup-DEV.png
twitter_image: ../../assets/archive/blogImgs/twitter-images/nintexUserProfileLookup-Twitter.png
date: "2021-06-01"
permalink: "{{ libdocConfig.archiveSlug }}/{{date}}-{{page.fileSlug}}/index.html"
---

Since Nintex doesn't have all of this information listed under the UserProfileLookup documentation pages, I figured I should round it all up after spending almost a full day trying to figure out why my UserProfilelookup() function wasn't returning any results. 😅

_Note: I am using Nintex Forms with O365 SharePoint_

## Test Function

For testing purposes I recommend using the below function to check if you can access the first name of the currently logged in user (you):

```nintex
userProfileLookup([Context].[Current user email] ,"FirstName")
```

## Returning Blanks

When the above formula wasn't returning anything for me, I went digging through the docs to try and find anything I might not have set up.

The first thing I found was to set up a Connector to Active Directory in the Workflow Cloud Settings page. This is located under your **Workflow Cloud's Settings page > User Directory Lookup**.

I had our network admin set this up while I kept digging and found [this documentation about trusting the app in SharePoint](https://help.nintex.com/en-US/Office365/Forms/ResponsiveClassicForms/Admin/Managingforms.htm) - look for the section titled "Allow forms to access user profiles". I believe this is the fix that corrected the forms not showing anything when using UserProfileLookup(), but the first piece I believe is necessary to handle user lookups in workflow action blocks.

## Where to find values that can be referenced

Hopefully some combination of the above now has the formula returning your first name. So where do you look for the other values you can use?

If you have admin access to the SharePoint Admin Panel (yourTenant-admin.sharepoint.com) you can find additional details under **More features > User Profiles (Open) > Manage User Properties**. From this list you can select the Edit option for any property and you'll see a field on the next page called **Name** which is what you can replace `FirstName` with in my test function.

If you don't have admin access, these are some of the common values I suspect may be useful to you:

| Nintex        | Microsoft    |
| ------------- | ------------ |
| FirstName     | First Name   |
| LastName      | Last Name    |
| PreferredName | Display Name |
| Title         | Title        |
| Manager       | Manager      |
| UserName      | User name    |

## Other Notes

- [Nintex UserProfilelookup() Documentation](https://help.nintex.com/en-US/Office365/Designer/Functions/userProfileLookup.htm)

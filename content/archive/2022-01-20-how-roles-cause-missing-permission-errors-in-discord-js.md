---
title: How Roles cause Missing Permission Errors in Discord.js
published: true
description: "After struggling to understand why my Discord.js bot was throwing a DiscordAPIError: Missing Permissions even with full admin permissions, I found out that role priority can cause this issue"
tags:
    - bot
    - javascript
    - debugging
    - discord
permalink: "{{ libdocConfig.archiveSlug }}/{{date}}-{{page.fileSlug}}/index.html"
date: "2022-01-20"
layout: libdoc_page.liquid
---

## Background

I was working on a Discord bot to cause chaos by creating a message with a button that said "Do not press" - which when pressed would cause the user clicking the button to be timed out for 30 seconds with a message stating "I told you not to push the button". After working through getting my bot set up as an application and logged in to my server, I thought the hard part was behind me and I started plugging away at getting my slash command connected and generating buttons. Everything was going smoothly until I finally added the `GuildMember.timeout()` function and started seeing this error whenever I pressed the button:

```cmd
DiscordAPIError: Missing Permissions
    at RequestHandler.execute(path\node_modules\discord.js\src\rest\RequestHandler.js:350:13)
    at processTicksAndRejections (node:internal/process/task_queries:96:5)
    at async RequestHandler.push (path\node_modules\discord.js\src\rest\RequestHandler.js:51:14)
    at async GuildMemberManager.edit (path\node_modules\discord.js\src\managers\GuildMemberManager.js:279:15) {
  method: 'patch',
  path: '/guilds/guildId/members/memberId',
  code: '50013',
  httpStatus: 403,
  requestData: {
    json: {
      communicationDisabledUntil: 1642004181808,
      communication_disabled_until: '2022-01-12T16:16:21.808Z'
    },
    files: []
  }
}
```

### Important note about Timeout functionality

> Administrators cannot be timed out

It took a while to find somewhere in the Discord Developer Docs that clarified some of the specifics, including that Administrators cannot be timed out. Initially, I thought this was my issue because I was an admin on the server where I was testing my bot - so I called in backup and had someone else try the button... and got the same error 🙃

## Role Hierarchy

As it turns out, there's another "Level" of permission that doesn't appear within the "Permissions" settings page - Roles have a level of permission, defaulting to the order in which roles are added to a server.

This means that by default, your bot's role will start with lower permissions than everyone else with a role assigned to them. To fix this, drag and drop your bots role above the roles you're trying to moderate on the Server Settings > Roles.

> ... drag and drop your bots role above the roles you're trying to moderate on the Server Settings > Roles.

## How to check Role Hierarchy with Discord.js

This is great for deploying your bot to your own server, but if you want to allow others to deploy an instance of the bot, they might not know to do this and will cause your bot to crash. This can be fixed by wrapping your `GuildMember.function()` call with an if statement checking for the Boolean `GuildMember.moderatable`.

```js
if (interaction.member.moderatable) {
    interaction.member.timeout(30000, "I told you not to push the button 😜");
}
```

## Additional Resources

-   Discord.js: [Docs](https://discord.js.org/#/docs/discord.js/stable/general/welcome) | [Getting Started Guide](https://discordjs.guide/#before-you-begin)
-   [Discord Dev Docs](https://discord.com/developers/docs/intro)
-   [My Chaos Bot](https://github.com/TerabyteTiger/chaosbot)

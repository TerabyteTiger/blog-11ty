---
title: "How to find and terminate a Windows Processes by Port"
layout: libdoc_page.liquid
published: true
description: 'Learn how to locate the Windows Process occupying a specific port and terminate it when you get an "error listen eaddrinuse: address already in use :::8080" or "error listen eaddrinuse: address already in use :::8081" error!'
tags:
    - windows
    - cmd
    - terminal
cover_image: ../../assets/archive/blogImgs/cover-images/SeekAndDestroy.png
date: "2020-06-12"
twitter_image: ../../assets/archive/blogImgs/cover-images/SeekAndDestroy.png
permalink: "{{ libdocConfig.archiveSlug }}/{{date}}-{{page.fileSlug}}/index.html"
homepage: true
---

Recently, I've done a bit with Node.js and deploying to Windows Servers - and working with servers means learning more about `cmd`! One error I was receiving when I would terminate and restart my app was that stating the specified port was already occupied!

```cmd
[nodemon] starting `node ./app.js`
events.js:292
      throw er; // Unhandled 'error' event
      ^

Error: listen EADDRINUSE: address already in use :::8080
    at Server.setupListenHandle [as _listen2] (net.js:1313:16)
    at listenInCluster (net.js:1361:12)
    at Server.listen (net.js:1447:7)
    at Function.listen (C:\Users\user\Desktop\auth-server\node_modules\express\lib\application.js:618:24)
    at Object.<anonymous> (C:\Users\user\Desktop\auth-server\app.js:189:5)
    at Module._compile (internal/modules/cjs/loader.js:1138:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1158:10)
    at Module.load (internal/modules/cjs/loader.js:986:32)
    at Function.Module._load (internal/modules/cjs/loader.js:879:14)
    at Function.executeUserEntryPoint [as runMain] (internal/modules/run_main.js:71:12)
Emitted 'error' event on Server instance at:
    at emitErrorNT (net.js:1340:8)
    at processTicksAndRejections (internal/process/task_queues.js:84:21) {
  code: 'EADDRINUSE',
  errno: 'EADDRINUSE',
  syscall: 'listen',
  address: '::',
  port: 8080
}
[nodemon] app crashed - waiting for file changes before starting...
```

> Other common ports that may experience this error include 3000 and 8081 - but you can declare any port number you want!

I needed to terminate the process so I could re-start my node server with the changes I had made. I had a rough idea of what to do from working with bash a while back, but I needed to translate that knowledge into Windows' `cmd` format.

## 1 - Find the Process ID (PID)

Since our error is node trying to use an address that is already in use, the first step is to find the Process ID for the process occupying the port I was trying to `listen` on. For this, we can use `netstat -a -o -n` to list all active connections.

```cmd
C:\Users\user> netstat -a -o -n

Active Connections

Proto  Local Address          Foreign Address        State           PID
...
TCP    [::]:8080              [::]:0                 LISTENING       3664
...
```

In the list that gets spat out, you the line that has a `Local Address` ending in your port - in my case I was looking for `:8080`. Note the value in the `PID` column - we'll need that in a minute. **NOTE: This value will most likely be different each time you start your program**

## 2 - Confirm that PID is for node.exe

> This step is optional, but I like to double check that I'm targeting the correct process before I terminate it.

To get a list of tasks running in `cmd` we can run `tasklist` which details everything actively running on your machine.

```cmd
C:\Users\user> tasklist

Image Name                     PID Session Name        Session#    Mem Usage
========================= ======== ================ =========== ============
...
node.exe                      6736 Services                   0      2,080 K
cmd.exe                       3048 Services                   0      2,268 K
node.exe                      3664 Services                   0      6,768 K
...

```

Here, you can see that I have multiple `node.exe` programs running, but only one of them has our `3664` PID.

## 3 - Stop the running process

Now that we know our `3664` PID, we can commence putting an end to our runaway process. The general format is `taskkill /f /pid ####`, replacing the #### with our PID from above. If you try to run this without the `/f` flag, you'll probably be prompted to use the `/f Force flag` by Windows.

```cmd
C:\Users\user> taskkill /f /pid 3664
SUCCESS: The process with PID 3664 has been terminated.
```

And now you're set to start your node server again!

## Summary

- Find what Process ID (PID) is occupying your port with `netstat -a -o -n`
- (Optional) Confirm this PID is for the expected program with `tasklist`
- Terminate the process with `taskkill /f /pid ####` (replace #### with your PID)

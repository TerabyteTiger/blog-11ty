---
title: Some UNIX command line notes
layout: libdoc_page.liquid
published: true
date: "2025-03-03"
updated: "2025-05-16"
permalink: "{{ libdocConfig.archiveSlug }}/{{date}}-{{page.fileSlug}}/index.html"
description: "Notes on some of the many commands I've tried while setting up a Raspberry pi as a Jellyfin home media server with Docker."
tags:
    - Home Server
    - Raspberry Pi
    - Linux
---

## Brief Intro

In the process of setting up Jellyfin on the Raspberry Pi I had laying around, I've run into quite the abundance of issues. Since it's been a few years since I've worked with a Linux terminal I figured it would be helpful to put some of the commands in a place I could find them easily along with any notes I have about them. _As with any command line code, I recommend you research it yourself to know what you're about to paste into your terminal before you do. In alignment with this philosophy, I will be dropping `sudo` from commands that (in my experience) need it._

## 🥧 Raspberry Pi Specifc Commands

### Raspberry Pi Imager

Raspberry Pi Imager is a tool for easily wiping and flashing an OS onto a USB or other storage device.

```bash{codeTitle: "Raspberry Pi Imager Install"}
apt install rpi-imager
```

```bash{codeTitle: "Run Raspberry Pi Imager"}
rpi-imager
```

## 🐧 The Linux Section

### Mounting & Unmounting USBs

> Device names may switch around randomly on each boot. Persistent naming allows you not to worry about this

[-- Source](https://wiki.debian.org/Part-UUID)

Learning how fdisk works solved the biggest issue I was having with getting my usb drive set up as a connected source. [This article](https://www.howtogeek.com/106873/how-to-use-fdisk-to-manage-partitions-on-linux/) in particular walked though all the steps in a friendly way.

This will show all partitions and storage on/attached to the device. Use this to find the "device name" - something like `/dev/sda1` or `/dev/sdb2`.

```bash{codeTitle: "List all attached storage"}
fdisk -l
```

This command will show the space available in a -h[uman readable] format:

```bash{codeTitle: "List all file systems and mount locations available"}
df -h
```

Manually mount a device's partition:

```bash{codeTitle: "Mount a partition to a specific location"}
mount /dev/sda1 /media/
# Note that the first value should be a partition, not device (sda)
```

Unmount a device's partition:

```bash{codeTitle: "Unmount a partition (Mount location irrelevant)"}
umount /dev/sda1
```

### Editing a file with pico

I just like using Pico because that's what we used in the college class where I learned Linux.

```bash{codeTitle: "Edit with Pico"}
pico FILE_PATH.EXTENSION

pico compose.yaml
```

To save the file, <kbd>Ctrl</kbd> + <kbd>X</kbd> then <kbd>Enter</kbd> then <kbd>y</kbd>.

### Get Hostname

```bash{codeTitle: "Get Hostname"}
hostname -I
```

Possiblely useful guide: [How to change hostname on Linux from the Command line](https://linuxconfig.org/how-to-change-hostname-on-linux)

### GUI/Visual Interface for Partitioning Drives

```bash{codeTitle: "GUI for Partitioning Drives"}
gparted
```

### Mounting Parition on boot

The file which controls the boot processes:

```
/etc/fstab
```

Note that there are various options that can be included. Importantly, `nofail` - which will indicate that if that line didn't process properly, the boot process will continue. AKA if you don't indicate this and unplug a usb your device might not boot up (ask me how I know 😅).

Get ids of partitions:

```
blkid
```

## 🐋 Docker Specific

### Install Docker

```bash{codeTitle: "Install Docker"}
curl -sSL https://get.docker.com | sh
```

### Grant docker user access to run without `sudo`

Note - This one requires `sudo` to run

```bash{codeTitle: "Grant docker $USER permissions"}
usermod -aG docker $USER
```

### Install docker-compose

The first few tutorials I followed didn't include this, and it seems like this would have been a huge convenience.

```bash{codeTitle: "Install Docker-Compose"}
apt install docker-compose
```

### List of active docker containers

```bash{codeTitle: "List active Docker containers"}
docker ps
```

### Find the docker compose file location for a specific container

_Note that `CONTAINER_ID` will come from the above `docker ps` command and should look like a alphanumeric identifier._

```bash{codeTitle: "Find the docker compose file location"}
inspect CONTAINER_ID | grep compose
```

### Run a command line in a docker container

```bash{codeTitle: "Run a bash shell in a specified docker container"}
docker exec -it CONTAINER_NAME sh
```

### Restart Docker Container

<codeblock title="Restart named Docker Container" lang="cmd">

```bash{codeTitle: "Restart named docker container"}
docker container restart CONTAINER_NAME
```

</codeblock>

<sticky-note content='Huge thanks to Code Fallacy on Youtube for the excellent guides that got me through this'>
</sticky-note>

[Code Fallacy on Youtube](https://www.youtube.com/@codefallacy)

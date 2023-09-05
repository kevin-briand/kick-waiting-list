# Kick waiting list

Kick waiting list is an application that allow viewers to join a waiting list to play with the streamer.
This application was originally created for the streamer [Ory_Gami](https://kick.com/ory-gami), If you like this application follow her.

## Features
- translation (fr, en)
- allow viewers to join and leave the waiting list with commands designed by the streamer
- can limit joining to Botrix only (for example, you can limit joining to your subs only)

## How to use
On the first use, you can see the parameters page, in this page you should enter your Kick username and click on the 'get chat ID' button, if the username exists the field Chat ID field will be filled automatically.
Change the subscribe/unsubscribe fields as you wish. Note: If you want to use 'only Botrix can subscribe', the message will say by Botrix need to provide the username.

Example : Your ticket has been purchased @username

use $(sender) to indicate the name of the user who entered the command.

## Download
You can found the latest version in the [release page](https://github.com/kevin-briand/kick-waiting-list/releases). Application available on Windows and Linux.

## Issue
If you have any issue with the application, open a new [issue](https://github.com/kevin-briand/kick-waiting-list/issues) if nobody opened before.

# Development 
## Install

Clone the repo and install dependencies:

```bash
npm install
```


## Starting Development

Start the app in the `dev` environment:

```bash
npm start
```

## Packaging for Production

To package apps for the local platform:

```bash
npm run package
```

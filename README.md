# Debate Bot
This is a **Discord Bot written in JS** that **monitors Discord Voice Channels** and **records statistics** about them. 

## Background
Someone approached me and asked me to make a Discord Bot that records stats about Discord Voice Channels (VCs).
I work mainly in python, so I set out and found a Python Discord API. 
After figuring out that Discord.py (the Python Discord API) didn't support most VC features, I switched to Discord.js, (the JavaScript Discord API). 
This was a bit hard for me for a couple of reasons: 

- I haven't ever worked with Node.js.
- I'm not that familiar with JS.

(In fact, this was actually my first time working on a project mainly built in JS.) 
After finishing this project I've concluded that: 

- I don't like JS.
- Working in JS wasn't as bad as I thought it would be. 
- JS can actually be useful

But hey, at least I've got a working bot. 
(Please excuse any bad programming practices.)

## Installation
Here's how you should set it up:

### Machine Prerequisites
- Set up a VPS or something similar - This is a Discord bot, so if you want it to be constantly running, you need somewhere to run it while you're offline.
- Install Node and NPM. You need to install `Discord.js`. (`npm install discord.js` should work just fine)
- Install `FFMPEG`. This is important! If on a linux-based system, `sudo apt-get install ffmpeg` should do the trick.

### Getting the Code
- Clone this repo into a folder labeled `Debate Bot` or `Debate Code` or something else that makes sense. 
- In the project folder, add a `.env` file using your favorite text editor. The contents of `.env` should look exactly like this for now: `DISCORD_BOT_SECRET=`. We'll add a the bot's token here later on.

### Setting up Discord
- Make a Discord account if you don't already have one.
- Make a server to add this bot to (if you don't already have one). This bot is designeed work with one server at a time.
- Go to the `Discord Developer Portal` and make a new app. 
- Add a bot to your Discord app. 
- Get your bot's token, and add it to your `.env` file. Your `.env` file should now look like `DISCORD_BOT_SECRET=XXXX`, where `XXXX` is your bot's token. Remember, there shouldn't be any whitespace around the `=`.
- Invite your bot to your server by going to this link: `scope=bot&client_id=XXXX` where `XXXX` is your Discord app's client ID. (Not to be confused with your bot's token)

### Running the Whole Shebang
- After copleting the steps above, open shell and go to th project folder. Enter `node index.js` to run the bot. If everything is working, you should see `Successful Login` followed by `My username is 'XXXX'` (where `XXXX` is the username of the bot). 
- In your discord server, try typing in `!ping` to check if the bot is online, then join a VC channel and enter `!debate` to start the bot's main feautre. 
- You can check your stats by entering `!stats`.
- You can use `!help` for some help.
- You might have to fiddle with the code or install some extra dependencies depending on your system. 

## TODO
- Add stat permenence through JSON
- Set up VC transcription
- Create Leaderboard

## Credit
The majority of this code is mine, although I did follow [this tutorial](https://www.codementor.io/garethdwyer/building-a-discord-bot-with-node-js-and-repl-it-mm46r1u8y) to get started.

## Notes
Please open an issue if there is any problem with the bot itself. 

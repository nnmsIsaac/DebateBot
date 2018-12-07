const keep_alive = require('./keep_alive.js')
const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.env.DISCORD_BOT_SECRET;

var stats = {};

function arrayRemove(arr, value) {
	return arr.filter(function (ele) {
		return ele != value;
	});
};

client.on('ready', () => {
	// logging in
	console.log('Successful Login!');
	console.log(`My username is \'${client.user.username}\'.`);
});

client.on('message', msg => {
	if (msg.content.charAt(0) === '!') {
		msg.react('👀')
			.catch(log => {
				console.log(error);
			});
	};

	if (msg.content === '!purpose') {
		msg.channel.send('I wish I could voice my opinions... but I guess I\'m only here to listen... \¯\\\_\(\ツ\)\_\/\¯')
			.catch(error => {
				console.log(error);
			});
	};

	if (msg.content === '!ping') {
		msg.channel.send('Pong.')
			.catch(error => {
				console.log(error);
			});
	};

	if (msg.content === '!help') {
		msg.channel.send('Debate Bot moniters a VC to measure stats about the people speaking in it. To use Debate Bot: \n    - join a VC \n    - type `!debate` in any channel \nTo check your stats type `!stats` in any channel. If you\'re not sure whether or not Debate Bot is working, you can type `!ping` and Debate Bot should promptly reply.')
			.catch(error => {
				console.log(error);
			});
	};

	if (msg.content === '!rankings') {

	}

	if (msg.content === '!stats') {
		// check if user in in table of recorded users:
		user = msg.author
		if (!(user in stats)) {
			stats[user] = {
				'interruptions': 0,
				'timeSpeaking': 0,
			};
			msg.channel.send('it seems like you haven\'t participated in a VC debate with me yet!')
				.catch(error => {
					console.log(error);
				});
		} else {
		interruptions = stats[user]['interruptions'];
		timeSpeaking = stats[user]['timeSpeaking'];
		msg.channel.send(`You've spoken in VC a total of ${timeSpeaking} minutes \nYou've interrupted others a total of ${interruptions} times.`)
			.catch(error => {
				console.log(error);
			});
		};
	};

	if (msg.content === '!debate') {

		if (!msg.guild) {
			msg.channel.send('You\'re currently not in a guild!');
			return;
		};

		msg.channel.send('Please wait a moment while I connect to the VC.')
			.catch(error => {
				console.log(error);
			});

		const channel = msg.member.voiceChannel
		if (channel === undefined) {
			msg.channel.send('It seems like you\'re not in a VC.');
			return
		};

		channel.join()
			.then(connection => {
				msg.channel.send('Success! I\'m now connected and ready to listen.');
				var speakers = [];
				connection.on('speaking', (user, speaking) => {
					// when a user starts speaking:
					if (speaking) {
						// add them to the list of speakers
						// start a timer recording how long they're speaking
						speakers.push({ user: new Date().getTime() });
						// check for interruptions
						if (user in stats) {
							if (speakers.length > 1) {
								stats[user][interruptions] = stats[user]['interruptions'] + 1;
							};
						} else {
							stats[user] = {
								'interruptions': 0,
								'timeSpeaking': 0,
							};
						};
						// when a user stops speaking:
					} else {
						// stop the timer and add it to their total time
						var talkTime = (new Date().getTime()) - (stats[user]['timeSpeaking']);
						var talkTime = talkTime / 1000;
						var talkTime = Math.abs(talkTime);

						if (user in stats) {
							stats[user]['timeSpeaking'] = stats[user]['timeSpeaking'] + talkTime;
						} else {
							stats[user] = {
								'interruptions': 0,
								'timeSpeaking': talkTime,
							};
						};
						// remove them from the list of speakers
						if (speakers.includes(user)) {
							arrayRemove(speakers, user)
						};
					};
				});
				connection.on('disconnect', () => {
					msg.channel.send('I was disconnected ⁉️.')
						.catch(error => {
							console.log(error);
						});
				})
				// when a user leaves the VC:
				//     remove them from the list of speakers
				//     stop the timer and add it to their total time 
			})
			.catch(error => {
				console.log(error);
				msg.channel.send('I couldn\'t connect to the VC 🤔.');
				msg.channel.send('(The VPS this is running on probably doesn\'t have the FFMPEG library installed, TBH.)')
			});
	};
});

client.login(token);

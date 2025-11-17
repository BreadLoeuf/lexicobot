const { Client } = require('ps-client');
const { loadEnvFile } = require('node:process');


loadEnvFile('./.env');
const groups = ['~', '&', '#', '@', '%', '+', '★', '*', 'trusted'];
const Bot = new Client({ username: 'Lexicobot', password: process.env.PASSWORD, debug: true, avatar: 'touristf', rooms: ['groupchat-breadey-testing', 'thehappyplace', 'hgl', 'botdevelopment', 'thelibrary', 'internetexplorers', 'techcode'] });
Bot.connect();

const bp = '_';
Bot.on('message', async message => {
		switch(true) {
		// ignore messages without an author (system) or from groups we don't allow
		case (message.isIntro || !message.author || !message.target || message.author.userid === message.parent.status.userid):
			break;
		case message.author.group && !groups.includes(message.author.group):
			break;
		case message.content.startsWith(`${bp}echo `):
			message.reply(message.content.slice((bp + 'echo ').length));
			if (message.content == '')
			{
				message.reply("[[]]");
			}
			break;
		case message.content.startsWith(`${bp}ping`):
			message.reply('Pong!');
			break;
		case message.content.toUpperCase().includes("GOODNIGHT") && message.content.toUpperCase().includes("LEXICOBOT"):
			message.reply("Goodnight, " + message.author.name);
			break;
		case message.content.toUpperCase().includes("HI LEXICOBOT"):
			message.reply("Hi, " + message.author.name + "!");
			break;
		case message.content.startsWith(`${bp}define `):
			const word = message.content.slice((bp + 'define ').length);
			const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
			// Fetch a word of the user's choosing
			try {
				const res = await fetch(url + word).then(response => response.json()).then(data => {
				message.reply(`/addhtmlbox <div id="background"><h3>${data[0].word}</h3><p id="subtitle">${data[0].meanings[0].partOfSpeech}</p><hr><p>${data[0].meanings[0].definitions[0].definition}</p></div>`);
			});
			} catch (error) {
				message.reply("Sorry, I couldn't find the definition for that word.");
				console.error(error.message);
			}
			finally {
				break;
			}	
		case message.content.startsWith(`${bp}pstree `):
			message.reply("This feature is under development.");
			break;

	}
});
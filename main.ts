import { Client, Message } from 'ps-client';
import * as dotenv from 'dotenv';
import * as todo from './lib/todo';
import * as helper from './lib/helpers';
import * as wikirace from './games/wikirace/wikirace';
import * as randcat from './randanimals/randcat';
import * as randdog from './randanimals/randdog';


dotenv.config();

const groups = ['~', '&', '#', '@', '%', '+', '★', '*', 'trusted'];
// const regexGroups = /[~&#@%+★*]/
const rooms: string[] = ['thelibrary', 'internetexplorers', 'techcode', 'thehappyplace', 'lobby', process.env.ROOM0!, 'botdev', 'petsanimals', 'groupchat-breadey-testing'];

export const Bot = new Client({ username: 'Lexicobot', password: process.env.PASSWORD, debug: true, avatar: 'touristf', rooms: rooms });
Bot.connect();

const bp = '_';
Bot.on('message', async message => {
	const roomRank = message.raw.split("|")[3][0];

		// Room Reg Commands
		switch(true) {
		case (message.isIntro || !message.author || !message.target || message.author.userid === message.parent.status.userid):
			break;
		case message.content.toUpperCase().includes("GOODNIGHT") && message.content.toUpperCase().includes("LEXICOBOT"):
			return message.reply("Goodnight, " + message.author.name);

		case message.content.toUpperCase().includes("HI LEXICOBOT"):
			return message.reply("Hi, " + message.author.name + "!");
		}


		// Room Auth Commands
		switch(true) {
		case !groups.includes(message.author.group) && !groups.includes(roomRank):
			break;
		case message.content.startsWith(`${bp}define `):
			const word = message.content.slice((bp + 'define ').length);
			const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
			// Fetch a word of the user's choosing
			try {
				const res = await fetch(url + word).then(response => response.json()).then(data => {
				return message.reply(`/addhtmlbox <div id="background"><h3>${data[0].word}</h3><p id="subtitle">${data[0].meanings[0].partOfSpeech}</p><hr><p>${data[0].meanings[0].definitions[0].definition}</p></div>`);
			});
			} catch (error: any) {
				return message.reply("Sorry, I couldn't find the definition for that word.");
			}
			finally {
				break;
			}
		case message.content.startsWith(`${bp}wikirace`):
			return message.reply(`Starting race from ${await wikirace.genWikilink()} to ${await wikirace.genWikilink()}`);
		

		case message.content.startsWith(`${bp}pstree `):
			return message.reply("This feature is under development.");

		case message.content.startsWith(`${bp}randcat`):
			randcat.randcat().then(result => {
				if (result) {
					const maxSize = 300;
					if (result.height < maxSize && result.width <= maxSize) {
						return message.reply(`/addhtmlbox <img src=${result.url} height=${result.height} width=${result.width} />`);
					} else {
						const ratio = Math.min(maxSize / result.height, maxSize / result.width);
						return message.reply(`/addhtmlbox <img src=${result.url} height=${Math.round(result.height * ratio)} width=${Math.round(result.height * ratio)} />`);
					}
				}
			})

			case message.content.startsWith(`${bp}randdog`):
				return message.reply(`/addhtmlbox <img src="${await randdog.randdog()}" height="300" width="300" />`)
		}


		// Room Owner Commands:
		switch(true) {
		case (message.isIntro || !message.author || !message.target || message.author.userid === message.parent.status.userid):
			break;
		case !/[#~]/.test(message.author.group) && !/[#~]/.test(roomRank) && message.author.userid != 'breadey':
			break;
		case message.content.startsWith(`${bp}echo `): // ECHOes the argument
			const inp = message.content.slice(`${bp}echo`.length);
			return message.reply(`[[]]${inp}`);
		case message.content.startsWith(`${bp}ping`): // Returns "Pong!"
			return message.reply('Pong!');
			case message.content.startsWith(`${bp}rejoinrooms`):
			const roomsToJoin: number = rooms.length;
			for (let i = 0; i < roomsToJoin; i++) {
				message.reply(`/j ${rooms[i]}`)
			}
			return message.reply('Rooms rejoined!');
		}


		// Breadey commands
		switch(true) {
		case (message.isIntro || !message.author || !message.target || message.author.userid === message.parent.status.userid):
			break;
		case message.author.userid.toUpperCase() != 'BREADEY':
			break;
		case message.content.startsWith(`${bp}todo`):
			if(helper.readFile('./todo.txt').length == 0) {
				return message.reply("There is nothing to do!");
			} else {
				return message.reply(todo.getTodo());
			}
		case message.content.startsWith(`${bp}cleartodo`):
			todo.clearTodo();
			return message.reply("To-Do List Cleared!");
	}
});
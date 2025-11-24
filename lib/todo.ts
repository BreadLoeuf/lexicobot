import { Client, Message } from 'ps-client';
import * as helper from './helpers';
import { Bot } from '../main';

export function getTodo(): void {
    Bot.on('message', async message => {
        return message.reply(`!code ${helper.readFile('./todo.txt')}`);
    })
}

export function clearTodo(): void {
    return;
}
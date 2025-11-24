import { Client, Message } from 'ps-client';
import * as helper from './helpers';
import { Bot } from '../main';

export function getTodo(): string {
    return `!code ${helper.readFile('./todo.txt')}`;
}

export function clearTodo(): void {
    return helper.clearFile('./todo.txt');
}
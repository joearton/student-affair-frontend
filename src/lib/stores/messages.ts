// src/lib/stores/messages.ts
import { writable } from 'svelte/store';

interface Message {
    id: number;
    type: string;
    text: string;
}

export const messages = writable<Message[]>([]);

export function addMessage(type: string, text: string, timeout = 5000) {
    const id = Date.now();
    messages.update((current) => [...current, { id, type, text }]);

    setTimeout(() => {
        removeMessage(id);
    }, timeout);
}

export function removeMessage(id: number) {
    messages.update((current) => current.filter((message) => message.id !== id));
}

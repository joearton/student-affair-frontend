import { writable } from "svelte/store";


interface User {
    username: string;
    email: string;
    groups: string[];
    fullname: string;
}


export const user = writable<User>({ username: '', email: '', groups: [], fullname: '' });

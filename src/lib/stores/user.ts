import { writable } from "svelte/store";


interface Application {
    scholarship_name: string;
    scholarship_code: string;
    application_date: string;
    note: string;
    status: string;
}


interface User {
    authenticated?: boolean;
    fullname: string;
    username: string;
    email: string;
    groups: string[];
    applications: Application[];
}

export const user = writable<User>({
    authenticated: false,
    fullname: '',
    username: '',
    email: '',
    groups: [],
    applications: [{
        scholarship_name: '',
        scholarship_code: '',
        application_date: '',
        note: '',
        status: ''
    }],
});

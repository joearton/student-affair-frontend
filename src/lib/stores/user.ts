import { writable } from "svelte/store";


interface Application {
    period_name: string;
    multi_applications: boolean;
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
        period_name: '',
        multi_applications: false,
        scholarship_name: '',
        scholarship_code: '',
        application_date: '',
        note: '',
        status: ''
    }],
});

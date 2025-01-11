import type { LayoutLoad } from '../$types';
import { redirect } from '@sveltejs/kit';
import { check_authentication } from '$lib/auth';


// use client side rendering
export const ssr = false;


export const load: LayoutLoad = async () => {
    const user = await check_authentication();

    if (! user) {
        redirect(307, '/auth/signin');
    }

    const menu_items = {
        'student': [
            { href: "/student/dashboard", icon: "fa-chart-simple", text: "Dashboard" },
            { href: "/student/personal-data", icon: "fa-user", text: "Personal Data" },
            { href: "/student/scholarship", icon: "fa-award", text: "Scholarship" },
            { href: "/student/my-scholarship", icon: "fa-scroll", text: "My Scholarship" },
        ],
        'reviewer': [
            { href: "/reviewer/dashboard", icon: "fa-chart-simple", text: "Dashboard" },
            { href: "/reviewer/assignment", icon: "fa-tasks", text: "Assignment" },
        ]
    }

    return { 
        user: user,
        menu_items: menu_items
    }

}

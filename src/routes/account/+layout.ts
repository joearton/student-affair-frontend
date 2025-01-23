import type { LayoutLoad } from '../$types';
import { redirect } from '@sveltejs/kit';
import { check_authentication } from '$lib/auth';
import { user as UserStore } from '$lib/stores/user';
import { addMessage } from '$lib/stores/messages';


// use client side rendering
export const ssr = false;


export const load: LayoutLoad = async () => {
    const user = await check_authentication();

    if (! user) {
        addMessage('error', 'You must be logged in to access this page.');
        redirect(307, '/auth/signin');
    }

    const menu_items = {
        'student': [
            { href: "/account", icon: "fa-chart-simple", text: "Dashboard" },
            { href: "/account/student/profile", icon: "fa-user", text: "Profile" },
            { href: "/account/student/scholarship", icon: "fa-award", text: "Scholarship" },
            { href: "/account/student/myscholarship", icon: "fa-scroll", text: "My Scholarship" },
            { href: "/", icon: "fa-newspaper", text: "View Site" },
        ],
        'reviewer': [
            { href: "/account", icon: "fa-chart-simple", text: "Dashboard" },
            { href: "/account/reviewer/scholarship", icon: "fa-tasks", text: "Assignment" },
            { href: "/", icon: "fa-newspaper", text: "View Site" },
        ]
    }

    // store to user interface
    UserStore.set({
        authenticated: true,
        fullname: user.fullname,
        username: user.username,
        email: user.email,
        groups: user.groups,
        applications: user.applications,
    });

    return { 
        user: user,
        menu_items: menu_items
    }

}

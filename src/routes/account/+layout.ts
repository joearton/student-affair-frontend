import type { LayoutLoad } from '../$types';
import { redirect } from '@sveltejs/kit';
import { check_authentication } from '$lib/auth';
import { user as UserStore } from '$lib/stores/user';
import { addMessage } from '$lib/stores/messages';
import { translate } from '$lib/translator';

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
            { href: "/account", icon: "fa-solid fa-chart-simple", text: translate('account.menu_items.student.dashboard') },
            { href: "/account/student/profile", icon: "fa-solid fa-user", text: translate('account.menu_items.student.profile') },
            { href: "/account/student/scholarship", icon: "fa-solid fa-award", text: translate('account.menu_items.student.scholarship') },
            { href: "/account/student/myscholarship", icon: "fa-solid fa-scroll", text: translate('account.menu_items.student.myscholarship') },
            { href: "/", icon: "fa-solid fa-newspaper", text: translate('account.menu_items.student.view_site') },
        ],
        'reviewer': [
            { href: "/account", icon: "fa-solid fa-chart-simple", text: translate('account.menu_items.reviewer.dashboard') },
            { href: "/account/reviewer/scholarship", icon: "fa-solid fa-tasks", text: translate('account.menu_items.reviewer.assignment') },
            { href: "/account/reviewer/scholarship", icon: "fa-solid fa-check", text: translate('account.menu_items.reviewer.approved') },
            { href: "/account/reviewer/scholarship", icon: "fa-solid fa-times", text: translate('account.menu_items.reviewer.rejected') },
            { href: "/", icon: "fa-solid fa-newspaper", text: translate('account.menu_items.reviewer.view_site') },
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



import type { PageLoad } from './$types';
import { _ } from 'svelte-i18n';


export const load: PageLoad = async () => {
    return {
        title: 'Sign In',
    }
}
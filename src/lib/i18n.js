import { browser } from '$app/environment'
import { register, init } from 'svelte-i18n';

const defaultLocale = 'id';

register('id', () => import('../locales/id.json'));
register('en', () => import('../locales/en.json'));

init({
    fallbackLocale  : 'id',
    initialLocale: browser ? window.navigator.language : defaultLocale,
});
 
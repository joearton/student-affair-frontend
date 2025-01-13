import { DateTime } from 'luxon';
import { htmlToText } from 'html-to-text';


export const create_excerpt = (content: string, length: number = 215) => {
    const text = htmlToText(content);
    return text.length > length ? text.substring(0, length) + '...' : text;
}


export const format_publication_date = (date:string, format: string = 'yyyy-MM-dd') => {
    return DateTime.fromISO(date).toFormat(format);
}

export const slugify = (text: string) => {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-');        // Replace multiple - with single -
}
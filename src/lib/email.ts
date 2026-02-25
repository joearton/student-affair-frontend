
export const send_email = async function(to: string, subject: string, text: string) {
    const response = await fetch('/api/mail/send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ to, subject, text })
    });
}



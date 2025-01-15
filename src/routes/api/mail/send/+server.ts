import { json } from '@sveltejs/kit';
import nodemailer from 'nodemailer';
import { EMAIL_USER, EMAIL_PASS } from '$env/static/private';


export async function POST({ request }) {
    try {
        const { to, subject, text } = await request.json();

        // Konfigurasi transportasi email
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: EMAIL_USER,
                pass: EMAIL_PASS
            }
        });

        // Kirim email
        await transporter.sendMail({
            from: EMAIL_USER,
            to,
            subject,
            text
        });

        return json({ message: 'E-mail is successfully sent' });
    } catch (error) {
        return json({ error: 'Error when sending e-mail' }, { status: 500 });
    }
}

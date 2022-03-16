import nodemailer from 'nodemailer';
import { ISendMail } from '@interfaces/ISendMail';
import HandlebarsMailTemplate from '@config/HandlebarsMailTemplate';

async function sendMail({
    to,
    from,
    subject,
    templateData,
}: ISendMail): Promise<any> {
    const mailTemplate = new HandlebarsMailTemplate();
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    await transporter.sendMail({
        from: {
            name: from?.name || 'Equipe Docly',
            address: from?.email || '',
        },
        to: {
            name: to.name,
            address: to.email,
        },
        subject,
        html: await mailTemplate.parse(templateData),
    });
}

export default sendMail;

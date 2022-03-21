import Logging from '@config/winston';
import nodemailer from 'nodemailer';
import { ISendMail } from '@interfaces/ISendMail';
import HandlebarsMailTemplate from '@config/HandlebarsMailTemplate';

class SendMail {
    async execute({
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

        return;
        const email = await transporter.sendMail({
            from: {
                name: 'Equipe Docly',
                address: 'admissao@docly.com.br',
            },
            to: {
                name: 'Ricardo',
                address: 'ricardo.santos@docly.com.br',
            },
            subject,
            html: await mailTemplate.parse(templateData),
        });

        Logging.info(`Email enviado para: ${email.envelope.to}`);
    }
}

export default SendMail;

import Logging from '@config/winston';
import nodemailer from 'nodemailer';
import { ISendMail } from '@interfaces/ISendMail';
import HandlebarsMailTemplate from '@config/HandlebarsMailTemplate';

class SendMail {
    async execute({
        to,
        subject,
        templateData,
        attachment,
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

        const email = await transporter.sendMail({
            from: {
                name: 'Equipe Docly',
                address: process.env.EMAIL_DOCLY || '',
            },
            to: {
                name: to.name,
                address: to.email,
            },
            subject,
            html: await mailTemplate.parse(templateData),
            attachments: attachment
                ? [
                      {
                          filename: 'planilha-agendamento.xlsx',
                          path: attachment,
                      },
                  ]
                : [],
        });

        Logging.info(`Email enviado para: ${email.envelope.to}`);
    }
}

export default SendMail;

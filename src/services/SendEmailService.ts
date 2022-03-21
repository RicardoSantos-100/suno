import path from 'path';
import Logging from '@config/winston';
import SendEmail from '@config/smtp';
import ISendEmailRequest from '@interfaces/ISendEmailRequest';

class SendEmailService {
    public async execute({ user, template }: ISendEmailRequest): Promise<void> {
        if (!user) Logging.error('User not found');

        const sendEmail = new SendEmail();

        const emailTemplate = path.resolve(
            __dirname,
            '..',
            'views',
            `${template}.hbs`,
        );

        await sendEmail.execute({
            to: {
                name: user.nome,
                email: user.email,
            },
            subject: '[Docly] Email de boas vindas',
            templateData: {
                file: emailTemplate,
                variables: {
                    nome: user.nome,
                    email: user.email,
                    dataAdmissaoPrevista: user.dataAdmissaoPrevista,
                    gestorNome: user.gestor.nome,
                    gestorEmail: user.gestor.email,
                },
            },
        });
    }
}

export default SendEmailService;

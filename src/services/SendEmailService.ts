import path from 'path';
import Logging from '@config/winston';
import sendEmail from '@config/smtp';
import IUser from '@interfaces/IUser';

class SendEmailService {
    public async execute(user: IUser): Promise<void> {
        if (!user) Logging.error('User not found');

        const emailTemplate = path.resolve(
            __dirname,
            '..',
            'views',
            'email.hbs',
        );

        await sendEmail({
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
                },
            },
        });
    }
}

export default SendEmailService;

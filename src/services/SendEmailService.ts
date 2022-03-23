import path from 'path';
import Logging from '@config/winston';
import SendEmail from '@config/smtp';
import ISendEmailRequest from '@interfaces/ISendEmailRequest';

class SendEmailService {
    public async execute({
        user,
        template,
        attachment = false,
        email,
    }: ISendEmailRequest): Promise<void> {
        if (!user) Logging.error('User not found');

        const sendEmail = new SendEmail();

        const emailTemplate = path.resolve(
            __dirname,
            '..',
            'views',
            `${template}.hbs`,
        );

        const pathXlSX = path.resolve(
            __dirname,
            '..',
            'planilhas',
            `planilha-${user._id}.xlsx`,
        );

        await sendEmail.execute({
            to: {
                name: user.gestor.nome,
                email: process.env.AMBIENTE_DEV
                    ? process.env.EMAIL_FAKE
                    : email || user.gestor.email,
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
                    cargo: user.cargo,
                    numero: user.celular,
                    dataNascimento: user.dataNascimento,
                    cpf: user.cpf,
                    rg: user.rg.numero,
                    dataAdmissao: user.dataAdmissaoPrevista,
                    mae: user.mae,
                    centroCusto: user.centroDeCusto,
                    tipoContrato: user.tipoContrato,
                    empresaNome: user.empresa.nome,
                    area: user.setor,
                },
            },
            attachment: attachment ? pathXlSX : undefined,
        });
    }
}

export default SendEmailService;

import Logging from '@config/winston';
import dotenv from 'dotenv';
import FindUsersCadastro from '@repositories/findUsersByStatus';
import sendEmails from '@controllers/sendEmailsController';
import FindUsersAdmitidos from '@repositories/findUsersAdmitidos';
import { GenerateXlsx } from '@utils/generateXlsx';

dotenv.config();
(async (): Promise<void> => {
    const sunoClienteId = process.env.SUNO_CLIENTE_ID || '';

    // if (!sunoClienteId) {
    //     Logging.info('Cliente ID da Suno não definido no dotenv');
    //     return;
    // }
    // const findUsersByStatus = new FindUsersCadastro();
    const findUsersAdmitidos = new FindUsersAdmitidos();
    const generateXlsx = new GenerateXlsx();

    // const usersCadastro = await findUsersByStatus.execute(
    //     'Cadastro',
    //     sunoClienteId,
    // );

    // const usersValidados = await findUsersByStatus.execute(
    //     'Documentos Validados',
    //     sunoClienteId,
    // );

    // await sendEmails.execute({
    //     users: usersCadastro,
    //     template: 'email-cadastro',
    //     status: 'Cadastro',
    // });

    // await sendEmails.execute({
    //     users: usersValidados,
    //     template: 'email-validado',
    //     status: 'Validados',
    // });

    const userAdmitidos = await findUsersAdmitidos.execute(sunoClienteId);

    userAdmitidos.forEach(async user => {
        generateXlsx.execute(user);
    });

    // await sendEmails.execute({
    //     users: usersValidados,
    //     template: 'email-validado',
    //     status: 'Validados',
    // });
})();

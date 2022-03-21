import dotenv from 'dotenv';
import SendEmailService from '@services/SendEmailService';
import FindUsersCadastro from '@repositories/findUsersByStatus';
import Logging from '@config/winston';
import { UserHistoryService } from '@services/UserHistoryService';

dotenv.config();
(async (): Promise<void> => {
    const sendEmailService = new SendEmailService();
    const userHistory = new UserHistoryService();
    const findUsersStatusCadastro = new FindUsersCadastro();

    const usersCadastro = await findUsersStatusCadastro.execute('Cadastro');
    const userValidados = await findUsersStatusCadastro.execute(
        'Documentos Validados',
    );
    const userAdmitidos = await findUsersStatusCadastro.execute('Admitido');

    if (usersCadastro.length) {
        usersCadastro.forEach(async user => {
            await sendEmailService.execute({
                user,
                template: 'email-cadastro',
            });
            await userHistory.execute(user.email, 'Cadastro');
        });
    }

    if (userValidados.length) {
        userValidados.forEach(async user => {
            await sendEmailService.execute({
                user,
                template: 'email-validado',
            });
            await userHistory.execute(user.email, 'Documentos Validados');
        });
    }

    if (false) {
        // userAdmitidos.forEach(async user => {
        //     await sendEmailService.execute({ user, template: 'email-validacao' });
        //     await userHistory.execute(user.email, 'email-validacao');
        // });
    }
})();

import Logging from '@config/winston';
import { ISendEmails } from '@interfaces/ISendEmails';
import SendEmailService from '@services/SendEmailService';
import { UserHistoryService } from '@services/UserHistoryService';
import { GenerateXlsx } from '@utils/generateXlsx';

class SendEmailsAdmitidos {
    async execute({ users, template, status }: ISendEmails): Promise<void> {
        if (!users.length) Logging.info('Nenhum usuário encontrado');

        const userHistory = new UserHistoryService();
        const sendEmailService = new SendEmailService();
        const generateXlsx = new GenerateXlsx();

        users.forEach(async user => {
            generateXlsx.execute(user);
            // await sendEmailService.execute({
            //     user,
            //     template,
            // });
            // await userHistory.execute(user.email, status);
        });
    }
}

export default new SendEmailsAdmitidos();

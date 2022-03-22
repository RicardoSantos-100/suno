import Logging from '@config/winston';
import { ISendEmails } from '@interfaces/ISendEmails';
import SendEmailService from '@services/SendEmailService';
import { UserHistoryService } from '@services/UserHistoryService';

class SendEmails {
    async execute({ users, template, status }: ISendEmails): Promise<void> {
        if (!users.length) Logging.info('Nenhum usuário encontrado');

        const userHistory = new UserHistoryService();
        const sendEmailService = new SendEmailService();

        users.forEach(async user => {
            await sendEmailService.execute({
                user,
                template,
            });
            await userHistory.execute(user.email, status);
        });
    }
}

export default new SendEmails();

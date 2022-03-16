import dotenv from 'dotenv';
import SendEmailService from '@services/SendEmailService';
import FindUsers from '@repositories/findUsers';
import Logging from '@config/winston';

dotenv.config();
(async (): Promise<void> => {
    const sendEmailService = new SendEmailService();
    const findUsers = new FindUsers();

    const users = await findUsers.execute();
    if (!users.length) {
        Logging.info('No users found');
        return;
    }

    users.forEach(async user => {
        Logging.info(`Enviando email para ${user.email}`);
        await sendEmailService.execute(user);
    });
})();

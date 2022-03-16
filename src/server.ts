import dotenv from 'dotenv';
import SendEmailService from '@services/SendEmailService';
import { findUsers } from './repositories/findUsers';

dotenv.config();
(async (): Promise<void> => {
    const sendEmailService = new SendEmailService();
    const users = await findUsers();

    users.forEach(async user => {
        await sendEmailService.execute(user);
    });
})();

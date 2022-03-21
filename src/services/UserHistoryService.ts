import { UpdateUserHistory } from '../repositories/updateUserHistory';

class UserHistoryService {
    public async execute(email: string, mensagem: string): Promise<void> {
        const updateUserHistory = new UpdateUserHistory();
        await updateUserHistory.execute(email, mensagem);
    }
}

export { UserHistoryService };

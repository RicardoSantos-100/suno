import { IUser } from '@interfaces/IUser';

interface ISendEmails {
    users: IUser[];
    template: string;
    status: string;
}

export { ISendEmails };

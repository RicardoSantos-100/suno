import { IUserAdmitido } from '@interfaces/IUserAdmitido';
import IUser from '@interfaces/IUser';

interface ISendEmails {
    users: IUser[] | IUserAdmitido[];
    template: string;
    status: string;
}

export { ISendEmails };

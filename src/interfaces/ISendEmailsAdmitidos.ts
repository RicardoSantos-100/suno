import { IUser } from '@interfaces/IUser';

interface ISendEmailsAdmitidos {
    users: IUser[];
    template: string;
    status: string;
}

export { ISendEmailsAdmitidos };

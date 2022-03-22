import { IUserAdmitido } from '@interfaces/IUserAdmitido';

interface ISendEmailsAdmitidos {
    users: IUserAdmitido[];
    template: string;
    status: string;
}

export { ISendEmailsAdmitidos };

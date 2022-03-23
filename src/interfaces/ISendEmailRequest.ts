import { IUserAdmitido } from '@interfaces/IUserAdmitido';

export default interface ISendEmailRequest {
    user: IUserAdmitido;
    template: string;
    attachment?: boolean;
    email?: string;
}

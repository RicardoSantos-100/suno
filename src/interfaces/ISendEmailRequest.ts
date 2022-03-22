import { IUserAdmitido } from '@interfaces/IUserAdmitido';
import IUser from '@interfaces/IUser';

export default interface ISendEmailRequest {
    user: IUser | IUserAdmitido;
    template: string;
}

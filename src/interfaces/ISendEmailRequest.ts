import { IUser } from '@interfaces/IUser';

export default interface ISendEmailRequest {
    user: IUser;
    template: string;
    attachment?: boolean;
    email?: string;
}

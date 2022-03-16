import IMailContact from '@interfaces/IMailContact';
import IParseMailTemplate from '@interfaces/IParseMailTemplate';

export interface ISendMail {
    to: IMailContact;
    from?: IMailContact;
    subject: string;
    templateData: IParseMailTemplate;
}

import ITemplateVariables from '@interfaces/ITemplateVariables';

export default interface IParseMailTemplate {
    file: string;
    variables: ITemplateVariables;
}

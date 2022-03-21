export default interface IUser {
    id: string;
    nome: string;
    email: string;
    dataAdmissaoPrevista: string;
    gestor: {
        email: 'string';
        nome: 'string';
    };
}

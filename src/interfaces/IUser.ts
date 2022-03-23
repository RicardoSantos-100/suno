export default interface IUser {
    _id: string;
    nome: string;
    email: string;
    dataAdmissaoPrevista: string;
    gestor: {
        email: 'string';
        nome: 'string';
    };
}

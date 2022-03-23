export interface IUser {
    _id: string;
    nome: string;
    email: string;
    dataAdmissaoPrevista: string;
    gestor: {
        email: string;
        nome: string;
    };
    matricula: string;
    empresa: {
        nome: string;
        cnpj: string;
    };
    data: string;
    clienteId: string;
    dataNascimento: string;
    endereco: {
        cep: string;
        numero: string;
        bairro: string;
        cidade: string;
        estado: string;
    };
    cpf: string;
    rg: {
        numero: string;
        orgaoEmissor: string;
        uf: string;
    };
    cargo: string;
    sexo: string;
    celular: string;
    tipoDeficiencia: string;
    unidade: string;
    setor: string;
    mae: string;
    tipoContrato: string;
    centroDeCusto: string;
}

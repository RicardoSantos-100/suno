import Logging from '@config/winston';
import xlsx from 'xlsx';
import { copyFile } from 'fs';
import path from 'path';
import { IUserAdmitido } from '@interfaces/IUserAdmitido';
import { cell } from './cell';

class GenerateXlsx {
    async execute(user: IUserAdmitido): Promise<void> {
        const pathXlSX = path.resolve(
            __dirname,
            '..',
            'planilhas',
            `planilha-${user._id}.xlsx`,
        );

        copyFile('planilha-agendamento.xlsx', pathXlSX, err => {
            if (err) Logging.error(`${err}`);

            const workbook = xlsx.readFile(pathXlSX);

            const sheet = workbook.Sheets[workbook.SheetNames[0]];

            sheet.A2 = cell(user.gestor.nome);
            sheet.B2 = cell(user.data || 'Não informado');
            sheet.C2 = cell(
                user.empresa && user.empresa.cnpj
                    ? user.empresa.cnpj
                    : 'Não informado',
            );
            sheet.D2 = cell(
                user.empresa && user.empresa.nome
                    ? user.empresa.nome
                    : 'Não informado',
            );
            sheet.E2 = cell(user.unidade || 'Não informado');
            sheet.F2 = cell(user.setor || 'Não informado');
            sheet.G2 = cell(user.cargo || 'Não informado');
            sheet.H2 = cell(user.matricula || 'Não informado');
            sheet.I2 = cell(user.nome || 'Não informado');
            sheet.J2 = cell(user.dataNascimento || 'Não informado');
            sheet.K2 = cell(
                user.rg && user.rg.numero ? user.rg.numero : 'Não informado',
            );
            sheet.L2 = cell(
                user.rg && user.rg.orgaoEmissor
                    ? user.rg.orgaoEmissor
                    : 'Não informado',
            );
            sheet.M2 = cell(
                user.rg && user.rg.uf ? user.rg.uf : 'Não informado',
            );
            sheet.N2 = cell(user.cpf || 'Não informado');
            sheet.O2 = cell(user.sexo || 'Não informado');
            sheet.P2 = cell(user.dataAdmissaoPrevista || 'Não informado');
            sheet.Q2 = cell('Admissional');
            sheet.R2 = cell(
                user.endereco && user.endereco.cidade
                    ? user.endereco.cidade
                    : 'Não informado',
            );
            sheet.S2 = cell(
                user.endereco && user.endereco.estado
                    ? user.endereco.estado
                    : 'Não informado',
            );
            sheet.T2 = cell(user.email || 'Não informado');
            sheet.U2 = cell(user.celular || 'Não informado');
            sheet.V2 = cell(user.tipoDeficiencia || 'Nenhuma');
            sheet.W2 = cell('Não informado');
            sheet.X2 = cell('Não informado');

            sheet['!ref'] = 'A1:X2';

            xlsx.writeFile(workbook, pathXlSX);
        });
    }
}

export { GenerateXlsx };

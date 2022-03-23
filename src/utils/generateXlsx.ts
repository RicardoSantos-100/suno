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
            sheet.B2 = cell(user.data);
            sheet.C2 = cell(user.empresa.cnpj);
            sheet.D2 = cell(user.empresa.nome);
            sheet.E2 = cell('Não informado');
            sheet.F2 = cell('Não informado');
            sheet.G2 = cell(user.cargo);
            sheet.H2 = cell(user.matricula);
            sheet.I2 = cell(user.nome);
            sheet.J2 = cell(user.dataNascimento);
            sheet.K2 = cell(user.rg.numero);
            sheet.L2 = cell(user.rg.orgaoEmissor);
            sheet.M2 = cell(user.rg.uf);
            sheet.N2 = cell(user.cpf);
            sheet.O2 = cell(user.sexo);
            sheet.P2 = cell(user.dataAdmissaoPrevista);
            sheet.Q2 = cell('Admissional');
            sheet.R2 = cell(user.endereco.cidade);
            sheet.S2 = cell(user.endereco.estado);
            sheet.T2 = cell(user.email);
            sheet.U2 = cell(user.celular);
            sheet.V2 = cell(user.tipoDeficiencia || 'Nenhuma');
            sheet.W2 = cell('Não informado');
            sheet.X2 = cell('Não informado');

            sheet['!ref'] = 'A1:X2';

            xlsx.writeFile(workbook, pathXlSX);
        });
    }
}

export { GenerateXlsx };

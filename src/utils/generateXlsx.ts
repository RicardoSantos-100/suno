import Logging from '@config/winston';
import xlsx from 'json-as-xlsx';
import { unlink, copyFile } from 'fs';
import path from 'path';

class GenerateXlsx {
    async execute(user: any): Promise<void> {
        const pathXlSX = path.resolve(
            __dirname,
            '..',
            'planilhas',
            `planilha-${user.nome.toLowerCase()}.xlsx`,
        );

        copyFile('planilha-agendamento.xlsx', pathXlSX, err => {
            if (err) Logging.error(`${err}`);
        });
    }
}

export { GenerateXlsx };

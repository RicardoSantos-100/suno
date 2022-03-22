import { IUserAdmitido } from '@interfaces/IUserAdmitido';
import axios from 'axios';

class FindUsersAdmitidos {
    public async execute(clienteId: string): Promise<IUserAdmitido[]> {
        const baseUrl = process.env.DOCLY_URL;
        const response = await axios.get(
            `${baseUrl}/suno/admissoes/admitidos?clienteId=${clienteId}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': process.env.ACCESS_TOKEN || '',
                },
            },
        );

        return response.data;
    }
}

export default FindUsersAdmitidos;

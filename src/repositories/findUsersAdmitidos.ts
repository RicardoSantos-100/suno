import axios from 'axios';
import IUser from '@interfaces/IUser';

class FindUsersAdmitidos {
    public async execute(clienteId: string): Promise<IUser[]> {
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

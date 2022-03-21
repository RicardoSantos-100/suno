import axios from 'axios';

class UpdateUserHistory {
    async execute(email: string, mensagem: string): Promise<void> {
        const baseUrl = process.env.DOCLY_URL;

        const response = await axios.post(
            `${baseUrl}/suno/admissoes/historico`,
            {
                email,
                mensagem,
            },
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

export { UpdateUserHistory };

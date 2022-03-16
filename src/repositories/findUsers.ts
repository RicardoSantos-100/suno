import axios from 'axios';
import IUser from '@interfaces/IUser';

class FindUsers {
    public async execute(): Promise<IUser[]> {
        const baseUrl = process.env.DOCLY_URL;
        const response = await axios.get(`${baseUrl}/suno/admissoes`, {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': process.env.ACCESS_TOKEN || '',
            },
        });

        return response.data;
    }
}

export default FindUsers;

import axios from 'axios';

export const service = {
    async onGet(endPoint, payload = {}) {
        return await axios.get(endPoint, payload);
    }
}
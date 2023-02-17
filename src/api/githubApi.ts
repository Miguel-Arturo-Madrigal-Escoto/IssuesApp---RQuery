
import axios from 'axios';

export const githubApi = axios.create({
    baseURL: 'https://api.github.com/repos/facebook/react',
    headers: {
        'Content-Type': 'application/json',
        // Authorization: 'Bearer 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'
    }
})
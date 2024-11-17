import axios from 'axios';

export interface UserAuth {
    id: number;
    email: string;
    password: string;
}

export class AuthService {
    private baseUrl = 'https://thirstyseedapi-production.up.railway.app/api/v1';
    private axiosInstance = axios.create({
        baseURL: this.baseUrl,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        withCredentials: false // Important for CORS
    });

    async login(email: string, password: string): Promise<UserAuth | null> {
        try {
            const response = await this.axiosInstance.post('/authentication/sign-in', {
                username: email,
                password: password,
            });

            if (response.status === 200) {
                localStorage.setItem('authToken', response.data.token);
                return response.data;
            }
            return null;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }

    async signup(newUser: { email: string; password: string }): Promise<UserAuth | null> {
        try {
            const response = await this.axiosInstance.post('/authentication/sign-up', {
                username: newUser.email,
                password: newUser.password,
            });

            if (response.status === 201) {
                return response.data;
            }
            return null;
        } catch (error) {
            console.error('Signup error:', error);
            throw error;
        }
    }

    async getLastUserId(): Promise<number | null> {
        try {
            const response = await this.axiosInstance.get('/users');

            if (response.status === 200 && response.data.length > 0) {
                return response.data[response.data.length - 1].id;
            }
            return null;
        } catch (error) {
            console.error('Get last user ID error:', error);
            throw error;
        }
    }

    logout() {
        localStorage.removeItem('authToken');
    }
}

export const authService = new AuthService();

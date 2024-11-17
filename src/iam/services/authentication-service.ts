import axios from 'axios';
import type { User } from '../model/user';

class AuthenticationService {
  // URL base de la API de autenticación
  private baseURL = 'https://thirstyseedapi-production.up.railway.app/api/v1/authentication';

  // Método para registrar un usuario
  signUp(user: User) {
    return axios.post(`${this.baseURL}/sign-up`, user, {
      headers: {
        'Content-type': 'application/json',
      },
    });
  }

  // Método para iniciar sesión
  signIn(user: User) {
    return axios.post(`${this.baseURL}/sign-in`, user, {
      headers: {
        'Content-type': 'application/json',
      },
    });
  }
}

export default new AuthenticationService();
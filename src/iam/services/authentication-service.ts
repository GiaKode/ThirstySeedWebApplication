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
  async signIn(user: User) {
    try {
      const response = await axios.post(`${this.baseURL}/sign-in`, user, {
        headers: {
          'Content-type': 'application/json',
        },
      });
      console.log('Sign in successful:', response.data);

      // Almacenar el token o el ID de usuario
      localStorage.setItem('userId', response.data.id);  // Usar la clave 'id' para el userId
      localStorage.setItem('authToken', response.data.token);  // Almacenar el token

      return response.data; // Devuelve la respuesta de datos
    } catch (error) {
      console.error('Error during sign-in:', error);
      throw error; // Lanza el error para que pueda ser manejado en el componente
    }
  }
}

export default new AuthenticationService();

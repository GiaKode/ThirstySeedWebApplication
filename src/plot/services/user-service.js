import axios from 'axios';

const API_URL = 'http://localhost:3000/users';

export const userService = {
  async getCurrentUser() {
    const currentUserEmail = localStorage.getItem('userEmail');
    if (!currentUserEmail) return null;
    const response = await axios.get(API_URL);
    return response.data.find(user => user.email === currentUserEmail);
  },

  async loginUser(email) {
    localStorage.setItem('userEmail', email);
  },

  logoutUser() {
    localStorage.removeItem('userEmail');
  },

  async addPlotToUser(plotId) {
    const currentUser = await this.getCurrentUser();
    if (!currentUser) throw new Error("User not logged in");

    // Asegurarse de que `currentUser.plots` sea un array
    currentUser.plots = currentUser.plots || [];

    // Agregar la parcela a la lista de parcelas del usuario si no está ya presente
    if (!currentUser.plots.includes(plotId.toString())) {
      currentUser.plots.push(plotId.toString());

      // Actualizar el usuario en la base de datos
      await axios.put(`${API_URL}/${currentUser.id}`, currentUser);
    }
  },

  async updateUserPlan(userId, plan) {
    return axios.patch(`${API_URL}/${userId}`, { plan });
  }
};

import http from '../../shared/core/http-common';
import type { Plot } from '../models/Plot';

class PlotManagementService {
  getAll() {
    return http.get<Plot[]>('/plots');
  }

  get(id: number) {
    return http.get<Plot>(`/plots/${id}`);
  }

  create(data: Plot) {
    return http.post<Plot>('/plots', data);
  }

  update(id: number, data: Plot) {
    return http.put<Plot>(`/plots/${id}`, data); 
  }
  
  delete(id: number) {
    return http.delete<void>(`/plots/${id}`);
  }
}

export default new PlotManagementService();
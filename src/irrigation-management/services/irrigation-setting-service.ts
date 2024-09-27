import http from '../../shared/core/http-common';
import type { IrrigationSettings } from '../models/IrrigationSettings';

class IrrigationSettingsService {
  getAll() {
    return http.get<IrrigationSettings[]>('/irrigations');
  }

  get(id: number) {
    return http.get<IrrigationSettings>(`/irrigations/${id}`);
  }

  create(data: IrrigationSettings) {
    return http.post<IrrigationSettings>('/irrigations', data);
  }

  update(id: number, data: IrrigationSettings) {
    return http.put<IrrigationSettings>(`/irrigations/${id}`, data); 
  }
  
  delete(id: number) {
    return http.delete<void>(`/irrigations/${id}`);
  }
}

export default new IrrigationSettingsService();
import http from '../../shared/core/http-common';
import type { IrrigationSettings } from '../models/IrrigationSettings';

class IrrigationSettingsService {
  getAll() {
    return http.get<IrrigationSettings[]>('/irrigationSchedules');
  }

  get(id: number) {
    return http.get<IrrigationSettings>(`/irrigationSchedules/${id}`);
  }

  create(data: IrrigationSettings) {
    return http.post<IrrigationSettings>('/irrigationSchedules', data);
  }

  update(id: number, data: IrrigationSettings) {
    return http.put<IrrigationSettings>(`/irrigationSchedules/${id}`, data); 
  }
  
  delete(id: number) {
    return http.delete<void>(`/irrigationSchedules/${id}`);
  }
}

export default new IrrigationSettingsService();
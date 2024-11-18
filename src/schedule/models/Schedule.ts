export interface Schedule {
  id?: number;
  plotId: number;
  expectedMoisture: number;
  estimatedTimeHours: number;
  waterAmount: number;
  sprinklerRadius: number;
  setTime: string;
  angle: number;
  pressure: number;
  isAutomatic: boolean;
}
export interface IrrigationSettings {
  id?: number;
  plotId: number;
  expectedMoisture: string;
  estimatedTime: string;
  requiredWaterAmount: string;
  sprinklerRadius: string;
  setTime: string;
  angle: string;
  pressure: string;
  isAutomatic: boolean;
}
export interface IrrigationSettings {
  id?: number;
  plotId: number;
  expectedMoisture: string;
  plotSize: string;
  estimatedTime: string;
  setTime: string;
  requiredWaterAmount: string;
  sprinklerRadius: string;
  angle: string;
  pressure: string;
  isAutomatic: boolean;
}
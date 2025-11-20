
export interface WorkOrder {
  id: string;
  product: string;
  quantity: number;
  status: 'pending' | 'processing' | 'completed';
}

export interface MachineParameter {
  name: string;
  value: string | number;
  unit?: string;
}

export interface MaintenanceRecord {
  id: string;
  date: string;
  type: string;
  technician: string;
  description: string;
  status: 'completed' | 'pending';
}

export interface Machine {
  id: string;
  name: string;
  model: string;
  status: 'running' | 'idle' | 'stopped' | 'error' | 'warning' | 'debugging';
  speed: number; // m/min
  width: string; // mm
  outputHourly: number; // pieces/hour
  totalArea: number; // m²
  image: string;
  temperature: number;
  humidity: number;
  voltage: number;
  openRate: number; // percentage
  params: MachineParameter[];
  workOrders: WorkOrder[];
  maintenanceLog?: MaintenanceRecord[];
}

export interface Alarm {
  id: string;
  machineId: string;
  time: string;
  type: string;
  status: 'resolved' | 'pending';
  severity: 'low' | 'medium' | 'high';
}

export interface User {
  id: string;
  username: string;
  role: string;
  lastLogin: string;
  status: 'active' | 'disabled';
}

export enum GeminiModel {
  FLASH = 'gemini-2.5-flash',
  PRO_VISION = 'gemini-2.5-flash',
  TTS = 'gemini-2.5-flash-preview-tts',
}

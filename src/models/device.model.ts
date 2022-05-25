export interface Device {
  id: string;
  name: string;
  type: "television" | "fridge" | "fan" | "aircon";
  isDeviceOn?: boolean;
  lastTurnedOn?: Date;
  lastTurnedOff?: Date;
  usage?: number;
}

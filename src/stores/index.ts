import { defineStore } from "pinia";
import type { Device } from "@/models/device.model";

export type RootState = {
  devices: Device[];
};

export const useDevicesStore = defineStore("devices", {
  state: () =>
    ({
      devices: [],
    } as RootState),
  actions: {
    createNewDevice(device: Device) {
      if (!device) return;

      device.isDeviceOn = false;
      device.usage = ~~(Math.random() * 100);

      this.devices.push(device);
    },

    deleteDevice(id: string) {
      const index = this.findIndexById(id);

      if (index === -1) return;

      this.devices.splice(index, 1);
    },

    findIndexById(id: string): number {
      return this.devices.findIndex((device) => device.id === id);
    },

    turnDeviceOn(id: string) {
      const index = this.findIndexById(id);

      if (index === -1) return;

      this.devices[index].isDeviceOn = true;
      this.devices[index].lastTurnedOn = new Date();
    },

    turnDeviceOff(id: string) {
      const index = this.findIndexById(id);

      if (index === -1) return;

      this.devices[index].isDeviceOn = false;
      this.devices[index].lastTurnedOff = new Date();
    },

    getDeviceByID(id: string) {
      const index = this.findIndexById(id);

      if (index === -1) return;

      return this.devices[index];
    },
  },
});

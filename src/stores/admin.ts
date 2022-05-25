import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export const useAdminStore = defineStore("admin", {
  state: () => ({
    token: useStorage("token", "" as string),
  }),
  actions: {
    addToken(token: string) {
      this.token = token;
    },
  },
});

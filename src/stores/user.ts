import type { UserType } from "@/models/Misc.model";
import type { Student } from "@/models/Student.model";
import type { Teacher } from "@/models/Teacher.model";
import type { User } from "@/models/User.model";
import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: useStorage("user", {} as User | Teacher | Student),
    token: useStorage("token", "" as string),
    type: useStorage("type", "" as UserType),
  }),
  actions: {
    initUser(userObj: User | Student | Teacher, token: string, type: UserType) {
      this.user = userObj;
      this.token = token;
      this.type = type;
    },

    updateUser(userObj: User | Student | Teacher) {
      this.user = userObj;
    },

    clearData() {
      this.user = {} as User;
      this.token = "";
      this.type = "";
    },
  },
});

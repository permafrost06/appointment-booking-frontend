import type { Student } from "./Student.model";
import type { Teacher } from "./Teacher.model";

export interface SignInResponse {
  token: string;
  userObj: Student | Teacher;
}

export type UserType = "student" | "teacher" | "admin";

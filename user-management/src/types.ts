export type UserStatus = "active" | "locked";
export type ThemeMode = "light" | "dark";

export interface User {
  id: number;
  name: string;
  email: string;
  status: UserStatus;
  dateOfBirth: string;
  initials: string;
}

export interface NewUser extends Omit<User, "id"> {
  id?: number;
}

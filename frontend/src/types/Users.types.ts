export interface IUser {
  id?: number;
  name: string;
  email: string;
  department: string;
  role: string;
  skill: string;
}

export interface IAddUserForm {
  name: string;
  email: string;
  department: string;
  role: string;
  skill: string;
}


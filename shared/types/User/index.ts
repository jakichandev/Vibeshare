export interface UserError {
  isError: boolean;
  code: number | null;
  label: string;
  value: string;
}

export interface User {
  id: string;
  nickname: string;
  name?: string;
  surname?: string;
  logged: boolean;
}

export interface User {
  id: number;
  email: string;
  password: string;
  recovery_token: null;
  role: string;
  token?: string;
}

export interface CreateUserDto {
  email: string;
  password: string;
  role: string;
}

export interface UpdatePassDto
  extends Omit<User, 'recovery_token' | 'token' | 'role'> {
  newPassword: string;
}

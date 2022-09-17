export interface IAuth {
  access_token: string;
}

export interface AuthChangePasswordDto {
  token: string;
  newPassword: string;
}

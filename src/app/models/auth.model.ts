export interface Auth {
  access_token: string;
}

export interface AuthChangePasswordDto {
  token: string;
  newPassword: string;
}

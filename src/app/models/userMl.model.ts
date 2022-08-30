export interface UserMl {
  id: number;
  user_id: number;
  nickname: string;
  permalink: string;
  site_id: string;
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  refresh_token: string;
}

export interface createUseMlDto extends Omit<UserMl, 'user_id'> {}

export interface updateUserMlDto {
  access_token: string;
  token_type: string;
  scope: string;
  expires_in: number;
  refresh_token: string;
}

export interface UserMl {
  id: number;
  user_id: number;
  nickname: string;
  permalink: string;
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  refresh_token: string;
  site_id: string;
}

export interface createUseMlDto extends Omit<UserMl, 'user_id'> {}

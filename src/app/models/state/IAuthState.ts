import { Roles } from '@core/data/enums';

export interface IAuthState {
  id: number | null;
  email: string | null;
  role: Roles | null;
  token: string | null;
  ml_id: number | null;
  nickname: string | null;
  access_token: string | null;
  refresh_token: string | null;
}

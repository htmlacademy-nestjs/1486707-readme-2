import { UserRole } from './user-role.enum';

export interface TokenPayload {
  sub: string;
  email: string;
  name: string;
  avatar?: string;
  role: UserRole;
  subscriptions?: string[];
}
import { UserRole } from './user-role.enum';

export interface User {
  id?: string;
  email: string;
  avatar?: string;
  role: UserRole;
  passwordHash: string;
}

import { User } from '../../entities/User';

export interface IAuthService {
  login(email: string, pass: string): Promise<User>;
  logout(): Promise<void>;
  getCurrentUser(): User | null;
}

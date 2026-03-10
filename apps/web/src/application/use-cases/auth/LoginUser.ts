import { IAuthService } from '../../../domain/ports/out/IAuthService';
import { INotificationService } from '../../../domain/ports/out/INotificationService';
import { ILoginUseCase } from '../../ports/in/ILoginUseCase';
import { User } from '../../../domain/entities/User';

export class LoginUser implements ILoginUseCase {
  constructor(
    private authService: IAuthService,
    private notification: INotificationService
  ) {}

  async execute(email: string, password: string): Promise<User> {
    try {
      const user = await this.authService.login(email, password);
      this.notification.notify(`Bem-vindo de volta, ${user.name}!`, 'success');
      return user;
    } catch (error: any) {
      this.notification.notify(error.message, 'error');
      throw error;
    }
  }
}

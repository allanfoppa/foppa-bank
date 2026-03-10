import { IAuthService } from '../../../domain/ports/out/IAuthService';
import { ILogoutUseCase } from '../../ports/in/ILogoutUseCase';

export class LogoutUser implements ILogoutUseCase {
  constructor(private authService: IAuthService) {}

  async execute(): Promise<void> {
    await this.authService.logout();
  }
}

import { IAuthService } from "../../../domain/ports/out/IAuthService";
import { User } from "../../../domain/entities/User";

export class InMemoryAuthService implements IAuthService {
  private currentUser: User | null = null;

  async login(email: string, pass: string): Promise<User> {
    await new Promise((res) => setTimeout(res, 800));
    if (email === "admin@foppa.com" && pass === "123456") {
      this.currentUser = { id: "123", name: "Foppa Developer", email };
      return this.currentUser;
    }
    throw new Error("Credenciais inválidas!");
  }

  async logout(): Promise<void> {
    this.currentUser = null;
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }
}

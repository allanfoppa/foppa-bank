export type CreateAccountCommand = {
  name: string;
  email: string;
  initialDeposit: number;
};

export type CreateAccountResult = {
  id: string;
  name: string;
  email: string;
  balance: number;
};

export interface CreateAccountUseCase {
  execute(command: CreateAccountCommand): Promise<CreateAccountResult>;
}

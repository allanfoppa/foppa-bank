export type GetAccountCommand = {
  email: string;
};

export type GetAccountResult = {
  id: string;
  name: string;
  email: string;
  balance: number;
};

export interface GetAccountUseCase {
  execute(command: GetAccountCommand): Promise<GetAccountResult>;
}

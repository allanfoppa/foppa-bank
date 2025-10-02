export type CreateAccountDto = {
  name: string;
  email: string;
  initialDeposit: number;
};

export type GetAccountDto = {
  id: string;
  name: string;
  balance: number;
  email: string;
};

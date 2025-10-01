import { SuccessCodes } from '../codes/success-codes';

export class AccountDomainSuccess {
  public readonly internalCode: string;
  public readonly eventName: string;
  public readonly message: string;
  public readonly data: unknown;

  private constructor(
    internalCode: string,
    message: string,
    eventName: string,
    data: unknown,
  ) {
    this.internalCode = internalCode;
    this.message = message;
    this.eventName = eventName;
    this.data = data;
  }

  static accountCreated(email: string, data: unknown) {
    return new AccountDomainSuccess(
      SuccessCodes.E001.internalCode,
      SuccessCodes.E001.format(email),
      'AccountCreatedWithSuccess',
      data,
    );
  }
}

import { ErrorCodes } from '../codes/error-codes';

export class AccountDomainException extends Error {
  public readonly internalCode: string;

  private constructor(message: string, name: string, internalCode: string) {
    super(message);
    this.name = name;
    this.internalCode = internalCode;
  }

  static nameRequired() {
    return new AccountDomainException(
      ErrorCodes.E002.message,
      'NameRequiredValidationException',
      ErrorCodes.E002.internalCode,
    );
  }

  static validEmailRequired() {
    return new AccountDomainException(
      ErrorCodes.E003.message,
      'ValidEmailRequiredValidationException',
      ErrorCodes.E003.internalCode,
    );
  }

  static initialDepositCannotBeNegative() {
    return new AccountDomainException(
      ErrorCodes.E004.message,
      'InitialDepositCannotBeNegativeValidationException',
      ErrorCodes.E004.internalCode,
    );
  }

  static accountAlreadyExists(email: string) {
    return new AccountDomainException(
      ErrorCodes.E001.format(email),
      'AccountAlreadyExistsException',
      ErrorCodes.E001.internalCode,
    );
  }
}

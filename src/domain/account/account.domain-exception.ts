export class DomainValidationException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DomainValidationException';
  }
}

export class AccountAlreadyExistsException extends Error {
  constructor(email: string) {
    super(`Account already exists for email: ${email}`);
    this.name = 'AccountAlreadyExistsException';
  }
}

import { ErrorCodes } from '../../codes/errors.codes';

export class MetadataDomainException extends Error {
  public readonly internalCode: string;

  private constructor(message: string, name: string, internalCode: string) {
    super(message);
    this.name = name;
    this.internalCode = internalCode;
  }

  static metadataNotFound() {
    return new MetadataDomainException(
      ErrorCodes.E006.message,
      'MetadataNotFoundException',
      ErrorCodes.E006.internalCode,
    );
  }
}

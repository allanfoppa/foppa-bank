import { SuccessCodes } from '../../codes/success.codes';

export class MetadataDomainSuccess {
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

  static metadataFound(data: unknown) {
    return new MetadataDomainSuccess(
      SuccessCodes.S003.internalCode,
      SuccessCodes.S003.message,
      'MetadataFoundWithSuccess',
      data,
    );
  }

}

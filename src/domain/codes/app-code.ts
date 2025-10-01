export class AppCode {
  constructor(
    public readonly internalCode: string,
    public readonly message: string,
  ) {}

  format(...args: string[]): string {
    let msg = this.message;
    args.forEach((val) => {
      msg = msg.replace('%s', val);
    });
    return msg;
  }
}

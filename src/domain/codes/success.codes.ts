import { AppCode } from './app.codes';

/**
 * A map of success codes to their corresponding SuccessCode instances.
 *
 * @example
 * const msg = SuccessCodes.E001.message;
 * or
 * const msg = SuccessCodes.E001.format('allan@example.com.br');
 */
export const SuccessCodes: Record<string, AppCode> = {
  S001: new AppCode('S001', 'Account created successfully for email: %s'),
  S002: new AppCode('S002', 'Account found successfully.'),
};

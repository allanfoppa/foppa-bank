import { AppCode } from './app-code';

/**
 * A map of success codes to their corresponding SuccessCode instances.
 *
 * @example
 * const msg = SuccessCodes.E001.message;
 * or
 * const msg = SuccessCodes.E001.format('allan@example.com.br');
 */
export const SuccessCodes: Record<string, AppCode> = {
  E001: new AppCode('E001', 'Account created successfully for email: %s'),
};

import { AppCode } from './app-code';

/**
 * A map of error codes to their corresponding ErrorCode instances.
 *
 * @example
 * const msg = ErrorCodes.E001.message;
 * or
 * const msg = ErrorCodes.E001.format('allan@example.com.br');
 */
export const ErrorCodes: Record<string, AppCode> = {
  E001: new AppCode('E001', 'Account already exists for email: %s'),
  E002: new AppCode('E002', 'Name is required'),
  E003: new AppCode('E003', 'Valid email is required'),
  E004: new AppCode('E004', 'Initial deposit cannot be negative'),
};

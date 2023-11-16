/**
 * Errors that should be printed without stacktrace.
 */
export class UserError extends Error {
  constructor(message: string) {
    super(message);
  }
}

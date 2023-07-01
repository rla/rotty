let isQuiet = false;

/**
 * Writes message to stdout.
 */
export const logStatus = (message: string) => {
  if (!isQuiet) {
    console.log(message);
  }
};

/**
 * Allows to enable/disable logging to stdout.
 */
export const setQuiet = (quiet: boolean) => {
  isQuiet = quiet;
};

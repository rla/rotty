import { join } from "node:path";

/**
 * Returns checksums directory. This should be .checksums inside
 * the root directory.
 */
export const getChecksumsDirectory = (absoluteRootDirectory: string) => {
  return join(absoluteRootDirectory, ".checksums");
};

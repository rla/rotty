import { basename } from "node:path";

/**
 * Checks whether the given filename is a checksums file.
 */
export const isChecksumsFile = (filename: string) => {
  const filenamePortion = basename(filename);
  return /^checksums-\d+\.json$/.test(filenamePortion);
};

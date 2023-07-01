import { extractTimestamp } from "./extractTimestamp.js";
import { isChecksumsFile } from "./isChecksumsFile.js";

/**
 * Finds latest checksums file from the array of file names. If there
 * is no checksums file then this function returns null.
 */
export const findLatestChecksumsFile = (filenames: string[]): string | null => {
  const checksumFiles = filenames.filter((filename) => isChecksumsFile(filename));

  checksumFiles.sort((filename1, filename2) => {
    const timestamp1 = extractTimestamp(filename1);
    const timestamp2 = extractTimestamp(filename2);

    return timestamp1 === timestamp2 ? 0 : timestamp1 > timestamp2 ? -1 : 1;
  });

  return checksumFiles.length > 0 ? checksumFiles[0] : null;
};

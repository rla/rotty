import { readdir } from "node:fs/promises";
import { join } from "node:path";
import { isChecksumsFile } from "./isChecksumsFile.js";

/**
 * Finds checksum files in the given directory.
 */
export const findChecksumFiles = async (directory: string) => {
  const directoryEntries = await readdir(directory);
  return directoryEntries
    .filter((entry) => isChecksumsFile(entry))
    .map((entry) => join(directory, entry));
};

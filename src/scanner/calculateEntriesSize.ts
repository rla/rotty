import { stat } from "node:fs/promises";
import { join } from "node:path";

/**
 * Calculates the total size of entries.
 */
export const calculateEntriesSize = async (
  absoluteRootDirectory: string,
  entries: string[]
) => {
  let totalSizeBytes = 0;
  for (const entry of entries) {
    const filename = join(absoluteRootDirectory, entry);
    const fileStat = await stat(filename);
    totalSizeBytes += fileStat.size;
  }
  return totalSizeBytes;
};

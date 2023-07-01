import { join } from "node:path";
import { getChecksumsDirectory } from "./getChecksumsDirectory.js";

/**
 * Creates fresh checksums filename. The filename will contain
 * the current timestamp.
 */
export const createChecksumsFilename = (absoluteRootDirectory: string) => {
  const filename = `checksums-${Date.now()}.json`;
  return join(getChecksumsDirectory(absoluteRootDirectory), filename);
};

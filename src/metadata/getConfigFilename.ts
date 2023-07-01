import { join } from "node:path";
import { getChecksumsDirectory } from "./getChecksumsDirectory.js";

/**
 * Returns the configuration filename of the root directory.
 */
export const getConfigFilename = (absoluteRootDirectory: string) => {
  return join(getChecksumsDirectory(absoluteRootDirectory), "config.json");
};

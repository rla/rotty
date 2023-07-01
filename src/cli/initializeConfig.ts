import { mkdir, writeFile } from "fs/promises";
import { getChecksumsDirectory } from "../metadata/getChecksumsDirectory.js";
import { getConfigFilename } from "../metadata/getConfigFilename.js";
import { logStatus } from "../log/logStatus.js";
import { defaultConfig } from "../config/defaultConfig.js";

/**
 * Checks whether the error is file or directory exist error.
 */
const isExistsError = (err: unknown) =>
  typeof err === "object" && err !== null && "code" in err && err.code === "EEXIST";

/**
 * Creates new checksums directory and config file at the given location.
 */
export const initializeConfig = async (absoluteRootDirectory: string) => {
  const checksumsDirectory = getChecksumsDirectory(absoluteRootDirectory);

  try {
    await mkdir(checksumsDirectory);
  } catch (err) {
    if (isExistsError(err)) {
      // All good, the directory exists already.
    } else {
      throw err;
    }
  }

  const configFile = getConfigFilename(absoluteRootDirectory);

  try {
    await writeFile(configFile, JSON.stringify(defaultConfig, null, 2) + "\n", {
      encoding: "utf8",
      flag: "wx"
    });
    logStatus(`The config file ${configFile} was created.`);
  } catch (err) {
    if (isExistsError(err)) {
      logStatus(`The config file ${configFile} exists already.`);
    } else {
      throw err;
    }
  }
};

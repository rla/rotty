import { readFile } from "node:fs/promises";
import { Config } from "./Config.js";
import { validateConfig } from "./validateConfig.js";

/**
 * Reads and validates the configuration.
 */
export const readConfig = async (filename: string): Promise<Config> => {
  const config = JSON.parse(await readFile(filename, "utf8"));
  await validateConfig(config);
  return config as Config;
};

import { readFile } from "node:fs/promises";
import { validate } from "jsonschema";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SCHEMA_FILENAME = join(__dirname, "..", "..", "config-schema.json");

/**
 * Validates the config file contents.
 */
export const validateConfig = async (config: unknown) => {
  const schema = JSON.parse(await readFile(SCHEMA_FILENAME, "utf8"));
  const result = validate(config, schema);
  if (!result.valid) {
    throw new Error(
      `Configuration file error: ${result.errors[0].property}: ${result.errors[0].message}.`
    );
  }
};

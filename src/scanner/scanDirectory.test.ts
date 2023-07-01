import { describe, it } from "node:test";
import { deepEqual } from "node:assert";
import { join } from "node:path";
import { scanDirectory } from "./scanDirectory.js";
import { readConfig } from "../config/readConfig.js";
import { TEST_FILES_ROOT } from "../test-utils/paths.js";
import { getConfigFilename } from "../metadata/getConfigFilename.js";

describe("scanDirectory function", () => {
  it("should correctly scan directory tree", async () => {
    const absoluteRootDirectory = join(TEST_FILES_ROOT, "good");
    const config = await readConfig(getConfigFilename(absoluteRootDirectory));
    const entries = await scanDirectory(absoluteRootDirectory, config);

    deepEqual(entries.length, 1);
    deepEqual(entries[0], "path/to/file.txt");
  });
});

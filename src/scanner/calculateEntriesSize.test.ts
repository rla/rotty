import { describe, it } from "node:test";
import { deepEqual } from "node:assert";
import { join } from "node:path";
import { scanDirectory } from "./scanDirectory.js";
import { readConfig } from "../config/readConfig.js";
import { calculateEntriesSize } from "./calculateEntriesSize.js";
import { getConfigFilename } from "../metadata/getConfigFilename.js";
import { TEST_FILES_ROOT } from "../test-utils/paths.js";

describe("calculateEntriesSize function", () => {
  it("should correctly calculate the size of files", async () => {
    const absoluteRootDirectory = join(TEST_FILES_ROOT, "good");
    const config = await readConfig(getConfigFilename(absoluteRootDirectory));
    const entries = await scanDirectory(absoluteRootDirectory, config);
    const totalSizeBytes = await calculateEntriesSize(absoluteRootDirectory, entries);

    deepEqual(totalSizeBytes, 12);
  });
});

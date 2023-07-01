import { describe, it } from "node:test";
import { deepEqual } from "node:assert";
import { readConfig } from "./readConfig.js";
import { join } from "node:path";
import { TEST_FILES_ROOT } from "../test-utils/paths.js";

describe("readConfig function", () => {
  it("should correctly read good config file", async () => {
    const config = await readConfig(
      join(TEST_FILES_ROOT, "good", ".checksums", "config.json")
    );
    deepEqual(config.skip, ["skip-test"]);
    deepEqual(config.skipDotfiles, true);
  });
});

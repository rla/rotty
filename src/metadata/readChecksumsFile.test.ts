import { describe, it } from "node:test";
import { strictEqual } from "node:assert";
import { join } from "node:path";
import { readChecksumsFile } from "./readChecksumsFile.js";
import { TEST_FILES_ROOT } from "../test-utils/paths.js";

describe("readChecksumsFile function", () => {
  it("should correctly read checksums file", async () => {
    const entries = await readChecksumsFile(
      join(TEST_FILES_ROOT, "good", ".checksums", "checksums-1000.json")
    );

    strictEqual(entries.length, 1);
    strictEqual(entries[0].path, "test.txt");
    strictEqual(entries[0].sha1, "abc1234");
  });
});

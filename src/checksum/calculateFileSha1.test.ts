import { describe, it } from "node:test";
import { deepEqual } from "node:assert";
import { join } from "node:path";
import { calculateFileSha1 } from "./calculateFileSha1.js";
import { ReadCounter } from "../progress/ReadCounter.js";
import { TEST_FILES_ROOT } from "../test-utils/paths.js";

describe("calculateFileSha1 function", () => {
  it("should correctly calculate file sha1 checksum", async () => {
    const readCounter = new ReadCounter();
    const sha1 = await calculateFileSha1(
      join(TEST_FILES_ROOT, "good", "path", "to", "file.txt"),
      readCounter
    );

    deepEqual(sha1, "33ab5639bfd8e7b95eb1d8d0b87781d4ffea4d5d");
    deepEqual(readCounter.getReadBytes(), 12);
  });
});

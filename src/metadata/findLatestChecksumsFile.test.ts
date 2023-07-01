import { describe, it } from "node:test";
import { strictEqual } from "node:assert";
import { findLatestChecksumsFile } from "./findLatestChecksumsFile.js";

describe("findLatestChecksumsFile function", () => {
  it("should find filename with latest timestamp", () => {
    strictEqual(
      findLatestChecksumsFile([
        "checksums-123.json",
        "checksums-231.json",
        "checksums-213.json"
      ]),
      "checksums-231.json"
    );
  });

  it("should return null if there are no matching filenames", () => {
    strictEqual(findLatestChecksumsFile(["config.json"]), null);
  });
});

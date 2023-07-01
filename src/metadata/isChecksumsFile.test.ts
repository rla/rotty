import { describe, it } from "node:test";
import { strictEqual } from "node:assert";
import { isChecksumsFile } from "./isChecksumsFile.js";

describe("isChecksumsFile function", () => {
  it("should pass valid filename", () => {
    strictEqual(isChecksumsFile("checksums-123.json"), true);
  });

  it("should not pass config filename", () => {
    strictEqual(isChecksumsFile("config.json"), false);
  });
});

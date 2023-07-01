import { describe, it } from "node:test";
import { strictEqual, throws } from "node:assert";
import { extractTimestamp } from "./extractTimestamp.js";

describe("extractTimestamp function", () => {
  it("should extract from valid filename", () => {
    strictEqual(extractTimestamp("checksums-123.json"), 123);
  });

  it("should not allow invalid filename", () => {
    throws(() => extractTimestamp("config.json"));
  });
});

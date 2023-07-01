import { describe, it } from "node:test";
import { strictEqual } from "node:assert";
import { createChecksumsFilename } from "./createChecksumsFilename.js";
import { isChecksumsFile } from "./isChecksumsFile.js";

describe("createChecksumsFilename function", () => {
  it("should create valid filename", () => {
    const filename = createChecksumsFilename("/test");
    strictEqual(isChecksumsFile(filename), true);
  });
});

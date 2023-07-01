import { describe, it } from "node:test";
import { deepEqual } from "node:assert";
import { createEntryMap } from "./createEntryMap.js";

describe("createEntryMap function", () => {
  it("should return a map instance", async () => {
    const map = createEntryMap([
      { path: "/path/to/file.txt", mtimeMs: 123, sha1: "abc123" }
    ]);
    deepEqual(map.size, 1);
    deepEqual(map.get("/path/to/file.txt")?.sha1, "abc123");
  });
});

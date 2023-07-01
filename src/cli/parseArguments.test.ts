import { describe, it } from "node:test";
import { strictEqual } from "node:assert";
import { parseArguments } from "./parseArguments.js";

describe("parseArguments function", () => {
  it("should correctly parse directory argument", async () => {
    const args = parseArguments(["node", "index.js", "test-directory"]);

    strictEqual(args.directory, "test-directory");
    strictEqual(args.isInitMode, false);
  });

  it("should correctly parse directory argument in init mode, case 1", async () => {
    const args = parseArguments(["node", "index.js", "test-directory", "--init"]);

    strictEqual(args.directory, "test-directory");
    strictEqual(args.isInitMode, true);
  });

  it("should correctly parse directory argument in init mode, case 2", async () => {
    const args = parseArguments(["node", "index.js", "--init", "test-directory"]);

    strictEqual(args.directory, "test-directory");
    strictEqual(args.isInitMode, true);
  });

  it("should correctly handle missing directory argument, case 1", async () => {
    const args = parseArguments(["node", "index.js"]);

    strictEqual(args.directory, undefined);
    strictEqual(args.isInitMode, false);
  });

  it("should correctly handle missing directory argument, case 2", async () => {
    const args = parseArguments(["node", "index.js", "--init"]);

    strictEqual(args.directory, undefined);
    strictEqual(args.isInitMode, true);
  });
});

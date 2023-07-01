import { describe, it } from "node:test";
import { rejects } from "node:assert";
import { validateConfig } from "./validateConfig.js";

describe("validateConfig function", () => {
  it("correct configuration should pass validation", async () => {
    await validateConfig({
      skip: [".DS_Store"],
      skipDotfiles: false
    });
  });

  it("should reject invalid configuration", () => {
    rejects(() => validateConfig({ k: "invalid" }));
  });
});

#!/usr/bin/env node

import { resolve } from "node:path";
import { verifyAndUpdate } from "./cli/verifyAndUpdate.js";
import { logStatus } from "./log/logStatus.js";
import { parseArguments } from "./cli/parseArguments.js";
import { initializeConfig } from "./cli/initializeConfig.js";
import { UserError } from "./cli/UserError.js";

(async () => {
  try {
    const args = parseArguments(process.argv);
    if (args.directory === undefined) {
      logStatus(`Command line: rotty <directory> [--init]`);
      throw new UserError("Directory not provided.");
    }
    const absoluteRootDirectory = resolve(args.directory);
    if (args.isInitMode) {
      await initializeConfig(absoluteRootDirectory);
      process.exit(0);
    } else {
      const verificationPassed = await verifyAndUpdate(absoluteRootDirectory);
      process.exit(verificationPassed ? 0 : 1);
    }
  } catch (err) {
    if (err instanceof UserError) {
      console.error(err.message);
    } else {
      console.error(err);
    }
    process.exit(1);
  }
})();

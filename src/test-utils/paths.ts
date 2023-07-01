import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Root directory for test files.
 */
export const TEST_FILES_ROOT = join(__dirname, "..", "..", "test-files");

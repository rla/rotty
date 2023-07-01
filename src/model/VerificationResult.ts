import { FileEntry } from "./FileEntry.js";

/**
 * Type to contain verification results.
 */
export type VerificationResult = {
  /**
   * Updated entries with potential new mtimeMs and checksum.
   */
  entries: FileEntry[];
  /**
   * Failed entries.
   */
  failed: FileEntry[];
  /**
   * Modified entries.
   */
  modified: FileEntry[];
};

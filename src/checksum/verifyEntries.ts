import { join } from "node:path";
import { calculateFileSha1 } from "./calculateFileSha1.js";
import { FileEntry } from "../model/FileEntry.js";
import { ReadCounter } from "../progress/ReadCounter.js";
import { stat } from "node:fs/promises";
import { VerificationResult } from "../model/VerificationResult.js";
import { createEntryMap } from "../model/createEntryMap.js";
import { logStatus } from "../log/logStatus.js";

/**
 * Calculates sha1 checksum for the array of scan entries.
 * Verifies or skips the files.
 */
export const verifyEntries = async (
  absoluteRootDirectory: string,
  entries: string[],
  readCounter: ReadCounter,
  previousEntries: FileEntry[]
): Promise<VerificationResult> => {
  const previousEntriesMap = createEntryMap(previousEntries);
  const result: VerificationResult = {
    entries: [],
    failed: [],
    modified: []
  };
  for (const entry of entries) {
    const data = await readEntryData(absoluteRootDirectory, entry, readCounter);
    result.entries.push(data);
    const previousEntry = previousEntriesMap.get(data.path);
    if (previousEntry !== undefined) {
      if (previousEntry.mtimeMs < data.mtimeMs) {
        logStatus(`File ${data.path} has been modified, skipping.`);
        result.modified.push(data);
      } else if (previousEntry.sha1 !== data.sha1) {
        logStatus(`File ${data.path} has failed checksum.`);
        result.failed.push(data);
      }
    }
  }
  return result;
};

/**
 * Reads the file's current modification time and calculates checksum.
 */
const readEntryData = async (
  absoluteRootDirectory: string,
  entry: string,
  readCounter: ReadCounter
): Promise<FileEntry> => {
  const filename = join(absoluteRootDirectory, entry);
  return {
    path: entry,
    sha1: await calculateFileSha1(filename, readCounter),
    mtimeMs: await readModificationTimeMs(filename)
  };
};

/**
 * Reads the given file modification time.
 */
const readModificationTimeMs = async (filename: string) => {
  const fileStat = await stat(filename);
  return fileStat.mtimeMs;
};

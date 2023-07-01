import { describe, it } from "node:test";
import { deepEqual } from "node:assert";
import { join } from "node:path";
import { readConfig } from "../config/readConfig.js";
import { scanDirectory } from "../scanner/scanDirectory.js";
import { verifyEntries } from "./verifyEntries.js";
import { ReadCounter } from "../progress/ReadCounter.js";
import { TEST_FILES_ROOT } from "../test-utils/paths.js";
import { getConfigFilename } from "../metadata/getConfigFilename.js";
import { mkdir, rm, utimes, writeFile } from "node:fs/promises";
import { setQuiet } from "../log/logStatus.js";

describe("verifyEntries function", () => {
  it("should correctly calculate entries sha1 checksums", async () => {
    const absoluteRootDirectory = join(TEST_FILES_ROOT, "good");

    const config = await readConfig(getConfigFilename(absoluteRootDirectory));
    const entries = await scanDirectory(absoluteRootDirectory, config);

    const readCounter = new ReadCounter();
    const result = await verifyEntries(absoluteRootDirectory, entries, readCounter, []);

    deepEqual(result.entries.length, 1);
    deepEqual(result.entries[0].path, "path/to/file.txt");
    deepEqual(result.entries[0].sha1, "33ab5639bfd8e7b95eb1d8d0b87781d4ffea4d5d");
    deepEqual(readCounter.getReadBytes(), 12);
  });

  it("should correctly find modified and failed files", async () => {
    const absoluteRootDirectory = join(TEST_FILES_ROOT, "bad");

    // Clean the test files directory.
    const filesDirectory = join(absoluteRootDirectory, "files");
    await rm(filesDirectory, { recursive: true, force: true });
    await mkdir(filesDirectory, { recursive: true });

    // Re-create test files.
    const goodFile = join(filesDirectory, "good.txt");
    await writeFile(goodFile, "This is good file.", "utf8");

    const badFile = join(filesDirectory, "bad.txt");
    await writeFile(badFile, "This is bad file.", "utf8");

    const modifiedFile = join(filesDirectory, "modified.txt");
    await writeFile(modifiedFile, "This is modified file.", "utf8");

    const config = await readConfig(getConfigFilename(absoluteRootDirectory));
    const entries = await scanDirectory(absoluteRootDirectory, config);

    // First pass.
    const result = await verifyEntries(
      absoluteRootDirectory,
      entries,
      new ReadCounter(),
      []
    );

    deepEqual(result.entries.length, 3);
    deepEqual(result.failed.length, 0);
    deepEqual(result.modified.length, 0);

    // Silence stdout.
    setQuiet(true);

    // Update bad file but also set mtime earlier so that
    // mtime check will not skip it.
    await writeFile(badFile, "This is rotten file.", "utf8");
    const timestampInPast = Math.floor((Date.now() - 5000) / 1000);
    await utimes(badFile, timestampInPast, timestampInPast);

    // Modify file.
    await writeFile(modifiedFile, "The new content.", "utf8");

    // Second pass.
    const afterResult = await verifyEntries(
      absoluteRootDirectory,
      entries,
      new ReadCounter(),
      result.entries
    );

    deepEqual(afterResult.entries.length, 3);
    deepEqual(afterResult.failed.length, 1);
    deepEqual(afterResult.modified.length, 1);

    deepEqual(afterResult.failed[0].path, "files/bad.txt");
    deepEqual(afterResult.modified[0].path, "files/modified.txt");
  });
});

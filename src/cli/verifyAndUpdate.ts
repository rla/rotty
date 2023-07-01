import { join } from "path";
import { readConfig } from "../config/readConfig.js";
import { findChecksumFiles } from "../metadata/findChecksumFiles.js";
import { findLatestChecksumsFile } from "../metadata/findLatestChecksumsFile.js";
import { logStatus } from "../log/logStatus.js";
import { scanDirectory } from "../scanner/scanDirectory.js";
import { calculateEntriesSize } from "../scanner/calculateEntriesSize.js";
import { calculateGigabyteSize } from "../progress/calculateGigabyteSize.js";
import { verifyEntries } from "../checksum/verifyEntries.js";
import { ReadCounter } from "../progress/ReadCounter.js";
import { ReportTimer } from "../progress/ReportTimer.js";
import { createChecksumsFilename } from "../metadata/createChecksumsFilename.js";
import { writeChecksumsFile } from "../metadata/writeChecksumsFile.js";
import { extractTimestamp } from "../metadata/extractTimestamp.js";
import { unlink } from "node:fs/promises";
import { readChecksumsFile } from "../metadata/readChecksumsFile.js";

/**
 * Runs checksums verification for the given directory.
 */
export const verifyAndUpdate = async (
  absoluteRootDirectory: string
): Promise<boolean> => {
  const checksumsDirectory = join(absoluteRootDirectory, ".checksums");

  const configFile = join(checksumsDirectory, "config.json");
  const config = await readConfig(configFile);

  const entries = await scanDirectory(absoluteRootDirectory, config);
  if (entries.length === 0) {
    logStatus("No files were found in the given directory.");
    return true;
  }

  logStatus(`Number of files found: ${entries.length}.`);

  const totalSizeBytes = await calculateEntriesSize(absoluteRootDirectory, entries);
  const formattedGigabyteSize = calculateGigabyteSize(totalSizeBytes).toFixed(2);

  logStatus(`Total size of files: ${formattedGigabyteSize}GB.`);

  const checksumFiles = await findChecksumFiles(checksumsDirectory);
  const latestChecksumsFile = findLatestChecksumsFile(checksumFiles);

  if (latestChecksumsFile === null) {
    logStatus("No previous checksums file was found.");
  } else {
    const latestTimestamp = extractTimestamp(latestChecksumsFile);
    const latestDate = new Date(latestTimestamp);
    const latestDateFormatted = latestDate.toLocaleString();
    logStatus(`Last check: ${latestDateFormatted}.`);
  }

  const previousEntries =
    latestChecksumsFile === null ? [] : await readChecksumsFile(latestChecksumsFile);

  const readCounter = new ReadCounter();
  const reportTimer = new ReportTimer(totalSizeBytes, readCounter);

  const result = await verifyEntries(
    absoluteRootDirectory,
    entries,
    readCounter,
    previousEntries
  );

  reportTimer.stop();
  reportTimer.report();

  if (result.failed.length > 0) {
    logStatus("All done. Checksum failures. Please fix.");
    return false;
  } else {
    const checksumsFile = createChecksumsFilename(absoluteRootDirectory);
    logStatus("Saving new checksums.");
    await writeChecksumsFile(result.entries, checksumsFile);
    logStatus("Removing old checksum files.");
    await removeOldChecksumFiles(checksumFiles);
    logStatus("All done. No failures.");
    return true;
  }
};

/**
 * Helper function to remove old checksum files.
 */
const removeOldChecksumFiles = async (oldChecksumFiles: string[]) => {
  for (const file of oldChecksumFiles) {
    await unlink(file);
  }
};

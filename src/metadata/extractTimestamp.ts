import { basename } from "node:path";

/**
 * Extracts timestamp from the checksums filename.
 */
export const extractTimestamp = (filename: string) => {
  const filenamePortion = basename(filename);
  const match = filenamePortion.match(/^checksums-(\d+)\.json$/);
  if (!match) {
    throw new Error("Filename does not match the checksums filename.");
  }
  return parseInt(match[1]);
};

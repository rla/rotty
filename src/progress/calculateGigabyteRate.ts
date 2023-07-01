import { calculateGigabyteSize } from "./calculateGigabyteSize.js";

/**
 * Calculates rate (GB/sec).
 */
export const calculateGigabyteRate = (startTimestampMs: number, readBytes: number) => {
  const expiredSeconds = (Date.now() - startTimestampMs) / 1000;
  const rateBytesPerSecond = readBytes / expiredSeconds;
  return calculateGigabyteSize(rateBytesPerSecond);
};

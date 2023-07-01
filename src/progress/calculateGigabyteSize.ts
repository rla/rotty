/**
 * Calculates the given size in GB.
 */
export const calculateGigabyteSize = (sizeBytes: number) =>
  sizeBytes / 1024 / 1024 / 1024;

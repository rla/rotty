/**
 * One file entry of a scrubbed directory.
 */
export type FileEntry = {
  /**
   * Relative path to the root directory.
   */
  path: string;
  /**
   * SHA-1 checksum.
   */
  sha1: string;
  /**
   * Modification time.
   */
  mtimeMs: number;
};

/**
 * Helper class to handle the count of bytes read.
 */
export class ReadCounter {
  private readBytes: number;

  constructor() {
    this.readBytes = 0;
  }

  /**
   * Returns the accumulated value of the bytes read.
   */
  getReadBytes() {
    return this.readBytes;
  }

  /**
   * Adds the given value to the counter.
   */
  addReadBytes(readBytes: number) {
    this.readBytes += readBytes;
  }
}

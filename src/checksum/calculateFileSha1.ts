import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import { ReadCounter } from "../progress/ReadCounter.js";

/**
 * Calculates file SHA-1.
 */
export const calculateFileSha1 = async (filename: string, readCounter: ReadCounter) => {
  return new Promise<string>((resolve, reject) => {
    const hash = createHash("sha1");
    const stream = createReadStream(filename, {
      highWaterMark: 10 * 1024 * 1024
    });
    stream.on("error", (err) => reject(err));
    stream.on("data", (chunk) => {
      hash.update(chunk);
      if (chunk instanceof Buffer) {
        readCounter.addReadBytes(chunk.length);
      }
    });
    stream.on("end", () => resolve(hash.digest("hex")));
  });
};

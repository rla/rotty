import { FileEntry } from "../model/FileEntry.js";

/**
 * Converts checksums file line to entry object.
 */
export const convertToEntry = (object: unknown): FileEntry => {
  if (typeof object !== "object" || object === null) {
    throw new Error("Invalid checksums entry.");
  }
  if (!("path" in object) || typeof object.path !== "string") {
    throw new Error("Checksum entry path property must be a string.");
  }
  if (!("sha1" in object) || typeof object.sha1 !== "string") {
    throw new Error("Checksum entry sha1 property must be a string.");
  }
  if (!("mtimeMs" in object) || typeof object.mtimeMs !== "number") {
    throw new Error("Checksum entry mtimeMs property must be a number.");
  }
  return object as FileEntry;
};

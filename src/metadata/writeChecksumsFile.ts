import { writeFile } from "node:fs/promises";
import { FileEntry } from "../model/FileEntry.js";

/**
 * Writes the given entries into the checksums file.
 */
export const writeChecksumsFile = async (entries: FileEntry[], filename: string) => {
  await writeFile(filename, JSON.stringify(entries, null, 2) + "\n", "utf8");
};

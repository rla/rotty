import { readFile } from "node:fs/promises";
import { FileEntry } from "../model/FileEntry.js";
import { convertToEntry } from "./convertToEntry.js";

/**
 * Reads the given checksums file.
 */
export const readChecksumsFile = async (filename: string): Promise<FileEntry[]> => {
  const content = await readFile(filename, "utf8");
  return JSON.parse(content).map((object: unknown) => convertToEntry(object));
};

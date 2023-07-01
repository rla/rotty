import { FileEntry } from "./FileEntry.js";

/**
 * Returns Map instance for quick entry lookup.
 */
export const createEntryMap = (entries: FileEntry[]) => {
  const map = new Map<string, FileEntry>();
  for (const entry of entries) {
    map.set(entry.path, entry);
  }
  return map;
};

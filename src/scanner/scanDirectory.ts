import { readdir, stat } from "node:fs/promises";
import { join } from "node:path";
import { Config } from "../config/Config.js";

/**
 * Scans the given directory.
 */
export const scanDirectory = async (absoluteRootDirectory: string, config: Config) => {
  const entries: string[] = [];
  await scanDirectoryRec(absoluteRootDirectory, "", entries, config);
  return entries;
};

/**
 * Recursively scans the directory. Collects file entries.
 */
export const scanDirectoryRec = async (
  absoluteRootDirectory: string,
  relativePath: string,
  entries: string[],
  config: Config
) => {
  const directory = join(absoluteRootDirectory, relativePath);
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (relativePath === "" && entry.name === ".checksums") {
      continue;
    }
    if (!isEntryExcluded(entry.name, config)) {
      const path = join(relativePath, entry.name);
      if (entry.isFile()) {
        entries.push(path);
      } else if (entry.isDirectory()) {
        await scanDirectoryRec(absoluteRootDirectory, path, entries, config);
      } else if (entry.isSymbolicLink()) {
        const absolutePath = join(absoluteRootDirectory, path);
        const linkedEntryStat = await stat(absolutePath);
        if (linkedEntryStat.isFile()) {
          entries.push(path);
        } else if (linkedEntryStat.isDirectory()) {
          await scanDirectoryRec(absoluteRootDirectory, path, entries, config);
        }
      }
    }
  }
};

/**
 * Checks whether the entry is excluded from filesystem scanning.
 */
const isEntryExcluded = (entryname: string, config: Config) => {
  if (config.skip.includes(entryname)) {
    return true;
  }
  if (config.skipDotfiles && entryname.startsWith(".")) {
    return true;
  }
  return false;
};

# rotty

Rotty is a tool to discover bit-rot in files-at-rest. It works similar to the "scrub"
functionality in ZFS and BTRFS filesystems. It verifies file data against previously
stored checksums.

## Why?

Silent data corruption is pretty common. However, various error correction mechanisms
inside storage drives are able to correct it. Sadly, they only kick in when data is
retrieved. There is no periodic or continous proactive data checking. Sometimes the data
correction mechanism is not even able to fix the data.

This application is supposed to be run periodically. All it does is reading the files and
calculating SHA1 hash of the contents. Technically it would be sufficient to just read the
files as reading would trigger potential hardware errors.

## Warning!

This application only checks for file corruption. It is not able to repair the files. You
need actual backups to replace the corrupted files!

Modified files based on file modification timestamp are skipped.

## Use cases

This tool is suitable for small dataset of couple of TB in size. The verification
operation is assumed to run completely at once and is not resumable. There is no
rate-limiting built-in. The dataset size is limited by acceptable running time and the
underlying hardware bandwidth.

## Alternatives

- File system with built-in "scrub" feature: ZFS, BTRFS or ReFS.
- Similar scripts found elsewhere on the Internet.
- File versioning system such as git-annex or git-lfs.

## Installation

You need to have Node.js version 18+ installed. To install rotty:

```
npm install -g rotty
```

## Setup

Initialize the checksums file for the directory:

```
rotty <directory> --init
```

The configuration file is stored in `<directory>/.checksums/config.json`. The file
contains:

```json
{
  "skip": ["some-file.txt"],
  "skipDotfiles": true
}
```

- Property `skip`: array of skipped filenames to match in directories.
- Property `skipDotfiles`: whether to skip filenames starting with dot (`.`).

## Usage

Running `rotty <directory>` will run verification against files that are in the latest
database and will add new files into the database.

All modified files (based on modification time) will be reported. Files that are not
modified but have different checksum will also be reported.

If there are non-modified files with different checksum than previously then the program
will exit with status code 1.

## Database

The checksums data is stored in `<directory>/.checksums` directory. The application
creates file `checksums-<timestamp>.json` containing checksums as a JSON array.

Example database:

```json
[
  {
    "path": "hello.txt",
    "sha1": "da39a3ee5e6b4b0d3255bfef95601890afd80709",
    "mtimeMs": 1688067363987.008
  }
]
```

## License

The MIT License. See the LICENSE file.

/**
 * Data type for directory configuration.
 */
export type Config = {
  /**
   * Array of file or directory names to skip. Example: .DS_Store
   */
  skip: string[];
  /**
   * Whether to skip dotfiles.
   */
  skipDotfiles: boolean;
};

import { Arguments } from "./Arguments.js";

/**
 * Parses command-line arguments.
 */
export const parseArguments = (argv: string[]): Arguments => {
  const argumentsAfterScript = getArgumentsAfterScript(argv);
  const isInitMode = argumentsAfterScript.includes("--init");
  const restArguments = argumentsAfterScript.filter((arg) => !arg.startsWith("--"));
  const directory = restArguments.length > 0 ? restArguments[0] : undefined;
  return { isInitMode, directory };
};

/**
 * Returns the command-line arguments that follow the script name.
 */
const getArgumentsAfterScript = (argv: string[]) => {
  const indexOfScript = argv.findIndex((arg) => arg.endsWith("index.js"));
  if (indexOfScript < 0) {
    throw new Error("Command-line argument parsing failed.");
  }
  return argv.slice(indexOfScript + 1);
};

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
  // Returns actual arguments skipping node process name and the module name.
  return argv.slice(2);
};

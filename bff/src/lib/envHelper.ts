import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/../../.env' });

export const getEnv = (
  key: string | undefined,
  defaultValue: string | undefined = undefined,
): string | undefined => {
  if (key === undefined) return undefined;
  const value = process.env[key];
  if (value === undefined) {
    return defaultValue;
  }
  return value;
};

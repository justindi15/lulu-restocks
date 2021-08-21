export function getEnvVar(envVar: string | undefined) {
  if ((envVar === undefined) || (envVar === null)) {
      throw ("Missing environment variable");
  }
  return envVar;
}
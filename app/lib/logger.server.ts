/**
 * Centralized logger for backend error and info logging
 * Logs to console for now; can be expanded to file/db in production
 */
export function logError(error: unknown, context?: string) {
  const message = error instanceof Error ? error.message : String(error);
  if (context) {
    console.error(`[ERROR] [${context}]`, message);
  } else {
    console.error(`[ERROR]`, message);
  }
}

export function logInfo(message: string, context?: string) {
  if (context) {
    console.info(`[INFO] [${context}]`, message);
  } else {
    console.info(`[INFO]`, message);
  }
}

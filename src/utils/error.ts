/**
 * Извлечение сообщения об ошибке из API ответа
 */
export function extractErrorMessage(error: unknown): string | undefined {
  if (!error || typeof error !== "object") return undefined;

  if ("status" in error) {
    const apiError = error as { status: number; data?: unknown };
    const data = apiError.data as
      | { message?: string; error?: string }
      | string
      | undefined;

    if (typeof data === "string") return data;
    if (data?.message) return data.message;
    if (data?.error) return data.error;
    return `Ошибка ${apiError.status}`;
  }

  if ("message" in error) {
    return (error as { message: string }).message;
  }

  return undefined;
}

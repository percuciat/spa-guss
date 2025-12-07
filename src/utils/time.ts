import type { TRoundStatus } from "@/types";
import { ROUND_START_DELAY_MS } from "@/constants";

/**
 * Форматирование оставшегося времени в формат MM:SS
 */
export function formatTimeLeft(ms: number): string {
  if (ms <= 0) return "00:00";
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

/**
 * Вычисление статуса раунда по времени
 */

export function computeRoundStatus(startTime: string, endTime: string): TRoundStatus {
  const now = Date.now();
  const start = new Date(startTime).getTime() + ROUND_START_DELAY_MS;
  const end = new Date(endTime).getTime();

  if (now < start) return "cooldown";
  if (now > end) return "finished";
  return "active";
}

/**
 * Вычисление оставшегося времени до начала/конца раунда
 */
export function computeTimeLeft(startTime: string, endTime: string): number {
  const now = Date.now();
  const start = new Date(startTime).getTime() + ROUND_START_DELAY_MS;
  const end = new Date(endTime).getTime();

  if (now < start) return start - now;
  if (now > end) return 0;
  return end - now;
}

/**
 * Форматирование даты в формат DD.MM.YYYY, HH:MM:SS
 */
export function formatDateTime(iso: string): string {
  const d = new Date(iso);
  return (
    d.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }) +
    ", " +
    d.toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  );
}

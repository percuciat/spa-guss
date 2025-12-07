import type { IRound, TRoundStatus } from "@/types";
import { ROUND_STATUS_ORDER } from "@/constants";

/**
 * Сортировка раундов: активные первыми, затем запланированные, потом завершённые
 */
export function sortRoundsByStatus(rounds: IRound[]): IRound[] {
  return [...rounds].sort((a, b) => ROUND_STATUS_ORDER[a.status] - ROUND_STATUS_ORDER[b.status]);
}

/**
 * Проверка статуса раунда
 */
export function isActiveRound(status: TRoundStatus | null) {
  return status === "active";
}

export function isCooldownRound(status: TRoundStatus | null) {
  return status === "cooldown";
}

export function isFinishedRound(status: TRoundStatus | null) {
  return status === "finished";
}

/**
 * Получение заголовка страницы раунда по статусу
 */
export function getRoundPageTitle(status: TRoundStatus | null) {
  if (status === "cooldown") return "Cooldown";
  if (status === "finished") return "Раунд завершен";
  return "Раунды";
}

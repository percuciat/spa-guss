export const API_URL = "http://v2991160.hosted-by-vdsina.ru";

// Время до начала раунда (cooldown)
export const ROUND_COOLDOWN_MS = 25_000;

// Длительность раунда
export const ROUND_DURATION_MS = 60_000;

// Порядок сортировки статусов
export const ROUND_STATUS_ORDER = {
  active: 0,
  cooldown: 1,
  finished: 2,
} as const;

// Цвета статусов раунда
export const ROUND_STATUS_COLORS = {
  cooldown: "blue",
  active: "green",
  finished: "gray",
} as const;

// Лейблы статусов раунда
export const ROUND_STATUS_LABELS = {
  cooldown: "Cooldown",
  active: "Активен",
  finished: "Завершён",
} as const;

export const POLLING_INTERVAL_MS = 5_000;

export const ROUND_START_DELAY_MS = 10_000; // 10 секунд задержки до старта

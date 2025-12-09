import { useEffect, useState, useRef, useCallback } from "react";
import type { TRoundStatus, IRoundWithPoints } from "@/types";
import { isActiveRound, isCooldownRound, isFinishedRound } from "@/utils/rounds";
import { computeRoundStatus, computeTimeLeft } from "@/utils/time";

/**
 * Хук для управления таймером раунда
 * Автоматически вычисляет статус и оставшееся время
 */
export function useRoundTimer(round?: IRoundWithPoints, onStatusChange?: () => void) {
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [currentStatus, setCurrentStatus] = useState<TRoundStatus | null>(null);

  const intervalRef = useRef<number | null>(null);
  const prevStatusRef = useRef<TRoundStatus | null>(null);
  const onStatusChangeRef = useRef(onStatusChange);

  // Обновляем ref при изменении callback
  onStatusChangeRef.current = onStatusChange;

  // Очистка интервала
  const clearTimer = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Таймер
  useEffect(() => {
    if (!round) {
      clearTimer();
      return;
    }

    const tick = () => {
      const status = computeRoundStatus(round.startTime, round.endTime);
      const time = computeTimeLeft(round.startTime, round.endTime);

      setTimeLeft(time);
      setCurrentStatus(status);

      // Вызываем callback при смене статуса
      if (prevStatusRef.current !== null && status !== prevStatusRef.current) {
        onStatusChangeRef.current?.();
      }
      prevStatusRef.current = status;

      // Останавливаем таймер если раунд завершён
      if (status === "finished") {
        clearTimer();
      }
    };

    // Первый тик сразу
    tick();

    // Запускаем интервал только если раунд не завершён
    const status = computeRoundStatus(round.startTime, round.endTime);
    if (status !== "finished") {
      intervalRef.current = window.setInterval(tick, 1000);
    }

    return clearTimer;
  }, [round?.startTime, round?.endTime, clearTimer]);

  return {
    timeLeft,
    currentStatus,
    isActive: isActiveRound(currentStatus),
    isCooldown: isCooldownRound(currentStatus),
    isFinished: isFinishedRound(currentStatus),
  };
}

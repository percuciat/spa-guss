import { useState, useCallback, useEffect, useRef } from "react";
import { Stack, Box, Center, Loader } from "@mantine/core";
import { GooseAscii } from "@/components/common/GooseAscii";
import { RoundCooldown } from "@/components/round/RoundCooldown";
import { RoundActive } from "@/components/round/RoundActive";
import { RoundStats } from "@/components/round/RoundStats";
import { useGetRoundQuery, useTapMutation, useGetRoundStatsQuery } from "@/api/roundsApi";
import { useRoundTimer } from "@/hooks/useRoundTimer";
import { POLLING_INTERVAL_MS } from "@/constants";

interface IProps {
  roundId: string;
  onStatusChange?: (status: string | null) => void;
}

export function RoundGameContainer({ roundId, onStatusChange }: IProps) {
  const [localPoints, setLocalPoints] = useState(0);
  const [isRoundCompleted, setIsRoundCompleted] = useState(false);
  const prevStatusRef = useRef<string | null>(null);

  const {
    data: round,
    isLoading,
    refetch,
  } = useGetRoundQuery(roundId, {
    skip: !roundId,
    // Останавливаем polling когда раунд завершён
    pollingInterval: isRoundCompleted ? 0 : POLLING_INTERVAL_MS,
  });

  const [tap] = useTapMutation();

  const { timeLeft, currentStatus, isActive, isCooldown, isFinished } = useRoundTimer(
    round,
    refetch
  );

  // Уведомляем родителя об изменении статуса
  useEffect(() => {
    if (currentStatus && currentStatus !== prevStatusRef.current) {
      onStatusChange?.(currentStatus);
      prevStatusRef.current = currentStatus;
    }
  }, [currentStatus, onStatusChange]);

  // Останавливаем polling при завершении раунда
  useEffect(() => {
    if (isFinished && !isRoundCompleted) {
      setIsRoundCompleted(true);
    }
  }, [isFinished, isRoundCompleted]);

  // Синхронизация очков с сервером
  useEffect(() => {
    if (round && !isActive) {
      setLocalPoints(round.myPoints);
    }
  }, [round?.myPoints, isActive]);

  // Статистика для завершённого раунда
  const { data: stats } = useGetRoundStatsQuery(roundId, {
    skip: !roundId || !isFinished,
  });

  const handleTap = useCallback(async () => {
    if (!roundId || !isActive) return;

    setLocalPoints((p) => p + 1);

    try {
      const result = await tap(roundId).unwrap();
      setLocalPoints(result.score);
    } catch {
      setLocalPoints((p) => p - 1);
    }
  }, [roundId, isActive, tap]);

  // Показываем загрузку
  if (isLoading || !round || currentStatus === null) {
    return (
      <Center py="xl">
        <Loader color="cyan" />
      </Center>
    );
  }

  return (
    <Stack align="center" gap="md">
      <GooseAscii onClick={handleTap} disabled={!isActive} />

      <Box ta="center">
        {isCooldown && <RoundCooldown timeLeft={timeLeft} />}
        {isActive && <RoundActive timeLeft={timeLeft} points={localPoints} />}
        {isFinished && stats && <RoundStats stats={stats} />}
      </Box>
    </Stack>
  );
}

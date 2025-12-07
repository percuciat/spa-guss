import { Text } from "@mantine/core";
import { formatTimeLeft } from "@/utils/time";

interface IProps {
  timeLeft: number | null;
}

export function RoundCooldown({ timeLeft }: IProps) {
  return (
    <>
      <Text size="xl" fw={700} c="blue.4">
        Cooldown
      </Text>
      {timeLeft !== null && (
        <Text size="md" c="dimmed" mt="xs">
          до начала раунда {formatTimeLeft(timeLeft)}
        </Text>
      )}
    </>
  );
}


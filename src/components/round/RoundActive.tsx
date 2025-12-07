import { Text } from "@mantine/core";
import { formatTimeLeft } from "@/utils/time";

interface IProps {
  timeLeft: number | null;
  points: number;
}

export function RoundActive({ timeLeft, points }: IProps) {
  return (
    <>
      <Text size="xl" fw={700} c="green.4">
        Раунд активен!
      </Text>
      {timeLeft !== null && (
        <Text size="md" c="dimmed" mt="xs">
          До конца осталось: {formatTimeLeft(timeLeft)}
        </Text>
      )}
      <Text size="xl" fw={700} c="yellow.5" mt="md">
        Мои очки - {points}
      </Text>
    </>
  );
}


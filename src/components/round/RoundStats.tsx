import { Table, Text, Badge, Stack } from "@mantine/core";
import type { IRoundStats } from "@/types";

interface IProps {
  stats: IRoundStats;
}

export function RoundStats({ stats }: IProps) {
  const winner = stats.topStats[0];

  return (
    <Stack gap="md" mt="md">
      <Text size="xl" fw={700} c="gray.4">
        Раунд завершён
      </Text>

      <Table withRowBorders={false} style={{ textAlign: "left" }}>
        <Table.Tbody>
          <Table.Tr>
            <Table.Td c="dimmed">Всего очков</Table.Td>
            <Table.Td c="cyan.4" fw={700}>
              {stats.totalPoints}
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td c="dimmed">Мои очки</Table.Td>
            <Table.Td c="cyan.4" fw={700}>
              {stats.myPoints}
            </Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>

      {stats.topStats.length > 0 && (
        <>
          <Text size="md" fw={600} c="dimmed">
            Таблица лидеров
          </Text>
          <Table striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>#</Table.Th>
                <Table.Th>Игрок</Table.Th>
                <Table.Th>Очки</Table.Th>
                <Table.Th>Тапов</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {stats.topStats.map((player, index) => (
                <Table.Tr key={player.username}>
                  <Table.Td>
                    {index === 0 ? (
                      <Badge color="yellow" variant="filled">
                        👑
                      </Badge>
                    ) : (
                      index + 1
                    )}
                  </Table.Td>
                  <Table.Td
                    fw={player.username === winner?.username ? 700 : 400}
                    c={player.username === winner?.username ? "yellow.5" : undefined}
                  >
                    {player.username}
                  </Table.Td>
                  <Table.Td fw={700} c="cyan.4">
                    {player.score}
                  </Table.Td>
                  <Table.Td c="dimmed">{player.taps}</Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </>
      )}
    </Stack>
  );
}

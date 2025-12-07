import { Link } from "react-router-dom";
import { Paper, Text, Badge, Stack, Box } from "@mantine/core";
import type { IRound } from "@/types";
import { ROUND_STATUS_COLORS, ROUND_STATUS_LABELS } from "@/constants";
import { formatDateTime } from "@/utils/time";

interface IProps {
  round: IRound;
}

export function RoundCard({ round }: IProps) {
  return (
    <Paper
      p="md"
      radius="md"
      style={{
        border: "1px solid var(--mantine-color-gray-7)",
        background: "transparent",
      }}
    >
      <Stack gap="xs">
        <Text size="sm" c="dimmed">
          •{" "}
          <Text
            component={Link}
            to={`/round/${round.id}`}
            c="cyan"
            style={{ textDecoration: "none" }}
          >
            Round ID: {round.id}
          </Text>
        </Text>

        <Box pl="md">
          <Text size="sm" c="yellow.5">
            Start: {formatDateTime(round.startTime)}
          </Text>
          <Text size="sm" c="yellow.5">
            End: &nbsp;&nbsp;{formatDateTime(round.endTime)}
          </Text>
        </Box>

        <Box
          my="xs"
          style={{ borderBottom: "1px solid var(--mantine-color-gray-7)" }}
        />

        <Badge
          color={ROUND_STATUS_COLORS[round.status]}
          variant="light"
          size="lg"
        >
          Статус: {ROUND_STATUS_LABELS[round.status]}
        </Badge>
      </Stack>
    </Paper>
  );
}

import { useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Center } from "@mantine/core";
import { Header } from "@/components/common/Header";
import { RoundGameContainer } from "@/containers/round";
import { getRoundPageTitle } from "@/utils/rounds";
import type { TRoundStatus } from "@/types";

export function RoundPage() {
  const { id } = useParams();
  const [currentStatus, setCurrentStatus] = useState<TRoundStatus | null>(null);

  if (!id) {
    return null;
  }

  return (
    <Container size="md" py="xl">
      <Header title={getRoundPageTitle(currentStatus)} />

      <Center>
        <RoundGameContainer
          roundId={id}
          onStatusChange={(status) => setCurrentStatus(status as TRoundStatus)}
        />
      </Center>
    </Container>
  );
}

import { useNavigate } from "react-router-dom";
import { Container, Stack, Button, Text, Loader, Center } from "@mantine/core";
import { Header } from "@/components/common/Header";
import { RoundCard } from "@/components/round/RoundCard";
import { useGetRoundsQuery, useCreateRoundMutation } from "@/api/roundsApi";
import { useAppSelector } from "@/store";
import { sortRoundsByStatus } from "@/utils/rounds";
import { ROUND_COOLDOWN_MS, ROUND_DURATION_MS } from "@/constants";

export function ListingPage() {
  const navigate = useNavigate();
  const user = useAppSelector((s) => s.auth.user);

  const {
    data: rounds,
    isLoading,
    refetch,
  } = useGetRoundsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const [createRound, { isLoading: isCreating }] = useCreateRoundMutation();

  const handleCreateRound = async () => {
    try {
      const now = new Date();
      const start = new Date(now.getTime() + ROUND_COOLDOWN_MS);
      const end = new Date(start.getTime() + ROUND_DURATION_MS);

      const result = await createRound({
        startTime: start.toISOString(),
        endTime: end.toISOString(),
      }).unwrap();

      await refetch();
      navigate(`/round/${result.id}`);
    } catch (error) {
      console.error("Ошибка создания раунда:", error);
    }
  };

  const sortedRounds = rounds ? sortRoundsByStatus(rounds) : [];

  return (
    <Container size="md" py="xl">
      <Header title="Список РАУНДОВ" />

      {user?.isAdmin && (
        <Button
          variant="outline"
          color="gray"
          mb="xl"
          onClick={handleCreateRound}
          loading={isCreating}
        >
          Создать раунд
        </Button>
      )}

      {isLoading ? (
        <Center py="xl">
          <Loader color="cyan" />
        </Center>
      ) : sortedRounds.length === 0 ? (
        <Text c="dimmed" ta="center">
          Раундов пока нет
        </Text>
      ) : (
        <Stack gap="md">
          {sortedRounds.map((round) => (
            <RoundCard key={round.id} round={round} />
          ))}
        </Stack>
      )}
    </Container>
  );
}

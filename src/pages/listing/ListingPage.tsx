import { Container, Stack, Text, Loader, Center } from "@mantine/core";
import { Header } from "@/components/common/Header";
import { useGetRoundsQuery } from "@/api/roundsApi";
import { sortRoundsByStatus } from "@/utils/rounds";
import { CreateButton, RoundCard } from "@/components/round";

export function ListingPage() {
  const { data: rounds, isLoading } = useGetRoundsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const sortedRounds = rounds ? sortRoundsByStatus(rounds) : [];

  return (
    <Container size="md" py="xl">
      <Header title="Список РАУНДОВ" />

      <CreateButton />

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

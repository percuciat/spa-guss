import { Button } from "@mantine/core";
import { useAppSelector } from "@/store";
import { useCreateRoundMutation } from "@/api/roundsApi";
import { ROUND_COOLDOWN_MS, ROUND_DURATION_MS } from "@/constants";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants";

export function CreateButton() {
  const user = useAppSelector((s) => s.auth.user);
  const navigate = useNavigate();

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

      navigate(`${ROUTES.round.replace(":id", result.id)}`);
    } catch (error) {
      console.error("Ошибка создания раунда:", error);
    }
  };

  return (
    <>
      {user?.isAdmin ? (
        <Button
          variant="outline"
          color="gray"
          mb="xl"
          onClick={handleCreateRound}
          loading={isCreating}
        >
          Создать раунд
        </Button>
      ) : null}
    </>
  );
}

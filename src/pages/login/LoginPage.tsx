import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  Container,
  Paper,
  Title,
  TextInput,
  PasswordInput,
  Button,
  Stack,
  Text,
} from "@mantine/core";

import { useAppSelector } from "@/store";

import { ROUTES } from "@/constants";
import { useLoginForm } from "./hooks/useLoginForm";

export function LoginPage() {
  const navigate = useNavigate();
  const { register, handleSubmit, errors, isLoading, errorMessage, onSubmit } = useLoginForm();

  const user = useAppSelector((s) => s.auth.user);

  // Редирект если уже залогинен
  useEffect(() => {
    if (user) {
      navigate(ROUTES.listing, { replace: true });
    }
  }, [user, navigate]);

  return (
    <Container size={400} py={80}>
      <Paper
        p="xl"
        radius="md"
        style={{
          border: "2px dashed var(--mantine-color-cyan-7)",
          background: "transparent",
        }}
      >
        <Title order={2} ta="center" mb="xl" c="cyan.4">
          Войти
        </Title>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack gap="md">
            <TextInput
              label="Имя пользователя:"
              {...register("username")}
              error={errors.username?.message}
              styles={{
                input: {
                  background: "transparent",
                  border: "1px solid var(--mantine-color-gray-7)",
                },
              }}
            />

            <PasswordInput
              label="Пароль:"
              {...register("password")}
              error={errors.password?.message}
              styles={{
                input: {
                  background: "transparent",
                  border: "1px solid var(--mantine-color-gray-7)",
                },
              }}
            />

            <Button
              type="submit"
              loading={isLoading}
              variant="outline"
              color="gray"
              fullWidth
              mt="md"
            >
              Войти
            </Button>

            {errorMessage && (
              <Text c="red" size="sm" ta="center">
                {errorMessage}
              </Text>
            )}
          </Stack>
        </form>
      </Paper>
    </Container>
  );
}

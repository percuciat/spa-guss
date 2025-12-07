import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useLoginMutation, useLazyMeQuery } from "@/api/authApi";
import { useAppDispatch, useAppSelector } from "@/store";
import { setAuth } from "@/store/authSlice";
import { loginSchema, TLoginFormData } from "@/schemas/auth";
import { extractErrorMessage } from "@/utils/error";

export function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.auth.user);
  const [login, { isLoading, error }] = useLoginMutation();
  const [fetchMe] = useLazyMeQuery();
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: TLoginFormData) => {
    try {
      const loginResult = await login(data).unwrap();
      dispatch(setAuth({ user: null as never, token: loginResult.token }));

      const meResult = await fetchMe().unwrap();
      dispatch(setAuth({ user: meResult, token: loginResult.token }));

      navigate("/listing");
    } catch (error) {
      console.error(error);
    }
  };

  // Редирект если уже залогинен
  useEffect(() => {
    if (user) {
      navigate("/listing", { replace: true });
    }
  }, [user, navigate]);

  // Обработка ошибок
  useEffect(() => {
    setErrorMessage(extractErrorMessage(error));
  }, [error]);

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

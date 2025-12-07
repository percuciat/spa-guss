import { Link, useNavigate } from "react-router-dom";
import { Group, Text, Button, Box } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "@/store";
import { logout } from "@/store/authSlice";
import { authApi, useLogoutMutation } from "@/api/authApi";
import { roundsApi } from "@/api/roundsApi";

interface IProps {
  title: string;
}

export function Header({ title }: IProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.auth.user);
  const [logoutApi] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();
    } catch (error) {
      console.error("Ошибка выхода из системы", error);
    }
    // Clear RTK Query cache
    dispatch(authApi.util.resetApiState());
    dispatch(roundsApi.util.resetApiState());
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Box
      py="md"
      mb="lg"
      style={{ borderBottom: "1px solid var(--mantine-color-gray-7)" }}
    >
      <Group justify="space-between">
        <Group gap="xl">
          <Text
            component={Link}
            to="/listing"
            c="gray.5"
            style={{ textDecoration: "none" }}
          >
            {title}
          </Text>
        </Group>
        <Group gap="md">
          <Text c="yellow.5">{user?.username}</Text>
          <Button
            variant="subtle"
            color="gray"
            size="xs"
            onClick={handleLogout}
          >
            Выйти
          </Button>
        </Group>
      </Group>
    </Box>
  );
}

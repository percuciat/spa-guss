import { useEffect, useState } from "react";
import { setAuth } from "@/store/authSlice";
import { loginSchema } from "@/schemas/auth";
import type { TLoginFormData } from "@/types";
import { extractErrorMessage } from "@/utils/error";
import { useLoginMutation, useLazyMeQuery } from "@/api/authApi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "@/store";
import { ROUTES } from "@/constants";
import { useNavigate } from "react-router-dom";

export function useLoginForm() {
  const dispatch = useAppDispatch();
  const [login, { isLoading, error }] = useLoginMutation();
  const [fetchMe] = useLazyMeQuery();
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const navigate = useNavigate();

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

      navigate(ROUTES.listing);
    } catch (error) {
      console.error(error);
    }
  };
  // Обработка ошибок
  useEffect(() => {
    setErrorMessage(extractErrorMessage(error));
  }, [error]);

  return { register, handleSubmit, errors, isLoading, errorMessage, onSubmit };
}

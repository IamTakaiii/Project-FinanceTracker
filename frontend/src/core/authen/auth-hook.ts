import { useAuthStore, type User } from "@/global/stores/auth-store";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMe, loginByEmail, logout } from "./auth-api";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const setToken = useAuthStore((state) => state.setToken);

  return useMutation({
    mutationFn: async(secret: { email: string; password: string }) => {
      return await loginByEmail(secret.email, secret.password);
    },
    onSuccess: ({ data }) => {
      if (!data?.token) throw new Error("Login failed: No token received");
      setToken(data.token);
      queryClient.setQueryData(["user", "me"], data.user);
    },
  });
};

export const useUser = () => {
  const token = useAuthStore((state) => state.token);

  return useQuery<User>({
    queryKey: ["user", "me"],
    queryFn: getMe,
    enabled: !!token,
    staleTime: Infinity,
    throwOnError: true,
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const logoutFromStore = useAuthStore((state) => state.logout);

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      logoutFromStore();      
      queryClient.removeQueries()
    },
  });
};
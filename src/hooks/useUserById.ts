import useSWR from "swr";
import { fetcher } from "../api/lib/fetcher";
import { User } from "../types/user.types";

export const useUserById = (id: string) => {
  const { data, error, isLoading, mutate } = useSWR<User>(id ? `/users/${id}` : null, fetcher);

  return {
    user: data,
    isLoading,
    isError: error,
    mutate,
  };
};

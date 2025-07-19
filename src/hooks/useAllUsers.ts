import useSWR from "swr";
import { fetcher } from "../api/lib/fetcher";
import { User } from "../types/user.types";

export const useAllUsers = () => {
  const { data, error, isLoading, mutate } = useSWR<User[]>("/users", fetcher);

  return {
    users: data,
    isLoading,
    isError: error,
    mutate,
  };
};

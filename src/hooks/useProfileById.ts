import useSWR from "swr";
import { fetcher } from "../api/lib/fetcher";
import { User } from "../types/user.types";
import { get } from "react-hook-form";
import { getTokenPayload } from "../utils/getTokenPayload";

export const useProfileById = () => {
  const TokenPayload: any = getTokenPayload();
  console.log("Token Payload in useProfileById:", TokenPayload);

  const { data, error, isLoading, mutate } = useSWR<User>(TokenPayload?.id ? `/profile/me` : null, fetcher);

  return {
    profileData: data,
    isLoading,
    isError: error,
    mutate,
  };
};

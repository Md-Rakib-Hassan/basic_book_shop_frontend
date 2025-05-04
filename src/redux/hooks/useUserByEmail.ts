
import { useCurrentUser } from ".";
import { useGetUserByEmailQuery } from "../features/user/userApi";


export const useFullUser = () => {
  const currentUser = useCurrentUser();
  const email = currentUser?.Email;

  const { data, isLoading, error } = useGetUserByEmailQuery(email!, {
    skip: !email, // don't run unless email is available
  });

  return { user: data?.data, isLoading, error };
};

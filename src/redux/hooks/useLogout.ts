
import { useAppDispatch, useAppSelector } from ".";
import { baseApi } from "../api/baseApi";
import { logOut, selectCurrentUser } from "../features/auth/authSlice";


export const useLogout = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);

  const handleLogout = () => {
    dispatch(logOut());
    // if (user?.Email) {
        // dispatch(baseApi.util.invalidateTags([{ type: "User", id: user.Email }]));
        window.location.reload();
    // }
  };

  return handleLogout;
};

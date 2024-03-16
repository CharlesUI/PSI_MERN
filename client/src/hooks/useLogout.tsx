import { useAuthContext } from "./useAuthContext";
import { REDUCER_ACTION_TYPE } from "../Types/AuthContextTypes";

export const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: REDUCER_ACTION_TYPE.LOGOUT });
  };

  return { logout };
};

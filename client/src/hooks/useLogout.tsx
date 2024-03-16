import { useAuthContext } from "./useAuthContext";
import { REDUCER_ACTION_TYPE } from "../context/AuthContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: REDUCER_ACTION_TYPE.LOGOUT });
  };

  return { logout };
};

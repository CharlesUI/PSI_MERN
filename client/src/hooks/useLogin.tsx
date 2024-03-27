import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { API_URL } from "./config";
import { REDUCER_ACTION_TYPE } from "../Types/AuthContextTypes";
import { FormDataType } from "../Types/AuthContextTypes";

export const useLogin = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { dispatch } = useAuthContext();

  const login = async (formData: FormDataType) => {
    setError(null);
    setIsLoading(true);

    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.message);
      setIsLoading(false);
    }

    if (response.ok) {
      localStorage.setItem("user", JSON.stringify({
        user: json,
      }));
      console.log("Local Storage", {
        user: json,
      });
      //update the context
      dispatch({
        type: REDUCER_ACTION_TYPE.LOGIN,
        payload: {
          user: json,
        },
      });

      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};

import {
  Dispatch,
  ReactElement,
  ReactNode,
  createContext,
  useEffect,
  useReducer,
} from "react";

type StateType = {
  user?: {
    adminUser?: string;
    email?: string;
    token?: string;
  }
}

export const enum REDUCER_ACTION_TYPE {
  LOGIN,
  LOGOUT,
}

export const initState: StateType = {
  user: {},
};

type ReducerActions = {
  type: REDUCER_ACTION_TYPE;
  payload?: StateType;
};

const actionReducer = (state: StateType, action: ReducerActions): StateType => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.LOGIN:
      return { ...action.payload };
    case REDUCER_ACTION_TYPE.LOGOUT:
      return {};
    default:
      return state;
  }
};

//CONTEXT

type ChildrenType = {
  children: ReactNode;
};

// const useAuthContext = (initState: StateType) => {
//   const [state, dispatch] = useReducer(actionReducer, initState);

//   return { state, dispatch };
// };

type AuthContextType = {
  state: StateType;
  dispatch: Dispatch<ReducerActions>;
};

const initContextState: AuthContextType = {
  state: initState,
  dispatch: () => {},
};

export const AuthContext = createContext<AuthContextType>(initContextState);

// const contextValue = useAuthContext(initState)
export const AuthContextProvider = ({
  children,
}: ChildrenType): ReactElement => {
  const [state, dispatch] = useReducer(actionReducer, initState);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    console.log("stored", storedUser)
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        console.log("parsed", parsedUser)
        dispatch({ type: REDUCER_ACTION_TYPE.LOGIN, payload: parsedUser });
      } catch (error) {
        console.error("Error parsing stored user data:", error);
        // Handle parsing error (optional: clear localStorage or set default state)
      }
    } else {
      dispatch({ type: REDUCER_ACTION_TYPE.LOGOUT });
    }
  }, []); // Empty dependency array to run only once on component mount

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

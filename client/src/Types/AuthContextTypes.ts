import { ReactNode, Dispatch } from "react";

//FORM
export type FormDataType = {
  username?: string;
  password?: string;
};

//CONTEXT
export type StateType = {
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

export type ReducerActions = {
  type: REDUCER_ACTION_TYPE;
  payload?: StateType;
};

export type ChildrenType = {
  children: ReactNode;
};

export type AuthContextType = {
  state: StateType;
  dispatch: Dispatch<ReducerActions>;
};

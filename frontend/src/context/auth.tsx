import {
  createContext,
  ReactNode,
  useContext,
  useReducer,
  Dispatch
} from "react";
import { getValueFromLocalStorage } from "../helpers/storage";
import authReducer, { AuthState, AuthAction } from "../reducers/auth";

const AuthStateContext = createContext<AuthState | undefined>(undefined);
const AuthDispatchContext = createContext<Dispatch<AuthAction> | undefined>(undefined);

const uid = getValueFromLocalStorage("authUid");
const email = getValueFromLocalStorage("authEmail");

const initialState: AuthState = {
  isLoggedIn: !!uid,
  authToken: uid,
  authEmail: email,
};

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};

const useAuthState = (): AuthState => {
  const context = useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error("useAuthState must be used within an AuthProvider");
  }
  return context;
};

const useAuthDispatch = (): Dispatch<AuthAction> => {
  const context = useContext(AuthDispatchContext);
  if (context === undefined) {
    throw new Error("useAuthDispatch must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuthState, useAuthDispatch };

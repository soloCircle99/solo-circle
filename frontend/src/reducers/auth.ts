import { setToLocalStorage } from "../helpers/storage";

export interface AuthState {
  isLoggedIn: boolean;
  authToken: string | null;
  authEmail: string | null;
}

export interface AuthAction {
  type: "LOGIN" | "LOGOUT";
  payload?: {
    authUid: string;
    authEmail: string;
  };
}

const authReducer = (_: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN": {
      if (!action.payload) {
        throw new Error("Payload is required for LOGIN action");
      }

      const { authUid, authEmail } = action.payload;
      setToLocalStorage("authUid", authUid);
      setToLocalStorage("authEmail", authEmail);

      return {
        isLoggedIn: true,
        authToken: authUid,
        authEmail: authEmail,
      };
    }
    case "LOGOUT": {
      setToLocalStorage("authUid", null);
      setToLocalStorage("authEmail", null);

      return {
        isLoggedIn: false,
        authToken: null,
        authEmail: null,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

export default authReducer;
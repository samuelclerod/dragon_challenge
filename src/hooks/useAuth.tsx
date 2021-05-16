import React, { createContext, ReactNode, useCallback, useContext, useState } from "react";
import { FakeAuthServices } from "../services/fakeAuthService";

interface User {
  id: string;
  name: string;
  username: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  username: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

type AuthProviderProps = {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider = ({ children }: AuthProviderProps) => {

  const [data, setData] = useState<AuthState>(() => {
    const token = sessionStorage.getItem("@dragon:token");
    const user = sessionStorage.getItem("@dragon:user");
    if (token && user) {
      return { token, user: JSON.parse(user) };
    }
    return {} as AuthState;
  });

  const signIn = useCallback(async ({ username, password }: SignInCredentials) => {
    const data = await FakeAuthServices.signIn({ username, password })
    const { token, user } = data;
    sessionStorage.setItem("@dragon:token", token);
    sessionStorage.setItem("@dragon:user", JSON.stringify(user));

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    sessionStorage.removeItem("@dragon:token");
    sessionStorage.removeItem("@dragon:user");

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };

import { createContext, useState, type ReactNode } from "react";
import { jwtDecode } from "jwt-decode";

type AuthContextType = {
  userLogin: string | null;
  setuserLogin: React.Dispatch<React.SetStateAction<string | null>>;
  userID: string;
};

export const AuthContext = createContext<AuthContextType>({
  userLogin: null,
  setuserLogin: () => {},
  userID: "",
});

export default function AuthContextProvider({ children }: { children: ReactNode }) {
  const [userLogin, setuserLogin] = useState<string | null>(
    localStorage.getItem("userToken")
  );

  let userID = "";
  if (userLogin) {
    try {
      const { user } = jwtDecode<{ user: string }>(userLogin);
      userID = user;
    } catch {
      userID = "";
    }
  }

  return (
    <AuthContext.Provider value={{ userLogin, setuserLogin, userID }}>
      {children}
    </AuthContext.Provider>
  );
}
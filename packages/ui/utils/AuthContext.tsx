import React, { createContext, useEffect, useState } from "react";

import { firebase } from "./firebase";
type Claims = {
  isAdmin: boolean;
  isUser: boolean;
};

export interface ContextProps {
  loading: boolean;
  user: firebase.User | null;
  authenticated: any;
  setUser: any;
  claims: Claims;
}

export const AuthContext = createContext<Partial<ContextProps>>({});

const AuthProvider = (props: any) => {
  const [user, setUser] = useState(null as firebase.User | null);
  const [claims, setClaims] = useState<Claims>({
    isAdmin: false,
    isUser: false,
  });
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(null as boolean | null);
  useEffect(() => {
    initialLoad();
  }, []);

  const initialLoad = () => {
    firebase.auth().onAuthStateChanged(async (user) => {
      console.log("user in context", user);
      if (user) {
        const idToken = await user!.getIdTokenResult();
        console.log("user claims", idToken);
        setClaims({
          isUser: idToken.claims.isUser,
          isAdmin: idToken.claims.isAdmin,
        });
      }
      setUser(user);
      setAuthenticated(user !== null);
    });
    setLoading(false);
  };

  if (loading) {
    return;
  }
  return (
    <AuthContext.Provider
      value={{
        loading,
        user,
        authenticated,
        setUser,
        claims,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { user1, user2, user3, user4, user5 } from '../../test/testuse';

const AuthContext = createContext({
  user: null,
  testUser: null,
  setUser: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUserState] = useState(null);
  const [testUser, setTestUser] = useState(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("user");
      const parsed = raw ? JSON.parse(raw) : null;
      setUserState(parsed);
      // if there is a stored user, also try to load a matching testUser fixture
      if (parsed && parsed.email) {
        const fixtureMap = {
          [user1?.email]: user1,
          [user2?.email]: user2,
          [user3?.email]: user3,
          [user4?.email]: user4,
          [user5?.email]: user5,
        };
        const matched = fixtureMap[parsed.email];
        if (matched) {
          setTestUser(matched);
          console.log('[AuthProvider] loaded testUser from localStorage match:', matched.email ?? matched?.name ?? matched);
        }
      }
    } catch (e) {
      setUserState(null);
    } finally {
      setInitialized(true);
    }
  }, []);

  const setUser = (u) => {
    console.log('[AuthProvider] setUser called:', u);
    // keep main user state as provided
    setUserState(u);
    try {
      if (u) localStorage.setItem("user", JSON.stringify(u));
      else localStorage.removeItem("user");
    } catch (e) {
      // ignore localStorage errors
    }

    // separately set testUser fixture based on email (or clear it)
    const fixtureMap = {
      [user1?.email]: user1,
      [user2?.email]: user2,
      [user3?.email]: user3,
      [user4?.email]: user4,
      [user5?.email]: user5,
    };

    if (u && u.email && fixtureMap[u.email]) {
      const fixture = fixtureMap[u.email];
      setTestUser(fixture);
      console.log('[AuthProvider] testUser loaded for', u.email, fixture);
    } else {
      setTestUser(null);
      console.log('[AuthProvider] no testUser for', u?.email ?? null);
    }
  };

  const logout = () => {
    setUser(null);
    toast.success("Logged out successfully");
    navigate('/login');
  };


  // no remote fixture fetch; using in-repo test fixtures

  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === "user") {
        try {
          setUserState(e.newValue ? JSON.parse(e.newValue) : null);
        } catch {
          setUserState(null);
        }
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  useEffect(() => {
    // log whenever testUser updates so it's easy to see in console whether fixtures are active
    if (testUser) {
      console.log('[AuthProvider] testUser is set:', true, testUser);
    } else {
      console.log('[AuthProvider] testUser is set:', false);
    }
  }, [testUser]);

  return (
    <AuthContext.Provider value={{ user, setUser, logout, testUser }}>
      {initialized ? children : null}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;

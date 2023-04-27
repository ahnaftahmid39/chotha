import jwtDecode from 'jwt-decode';
import { createContext, useEffect, useState } from 'react';
import ls from '../lib/ls';

export const UserContext = createContext(null);
const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    if (Object.keys(userInfo).length == 0) {
      const token = ls.getToken();
      if (token) {
        const decoded = jwtDecode(token);
        if (new Date().getTime() < decoded.exp * 1000) {
          setUserInfo({
            ...decoded,
            token: token,
          });
        } else {
          ls.setToken('');
        }
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

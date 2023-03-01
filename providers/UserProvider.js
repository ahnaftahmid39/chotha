import jwtDecode from 'jwt-decode';
import { createContext, useEffect, useState } from 'react';

export const UserContext = createContext(null);
const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    if (Object.keys(userInfo).length == 0) {
      const token = localStorage.getItem('token');
      if (token) {
        const decoded = jwtDecode(token);
        if (new Date().getTime() < decoded.exp * 1000) {
          setUserInfo({
            ...decoded,
            token: token,
          });
        } else {
          localStorage.setItem('token', '');
        }
      }
    }
  }, []);
  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

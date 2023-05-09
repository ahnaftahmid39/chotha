import jwtDecode from 'jwt-decode';
import { createContext, useEffect, useState } from 'react';

import ls from '../lib/ls';

export const UserContext = createContext(null);
const UserProvider = ({ children }) => {
  //   {
  //     "_id": "6434988f107095056bfe30fa",
  //     "email": "ahnaf-2017215002@cs.du.ac.bd",
  //     "role": "user",
  //     "name": "Stallion",
  //     "iat": 1683572250,
  //     "exp": 1686164250,
  //     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDM0OTg4ZjEwNzA5NTA1NmJmZTMwZmEiLCJlbWFpbCI6ImFobmFmLTIwMTcyMTUwMDJAY3MuZHUuYWMuYmQiLCJyb2xlIjoidXNlciIsIm5hbWUiOiJTdGFsbGlvbiIsImlhdCI6MTY4MzU3MjI1MCwiZXhwIjoxNjg2MTY0MjUwfQ.C1zvj1Yt9Asb4etIwGphu2E4JmuSwWy_GDEx3LGVMx4"
  // }
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

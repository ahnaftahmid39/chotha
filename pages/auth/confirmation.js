import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { UserContext } from '../../providers/UserProvider';
export default function Confirmation({ ...props }) {
  const router = useRouter();
  const { userInfo, setUserInfo } = useContext(UserContext);

  useEffect(() => {
    if (router.query.token)
      fetch(
        `http://localhost:3000/api/auth/confirm?token=${router.query.token}`,
        {
          method: 'GET',
          headers: {},
        }
      )
        .then((res) => {
          if (res.statusText == 'OK') return res.json();
        })
        .then((res) => {
          const decoded = jwtDecode(router.query.token);
          setUserInfo({ user: decoded });
          localStorage.setItem('token', router.query.token);
        })
        .catch((err) => {
          console.log(err);
        });
  }, [router.query.token]);
  if (userInfo.user) router.replace('/profile');

  return <div> Check your email </div>;
}

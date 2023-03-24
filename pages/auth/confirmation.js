import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../providers/UserProvider';

export default function Confirmation({ ...props }) {
  const router = useRouter();
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [error, setError] = useState('');

  useEffect(() => {
    if (router.query.shortToken)
      fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/verify-token?shortToken=${router.query.shortToken}`,
        {
          method: 'GET',
          headers: {},
        }
      )
        .then((res) => res.json())
        .then((res) => {
          // console.log(res);

          if (res.status == 400) {
            setError(res.message);
            throw Error(res.message);
          }

          localStorage.setItem('token', res.token);
          const decoded = jwtDecode(res.token);
          setUserInfo({ ...decoded, token: res.token });
          router.replace('/profile');
        })
        .catch((err) => {});
  }, [router.query.shortToken]);

  return (
    <div className='container'>
      <div className='main'>
        {error && <div>{error}</div>}
        Check your email <></>{' '}
      </div>
    </div>
  );
}

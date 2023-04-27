import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../providers/UserProvider';
import ls from '../../lib/ls';
import styles from '../../styles/Confirmation.module.css';
import Loading from '../../components/loading_indicator/Loading';

export default function Confirmation({ ...props }) {
  const router = useRouter();
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
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

          ls.setToken(res.token);
          const decoded = jwtDecode(res.token);
          setUserInfo({ ...decoded, token: res.token });
          setIsLoading(false);
          router.replace('/profile');
        })
        .catch((err) => {
          setIsLoading(false);
          setError(err.message);
        });
    // eslint-disable-line
  }, [router]);

  return (
    <div className={`${styles['confirmation-container']}`}>
      {isLoading ? (
        <Loading size={50} />
      ) : error ? (
        <div className={styles['error']}>{error}</div>
      ) : (
        <div className={styles['check-email']}>
          Please check your email for confirmation link.
        </div>
      )}
    </div>
  );
}

import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';

import styles from '../../styles/Auth.module.css';

const Authentication = ({}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [log, setLog] = useState(false);
  const [showpass, setShowPass] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const passref = useRef();
  const nameref = useRef();
  const emailref = useRef();

  const router = useRouter();

  useEffect(() => {
    if (!log) nameref.current.focus();
    else emailref.current.focus();
    setErrMsg('');
    setSuccessMsg('');
  }, [log]);

  const handleLoginSubmit = useCallback(
    (e) => {
      fetch('/api/auth/login', {
        body: JSON.stringify({
          email,
          password,
        }),
        method: 'POST',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
      })
        .then((r) => {
          if (r.statusText != 'OK') {
            return Promise.reject(r);
          }
          return r.json();
        })
        .then((res) => {
          console.log(res.token);
          localStorage.setItem('user', JSON.stringify(res.user));
          localStorage.setItem('token', JSON.stringify(res.token));
          setSuccessMsg('Login successful');
          router.replace('/');
        })
        .catch((res) => {
          res
            .json()
            .then((err) => {
              setErrMsg(err.error);
            })
            .catch((e) => {
              console.log('Something went wrong!');
            });
        });
    },
    [email, password]
  );

  const handleSignUpSubmit = useCallback(
    (e) => {
      fetch('/api/auth/signup', {
        body: JSON.stringify({
          name,
          email,
          password,
        }),
        method: 'POST',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
      })
        .then((r) => {
          if (r.status != 201) {
            return Promise.reject(r);
          }
          return r.json();
        })
        .then((res) => {
          console.log(res.token);
          localStorage.setItem('user', JSON.stringify(res.user));
          localStorage.setItem('token', JSON.stringify(res.token));
          setSuccessMsg('Login successful');
          router.replace('/');
        })
        .catch((res) => {
          res
            .json()
            .then((err) => {
              setErrMsg(err.error);
            })
            .catch((e) => {
              console.log('Something went wrong!', e);
            });
        });
    },
    [name, email, password]
  );

  return (
    <>
      <Head>
        <title>Authentication</title>
      </Head>
      <main className="main">
        <div className={styles['auth-container']}>
          <div className={styles['logo-container']}>
            <div className={styles['logo-wrapper']}>
              <Image
                priority
                layout="fill"
                objectFit="cover"
                src="/chotha.svg"
                alt="Logo"
              />
            </div>
            <span className={styles['logo-title']}>CHOTHA</span>
          </div>
          <div className={styles['form-container']}>
            <div className={styles['form-error']}>{errMsg}</div>
            <div className={styles['form-success']}>{successMsg}</div>
            <form className={styles['auth-form']} action="/">
              {!log && (
                <>
                  <fieldset>
                    <legend>Name</legend>
                    <input
                      type="text"
                      ref={nameref}
                      onChange={(e) => setName(e.target.value)}
                    ></input>
                  </fieldset>
                  <span className={'vspace'} />
                </>
              )}
              <fieldset>
                <legend>Email</legend>
                <input
                  type="email"
                  ref={emailref}
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
              </fieldset>
              <span className={'vspace'} />
              <fieldset>
                <legend>
                  Password
                  <button
                    tabIndex={-1}
                    className={styles['btn-visibility']}
                    onClick={(e) => {
                      e.preventDefault();
                      if (passref.current.type == 'password') {
                        passref.current.type = 'text';
                        setShowPass(true);
                      } else {
                        passref.current.type = 'password';
                        setShowPass(false);
                      }
                    }}
                  >
                    <Image
                      src={
                        showpass
                          ? '/images/eye-open.png'
                          : '/images/eye-closed.png'
                      }
                      width="20px"
                      height="20px"
                    />
                  </button>
                </legend>
                <input
                  ref={passref}
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
              </fieldset>
              <span className={'vspace'} />
              <div className={styles['submit-container']}>
                {log ? (
                  <>
                    <span role="button" onClick={() => setLog(false)}>
                      Create new account
                    </span>
                    <button
                      type="submit"
                      onClick={(e) => {
                        e.preventDefault();
                        handleLoginSubmit(e);
                      }}
                      className={styles['btn-login']}
                    >
                      Login
                    </button>
                  </>
                ) : (
                  <>
                    <span role="button" onClick={() => setLog(true)}>
                      I already have an account
                    </span>
                    <button
                      type="submit"
                      onClick={(e) => {
                        e.preventDefault();
                        handleSignUpSubmit(e);
                      }}
                      className={styles['btn-signup']}
                    >
                      Sign up
                    </button>
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default Authentication;

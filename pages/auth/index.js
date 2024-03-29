import jwtDecode from 'jwt-decode';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useContext, useEffect, useRef, useState } from 'react';

import BrandIcon from '../../components/brand_icon/BrandIcon';
import Layout from '../../components/layout/Layout';
import ls from '../../lib/ls';
import { UserContext } from '../../providers/UserProvider';
import styles from '../../styles/Auth.module.css';

const Authentication = ({ ...props }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [conpassword, setConPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [showpass, setShowPass] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const { setUserInfo } = useContext(UserContext);
  const passref = useRef();
  const confirmpassref = useRef();
  const nameref = useRef();
  const emailref = useRef();

  const router = useRouter();
  useEffect(() => {
    if (!isLogin) nameref.current.focus();
    else emailref.current.focus();
    setErrMsg('');
    setSuccessMsg('');
  }, [isLogin]);

  useEffect(() => {
    let t = setTimeout(() => {
      setErrMsg('');
    }, 3000);
    return () => {
      clearTimeout(t);
    };
  }, [errMsg]);

  const handleLoginSubmit = async () => {
    try {
      const res = await fetch('/api/auth/login', {
        body: JSON.stringify({
          email,
          password,
        }),
        method: 'POST',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();
      console.log(data);
      if (data.status != 200) {
        setErrMsg(data.error ?? data.message);
      } else {
        ls.setToken(data.token);
        setSuccessMsg('Login successful');
        const decoded = jwtDecode(data.token);
        setUserInfo({ ...decoded, token: data.token });
        router.replace('/profile');
      }
    } catch (err) {
      setErrMsg(err.error ?? err.message);
    }
  };

  const handleSignUpSubmit = async (e) => {
    try {
      const res = await fetch('/api/auth/signup', {
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
      });
      const data = await res.json();
      console.log(data);
      if (data.status != 201) {
        setErrMsg(data.message);
      } else {
        setSuccessMsg('Sign Up successful');
        router.replace('/auth/confirmation');
      }
    } catch (err) {
      setErrMsg(err.message);
    }
  };

  return (
    <>
      <Head>
        <title>Authentication</title>
      </Head>
      <Layout>
        <div className={styles['auth-container']}>
          <div className={styles['logo-wrapper']}>
            <BrandIcon />
          </div>
          <div className={styles['form-container']}>
            <div className={styles['form-error']}>{errMsg}</div>
            <div className={styles['form-success']}>{successMsg}</div>
            <form id='auth-form-id' className={styles['auth-form']} action='/'>
              {!isLogin && (
                <>
                  <fieldset form='auth-form-id'>
                    <legend>Name</legend>
                    <input
                      type='text'
                      ref={nameref}
                      onChange={(e) => setName(e.target.value)}
                    ></input>
                  </fieldset>
                  <span className={'vspace'} />
                </>
              )}
              <fieldset form='auth-form-id'>
                <legend>Email</legend>
                <input
                  type='email'
                  ref={emailref}
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
              </fieldset>
              <span className={'vspace'} />
              <fieldset form='auth-form-id'>
                <legend>
                  Password
                  <button
                    tabIndex={-1}
                    type='button'
                    className={styles['btn-visibility']}
                    onClick={(e) => {
                      e.preventDefault();
                      if (passref.current.type == 'password') {
                        passref.current.type = 'text';
                        if (!isLogin) confirmpassref.current.type = 'text';
                        setShowPass(true);
                      } else {
                        passref.current.type = 'password';
                        if (!isLogin) confirmpassref.current.type = 'password';
                        setShowPass(false);
                      }
                    }}
                  >
                    <Image
                      alt='password visibility toggle'
                      src={
                        showpass
                          ? '/images/eye-open.png'
                          : '/images/eye-closed.png'
                      }
                      width='20px'
                      height='20px'
                    />
                  </button>
                </legend>
                <input
                  value={password}
                  ref={passref}
                  type='password'
                  onChange={(e) => {
                    e.preventDefault();
                    setPassword(e.target.value);
                  }}
                ></input>
              </fieldset>
              {!isLogin && (
                <fieldset form='auth-form-id'>
                  <legend>
                    Confirm Password
                    <button
                      tabIndex={1}
                      type='button'
                      className={styles['btn-visibility']}
                      onClick={(e) => {
                        e.preventDefault();
                        if (confirmpassref.current.type == 'password') {
                          confirmpassref.current.type = 'text';
                          passref.current.type = 'text';
                          setShowPass(true);
                        } else {
                          confirmpassref.current.type = 'password';
                          passref.current.type = 'password';
                          setShowPass(false);
                        }
                      }}
                    >
                      <Image
                        alt='password visibility toggle'
                        src={
                          showpass
                            ? '/images/eye-open.png'
                            : '/images/eye-closed.png'
                        }
                        width='20px'
                        height='20px'
                      />
                    </button>
                  </legend>
                  <input
                    value={conpassword}
                    ref={confirmpassref}
                    type='password'
                    onChange={(e) => {
                      e.preventDefault();
                      setConPassword(e.target.value);
                    }}
                  ></input>
                </fieldset>
              )}

              <span className={'vspace'} />
              <div className={styles['submit-container']}>
                {isLogin ? (
                  <>
                    <div role='button' onClick={() => setIsLogin(false)}>
                      Create new account
                    </div>
                    <button
                      type='submit'
                      tabIndex={0}
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
                    <div
                      className={styles['btn-already']}
                      role='button'
                      onClick={() => setIsLogin(true)}
                    >
                      I already have an account
                    </div>
                    <button
                      type='submit'
                      tabIndex={0}
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
      </Layout>
    </>
  );
};

export default Authentication;

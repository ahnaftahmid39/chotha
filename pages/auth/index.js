import Head from 'next/head';
import { createContext, memo, useContext, useRef, useState } from 'react';

const SignUp = () => {
  const cnt = useRef(0);
  const name = useContext(Context);
  console.log('Signup: ', cnt.current++);
  return <div>{name}</div>;
};
const Login = memo(({ name }) => {
  const cnt = useRef(0);
  console.log('Login: ', cnt.current++);
  return <div>Login: {name}</div>;
});

Login.displayName = 'Login';
const Context = createContext();

const Authentication = ({}) => {
  const [name, setName] = useState('bla');
  const [text, setText] = useState('');
  return (
    <>
      <Head>
        <title>Authentication</title>
      </Head>
      <div className='main'>
        <main>
          <Context.Provider value={name}>
            <SignUp />
            <Login name={name} />
          </Context.Provider>
        </main>
        <input
          type='text'
          onChange={(e) => setText(e.target.value)}
          value={text}
        ></input>
        <button
          onClick={() => {
            setName(text);
          }}
        >
          press
        </button>
      </div>
    </>
  );
};

export default Authentication;

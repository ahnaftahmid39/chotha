import Head from 'next/head';
import { useEffect, useState } from 'react';

import UserCard from '../../components/cards/user_card/UserCard';
import Layout from '../../components/layout/Layout';

const Users = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    let shouldUpdate = true;
    async function getAllUsers() {
      try {
        const res = await fetch('/api/users', { method: 'GET' });
        const data = await res.json();
        if (res.ok) {
          console.log(data);
          if (shouldUpdate) {
            setUsers(data.users);
          }
        } else {
          throw Error(data.error);
        }
      } catch (e) {
        console.log(e.message || e);
      }
    }
    getAllUsers();
    return () => {
      shouldUpdate = false;
    };
  }, []);

  return (
    <>
      <Head>
        <title>Users</title>
      </Head>
      <Layout style={{ flexDirection: 'column' }}>
        <div
          style={{
            marginTop: '1rem',
            border: 'var(--default-border)',
            borderRadius: '16px',
          }}
        >
          {users.map((user, idx) => {
            return <UserCard key={idx} user={user} />;
          })}
        </div>
      </Layout>
    </>
  );
};

export default Users;

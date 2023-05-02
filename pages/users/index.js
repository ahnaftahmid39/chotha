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
    <Layout style={{ flexDirection: 'column' }}>
      {users.map((user, idx) => {
        return <UserCard key={idx} user={user} />;
      })}
    </Layout>
  );
};

export default Users;

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import UserCard from '../../components/cards/user_card/UserCard';
import ProfilePlaceHolder from '../../components/svgs/ProfilePlaceholder';

const Users = () => {
  const [users, setUsers] = useState([]);
  const router = useRouter();
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

  const handleUserOnClick = (userId = '123') => {
    router.push('/users/' + userId);
  };

  return (
    <div className='main'>
      {users.map((user, idx) => {
        return <UserCard key={idx} user={user} />;
      })}
    </div>
  );
};

export default Users;

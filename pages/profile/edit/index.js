import jwtDecode from 'jwt-decode';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

import Loading from '../../../components/loading_indicator/Loading';
import Toast, { ToastTypes } from '../../../components/toast/Toast';
import ls from '../../../lib/ls';
import { UserContext } from '../../../providers/UserProvider';
import styles from '../../../styles/ProfileEdit.module.css';

const social_media_list = ['facebook', 'twitter', 'youtube', 'linkedin'];

const ProfileEdit = () => {
  const router = useRouter();
  const { userInfo, setUserInfo } = useContext(UserContext);

  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [socials, setSocials] = useState({
    facebook: '',
    twitter: '',
    youtube: '',
    linkedin: '',
  });
  const [imgData, setImgData] = useState(null);

  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const [toast, setToast] = useState({
    show: false,
    type: ToastTypes.INFO,
    message: '',
    ttl: 3000,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const handleToastClose = () =>
    setToast({
      type: ToastTypes.INFO,
      show: false,
      ttl: 3000,
      message: '',
    });

  useEffect(() => {
    let t;
    if (toast.message != '') {
      t = setTimeout(handleToastClose, toast.ttl || 3000);
    }
    return () => {
      if (t) clearTimeout(t);
    };
  }, [toast]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setDisabled(true);
    const token = ls.getToken();
    try {
      console.log({ name, bio, socials, newPass, confirmPass, currentPass });
      // verify the fields
      if (
        name == '' &&
        bio == '' &&
        Object.keys(socials).reduce(
          (prevsite, cursite) => prevsite == '' && cursite == ''
        ) &&
        newPass == ''
      ) {
        return;
      }
      let res, data;
      // verify current password

      if (currentPass == '') {
        throw Error('Current password field is empty. It is required');
      }

      res = await fetch('/api/auth/verify-password', {
        method: 'POST',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          password: currentPass,
        }),
      });

      data = await res.json();
      console.log('Response: ', data);

      if (!data.match) throw Error('Given current password is wrong');
      if (!res.ok) throw Error(data.message);

      // send POST request for image link generation
      let imageURL = '';
      if (imgData) {
        const data = new FormData();
        data.append('photo', imgData);
        res = await fetch('/api/image', {
          method: 'POST',
          body: data,
        });
        if (!res.ok) throw Error('Something went wrong generating image');
        const {
          result: { url },
        } = await res.json();
        imageURL = url;
      }

      // send PUT request for updating
      const updatedUserData = {
        name,
        bio,
        socials,
      };

      if (imageURL != '') updatedUserData.photo = imageURL;
      if (newPass != '') {
        if (newPass == confirmPass) updatedUserData.password = newPass;
        else throw Error("New password and Confirm New password doesn't match");
      }

      res = await fetch('/api/profile', {
        method: 'POST',
        body: JSON.stringify(updatedUserData),
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      data = await res.json();

      if (!res.ok) throw Error(data.error);

      setUserInfo({ ...userInfo, token: data.token, ...jwtDecode(data.token) });
      ls.setToken(data.token);

      setToast({
        ...toast,
        show: true,
        type: ToastTypes.SUCCESS,
        message:
          'You have successfully updated.',
      });

      console.log('Response: ', data);

      setIsLoading(false);
      setTimeout(() => {
        router.push('/profile');
      }, toast.ttl || 3000);

      // show success/error
    } catch (err) {
      console.log(err.message);
      setToast({
        ...toast,
        show: true,
        type: ToastTypes.ERROR,
        message: err.message,
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let shouldUpdate = true;
    if (!ls.getToken()) router.replace('/auth');
    else {
      async function fetchProfile() {
        try {
          const res = await fetch('/api/profile', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${ls.getToken()}`,
            },
          });
          const data = await res.json();
          if (shouldUpdate) {
            setName(data.user.name || '');
            setBio(data.user.bio || '');
            setSocials(data.user.socials || {});
          }
          if (!res.ok) {
            console.log(data.message);
          }
        } catch (e) {
          console.log(e.message);
          setToast({
            ...toast,
            show: true,
            type: ToastTypes.ERROR,
            message: e.message,
          });
        }
      }
      fetchProfile();
    }
    return () => {
      shouldUpdate = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return (
    <form
      onSubmit={handleSubmit}
      autoComplete='false'
      className={styles['wrapper']}
    >
      <Toast type={toast.type} show={toast.show} handleClose={handleToastClose}>
        <span>{toast.message}</span>
      </Toast>
      <div className={styles['form-elements']}>
        <div className={styles['photo']}>
          <span className={styles['photo-title']}>Profile picture</span>
          <label htmlFor='photo'>
            <span>{!imgData ? 'Choose photo...' : imgData.name}</span>
            <span className={styles['file-input-browse']}>Browse</span>
            <input
              disabled={disabled}
              id='photo'
              type='file'
              onChange={(e) => {
                setImgData(e.target.files[0]);
                e.target.value = '';
              }}
              accept='image/png, image/jpeg, image/jpg, image/gif'
            />
          </label>

          {imgData && (
            <div className={styles['image-wrapper']}>
              <Image
                width={'300px'}
                height={'300px'}
                src={URL.createObjectURL(imgData)}
                alt='profile picture'
              />
            </div>
          )}
        </div>
        <div className={styles['name']}>
          <label htmlFor='name'>Name</label>
          <input
            disabled={disabled}
            type='text'
            value={name}
            id='name'
            maxLength={100}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={styles['bio']}>
          <label htmlFor='bio'>Bio</label>
          <textarea
            disabled={disabled}
            type='text'
            maxLength={300}
            value={bio}
            id='bio'
            onChange={(e) => setBio(e.target.value)}
          />
        </div>
        <div className={styles['social-group']}>
          <label>Socials</label>
          {social_media_list.map((website_name) => {
            return (
              <div className={styles['social']} key={website_name}>
                <label htmlFor={website_name}>{website_name}</label>
                <input
                  disabled={disabled}
                  type='url'
                  name={website_name}
                  value={socials[website_name] || ''}
                  id={website_name}
                  autoComplete={'new-password'}
                  onChange={(e) => {
                    setSocials({ ...socials, [e.target.name]: e.target.value });
                  }}
                />
              </div>
            );
          })}
        </div>
        <div className={styles['password']}>
          <label htmlFor='new-password'>New Password</label>
          <input
            disabled={disabled}
            type='password'
            value={newPass}
            autoComplete={'new-password'}
            id='new-password'
            title='Password should be at least 6 characters long'
            pattern='^.{6,}$'
            onChange={(e) => setNewPass(e.target.value)}
          />

          <label htmlFor='confirm-pass'>Confirm Password</label>
          <input
            disabled={disabled}
            type='password'
            value={confirmPass}
            autoComplete={'new-password'}
            id='confirm-pass'
            title='Password should be at least 6 characters long'
            pattern='^\S{6,}$'
            onChange={(e) => setConfirmPass(e.target.value)}
          />
        </div>

        {/* Should this section be in modal? onSubmit give current password? */}
        <div className={styles['current-password']}>
          <label htmlFor='current-pass'>
            Current Password <span>(required)</span>
          </label>
          <input
            disabled={disabled}
            type='password'
            required
            value={currentPass}
            id='current-pass'
            onChange={(e) => setCurrentPass(e.target.value)}
          />
        </div>
        {isLoading && <Loading className={styles['loading']} />}
        <div className={styles['actions']}>
          <button type='submit'>Submit</button>
          <Link href={'/profile'} passHref>
            <button type='button'>Cancel</button>
          </Link>
        </div>
      </div>
    </form>
  );
};

export default ProfileEdit;

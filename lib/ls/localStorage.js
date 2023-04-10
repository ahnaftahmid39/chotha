export const getToken = () => {
  return localStorage.getItem('token');
};

export const setToken = (token = '') => {
  return localStorage.setItem('token', token);
};

export const savePostsTemporarily = (posts) => {
  return localStorage.setItem('temp_posts', JSON.stringify(posts));
};

export const getTemporaryPosts = () => {
  let tpstr = localStorage.getItem('temp_posts');
  if (tpstr == undefined) tpstr = null;
  return JSON.parse(tpstr);
};

export const emptyTemporaryPosts = () => {
  return localStorage.removeItem('temp_posts');
};

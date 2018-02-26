export const getUser = () => localStorage.getItem('user');
export const getJWT = () => localStorage.getItem('jwt');

export const getJWTAuthHeader = jwt => ({
  'Authorization': 'Bearer ' + jwt,
});

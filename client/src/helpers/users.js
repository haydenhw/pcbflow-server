import jwtDecode from 'jwt-decode';

export const getUser = () => JSON.parse(localStorage.getItem('user'));
export const getJWT= () => localStorage.getItem('jwt');
export const clearUser = () => localStorage.removeItem('user');
export const clearJWT = () => localStorage.removeItem('jwt');

const postJSON = (url, data) => {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

const refreshJWT = (refreshURL) => {

}

export const getJWTAuthHeader = jwt => ({
  'Authorization': 'Bearer ' + jwt,
});

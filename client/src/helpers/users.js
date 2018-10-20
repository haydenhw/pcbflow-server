import jwtDecode from 'jwt-decode';

export const getUser = () => JSON.parse(localStorage.getItem('pcbflowDemoUser'));
export const getJWT= () => localStorage.getItem('pcbflowJWT');
export const setUser = user => localStorage.setItem('pcbflowDemoUser', JSON.stringify(user));
export const setJWT = jwt => localStorage.setItem('pcbflowJWT', jwt);
export const clearUser = () => localStorage.removeItem('pcbflowDemoUser');
export const clearJWT = () => localStorage.removeItem('pcbflowJWT');

export const isJWTExpired = jwt => {
  const jwtExp = jwtDecode(jwt).exp;
  const now = new Date() / 1000;

  return now > jwtExp;
}

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

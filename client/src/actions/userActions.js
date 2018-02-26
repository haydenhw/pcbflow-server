import shortid from 'shortid';
import jwtDecode from 'jwt-decode';
import { fetchProjects } from 'actions/indexActions';

const generateUserData = () => ({
  username: shortid.generate(),
  password: 'public_placeholder_pw',
});

const saveUserLocally = user => localStorage.setItem('user', JSON.stringify(user));
const saveJWTLocally = jwt => localStorage.setItem('jwt', jwt);

const getJWTAuthHeader = jwt => ({
  'Authorization': 'Bearer ' + jwt,
});

const postJSON = (url, data) => {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

const getJWT = (authUrl, user) => {
  return postJSON(authUrl, user)
    .then(res => res.json())
    .then(jwtObject => jwtObject.authToken)
};

const testUser = { username: 'SJXmrveuf', password: 'public_placeholder_pw' }

// getJWT(authUrl, testUser);

const createNewUser = (userData, userUrl) => {
  return postJSON(userUrl, userData)
  .then(user => user.json())
};

export const handleNewUserVisit = () => (dispatch) => {
  const newUser = generateUserData();
  const userUrl =  '/users';
  const authUrl = '/auth/login';

  createNewUser(newUser, userUrl)
  .then((user) => {
    saveUserLocally(user);
    return getJWT(authUrl, newUser);
  })
  .then((jwt) => {
    saveJWTLocally(jwt);
  });
};

const isJWTExpired = jwt => {
  const jwtExp = jwtDecode(jwt).exp;
  const now = new Date() / 1000;

  return now > jwtExp;
}

const refreshJWT = (jwt, refreshUrl) => {
  return fetch(refreshUrl, {
    method: 'POST',
    headers: {
      ...getJWTAuthHeader(jwt)
    }
  });
};

export const handleExistingUserVisit = (jwt) => (dispatch) => {
  const refreshUrl = '/auth/refresh';

  if(isJWTExpired(jwt)) {
    console.log('expired')
    return refreshJWT(jwt, refreshUrl)
    .then(res => res.json())
    .then((refreshedJWT) => {
      dispatch(fetchProjects(refreshedJWT));
    });
  }

  dispatch(fetchProjects(jwt));
}

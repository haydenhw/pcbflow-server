import shortid from 'shortid';
import jwtDecode from 'jwt-decode';
import { fetchProjects } from 'actions/indexActions';
import { isJWTExpired, setJWT, setUser } from 'helpers/users';

const createNewUser = (userData, userUrl) => postJSON(userUrl)(userData);

const getNewJWT = (user, loginUrl) => {
  return fetch(loginUrl, {
    method: 'POST',
    body: JSON.stringify(user),
  });
};

const getUserCredentials = username => ({
  username,
  password: 'public_placeholder_pw',
})

const getJWTAuthHeader = jwt => ({
  'Authorization': 'Bearer ' + jwt,
});

const fetchJWT = (loginUrl, user) => {
  const loginUser = postJSON(loginUrl);
  return loginUser(user).then(jwtObject => jwtObject.authToken);
};

const generateDemoUser = () => ({
  username: shortid.generate(),
  password: 'public_placeholder_pw',
});

const postJSON = (url) => (data) => {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(res => res.json())
};

const refreshJWT = (jwt, refreshUrl) => {
  return fetch(refreshUrl, {
    method: 'POST',
    headers: {
      ...getJWTAuthHeader(jwt)
    }
  });
};

export const handleNewUserVisit = () => (dispatch) => {
  const newUser = generateDemoUser();
  const userUrl =  '/users';
  const loginUrl = '/auth/login';

  createNewUser(newUser, userUrl)
  .then((user) => {
    setUser(user);
    return fetchJWT(loginUrl, newUser);
  })
  .then((jwt) => {
    setJWT(jwt);
    dispatch(fetchProjects(jwt));
  });
};

export const handleExistingUserVisit = (jwt, user) => (dispatch) => {
  const userCredentials = getUserCredentials(user.username);
  const loginUrl = '/auth/login';
  const getNewJWT = postJSON(loginUrl);

  if(isJWTExpired(jwt)) {
    console.log('jwt is expired. fetching a new one...')
    return getNewJWT(userCredentials)
    .then((newJWTObj) => {
      const { authToken } = newJWTObj;
      setJWT(authToken)
      // dispatch(fetchProjects(authToken));
    });
  }

  // dispatch(fetchProjects(jwt));
};

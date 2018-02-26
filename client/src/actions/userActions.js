import shortid from 'shortid'

const generateUserData = () => ({
  username: shortid.generate(),
  password: 'public_placeholder_pw',
});

const saveUserLocally = user => localStorage.setItem('user', JSON.stringify(user));
const saveJWTLocally = jwt => localStorage.setItem('jwt', jwt);

const getJWTAuthHeader = jwt => ({
  'Authorization': 'Bearer ' + jwt,
});

const jwtHeader = getJWTAuthHeader(shortid.generate());

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

  console.log('action called');

  createNewUser(newUser, userUrl)
  .then((user) => {
    saveUserLocally(user);
    return getJWT(authUrl, newUser);
  })
  .then((jwt) => {
    saveJWTLocally(jwt);
    console.log(localStorage.getItem('jwt'));
  });
};

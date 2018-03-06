require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');

const { PORT, DATABASE_URL } = require('./api/config');
const { Modules, Projects } = require('./api/models');
const { localStrategy, jwtStrategy } = require('./api/strategies');
const projectRouter = require('./api/routes/projectRouter');
const userRouter = require('./api/routes/userRouter');
const authRouter = require('./api/routes/authRouter');
const demoProject = require('./api/demoProject');

const app = express();
const jwtAuth = passport.authenticate('jwt', { session: false });

mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({
  extended: true,
}));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.use(express.static('public'));

app.use(bodyParser.json());

app.use('/auth', authRouter);
app.use('/projects', projectRouter);
app.use('/users', userRouter);

passport.use(localStrategy);
passport.use(jwtStrategy);

app.get('/modules', (req, res) => {
  Modules
    .find()
    .exec()
    .then(modules => res.json(modules))
    .catch(
      err => {
        console.error(err);
        res.status(500).json({message: 'Internal Server Error'});
      });
});

app.get('/protected', jwtAuth, (req, res) => {
  return res.json({
    data: 'rosebud'
  });
});

app.get('/test', (req, res) => {
  console.log('test hit');
  res.send({test: 'success'});
});

app.post('/test', (req, res) => {
  console.log('post hit');
  console.log(req.body)

  Modules
    .create({
      'function': req.body.function,
      'height': req.body.height,
      'width': req.body.width
    })
  .then(project => res.status(201).json(project))
  .catch(err => {
        console.error(err);
        res.status(500).json({message: 'Internal server error'});
    });
});

function insertDemoProject() {
  const demoProjectId = demoProject._id;
  let doesDemoProjectExist;

  Projects
    .findById(demoProjectId)
    .exec()
    .then(project => {
      return Boolean(project)
    })
    .then((bool) => {
      if (!bool) {
        Projects.create(demoProject);
      }
    })
}

// insertDemoProject();


function tearDownDb() {
  return new Promise((resolve, reject) => {
    console.warn('Deleting database');
    mongoose.connection.dropDatabase()
      .then(result => resolve(result))
      .catch(err => reject(err));
  });
}

 //tearDownDb()

let server;

function runServer(databaseUrl=DATABASE_URL, port=PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, { useMongoClient: true }, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
      .on('error', err => {
        mongoose.disconnect();
        reject(err);
      });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
     return new Promise((resolve, reject) => {
       console.log('Closing server');
       server.close(err => {
           if (err) {
               return reject(err);
           }
           resolve();
       });
     });
  });
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
};

module.exports = { app, runServer, closeServer };

require('dotenv').config()

exports.DATABASE_URL = (
  process.env.DATABASE_URL ||
  global.DATABASE_URL ||
  'mongodb://hayden321:46869269a@ds119380.mlab.com:19380/bread-pcb-tool'
);

exports.PORT = process.env.PORT || 3001;
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';
exports.IS_AUTH_ACTIVE = false;

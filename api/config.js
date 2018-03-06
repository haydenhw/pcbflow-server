require('dotenv').config()

exports.DATABASE_URL = process.env.DATABASE_URL || global.DATABASE_URL ;
exports.PORT = process.env.PORT || 3002;
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '1s';
exports.IS_AUTH_ACTIVE = true;

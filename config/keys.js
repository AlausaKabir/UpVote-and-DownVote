require('dotenv').config();

module.exports = {
    TEST_DB: process.env.TEST_DB,
    DATABASE_URI: process.env.DATABASE_URI,
    JWTSecret: process.env.JWT_Secret
}
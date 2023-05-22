const jwt = require('jsonwebtoken');


function generateAccessToken(uid) {
  return jwt.sign({uid: uid}, process.env.TOKEN_SECRET, { expiresIn: '7d' });
}


function verifyToken(token) {
  return jwt.verify(token, process.env.TOKEN_SECRET);
}

module.exports = {
  generateAccessToken,
  verifyToken
};
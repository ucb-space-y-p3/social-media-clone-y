const jwt = require('jsonwebtoken');

// set token secret and expiration date
const secret = 'mysecretsshhhhh'; // hide!!!!!!!!!!!
const expiration = '2h'; // hide!!!!!!!!!!!

module.exports = {
  // function for our authenticated routes
  authMiddleware: function ({ req }) {
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req;
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
    }

    return req;
  },
  signToken: function ({ username, email, _id, firstInitial, lastInitial }) {
    const payload = { username, email, _id, firstInitial, lastInitial };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
  wsDecode: function ( encodedToken ) {
    try {
      // console.log(encodedToken)
      const token = encodedToken.split(' ').pop().trim();
      if (!token) {
        return null;
      }
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      return data;
    } catch {
      console.log('Invalid ws token');
    }

    return null;
  }
};

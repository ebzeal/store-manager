import jwt from 'jsonwebtoken';
import keys from '../config/keys';

export function adminAccess(req, res, next) {
  const access = true;
  if (access) {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).send({ auth: false, message: 'No token provided.' });
    }
    // const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.decode(token);
    if (!decoded.userPriviledge || decoded.userPriviledge !== 'Admin' || decoded.userPriviledge == null) {
      // noAccess = true;
      return res.status(500).send({ auth: false, message: 'Not authorized to access this page. For Admin only' });
    } else {
      return next();
    }
  }
}

export function userAccess(req, res, next) {
  const access = true;
  if (access) {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).send({ auth: false, message: 'No token provided.' });
    }
    jwt.verify(token, keys.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(500).send({
          // auth: false, message: err.message, //Give me a readable message
          auth: false, message: 'Sorry, you do not have access to this page. Contact Admin',
        });
      } else {
        return next();
      }
    });
  }
}

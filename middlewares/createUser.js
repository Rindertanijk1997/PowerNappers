import { v4 as uuidv4 } from 'uuid';
import db from '../db/index.js';

const createUser = (req, res, next) => {
  const { username, password } = req.body;

  const newUser = {
    userId: uuidv4(),
    username,
    password,
    createUser: new Date()
  };

  db.insert(newUser, (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to create user' });
    }
    req.user = user; 
    next();
  });
};

export default createUser;
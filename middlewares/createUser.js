// import { v4 as uuidv4 } from 'uuid';
import db from '../db/index.js';

const createUser = (req, res, next) => {
  const { username, password } = req.body;

  // Hämta nuvarande userId från counters collection
  db.findOne({ _id: 'userIdCounter' }, (err, counter) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve user count' });
    }

    const newUserId = counter ? counter.value + 1 : 1;

    const newUser = {
      userId: newUserId,
      username,
      password,
      createUser: new Date()
    };

    // Sätt in den nya användaren
    db.insert(newUser, (err, user) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to create user' });
      }

      // Uppdatera counter
      db.update({ _id: 'userIdCounter' }, { $set: { value: newUserId } }, { upsert: true }, (err) => {
        if (err) {
          console.error('Failed to update userId counter');
        }
                req.user = user;
        next();
      });
    });
  });
};

export default createUser;
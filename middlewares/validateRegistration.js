import db from '../db/index.js';

const validateRegistration = (req, res, next) => {
    const { username, password } = req.body;
  
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }
  
    if (username.length < 3 || password.length < 6) {
      return res.status(400).json({ error: 'Username must be at least 3 characters and password at least 6 characters long' });
    }
  
    db.findOne({ username: username }, (err, user) => {
      if (err) {
        return res.status(500).json({ error: 'Internal server error' });
      }
  
      if (user) {
        return res.status(409).json({ error: 'Username already exists' });
      }
  
      next(); 
    });
  };

  export default validateRegistration;
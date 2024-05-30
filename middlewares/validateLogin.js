import db from '../db/index.js';

const validateLogin = (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Both username and password are required.' });
    }

    db.findOne({ username }, (err, user) => {
        if (err) {
            console.error('Database error during login:', err);
            return res.status(500).json({ error: 'Internal server error while retrieving user data.' });
        }

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials provided.' });
        }

        req.user = user;
        next();
    });
};

export default validateLogin;
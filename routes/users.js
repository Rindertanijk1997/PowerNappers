import express from 'express';
import validateRegistration from '../middlewares/validateRegistration.js'; 
import createUser from '../middlewares/createUser.js';

const router = express.Router();

router.post('/register', validateRegistration, createUser, (req, res) => {
  res.status(201).json({ message: 'User created', user: req.user });
});

export default router;



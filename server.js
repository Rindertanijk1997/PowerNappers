import express from 'express';
import userRoutes from './routes/users.js';
import authRoutes from './routes/auth.js';

const app = express();
const PORT = 8080;

app.use(express.json());

app.use('/users', userRoutes);
app.use('/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
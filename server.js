import express from 'express';
import productsRoutes from './routes/products.js';
import userRoutes from './routes/users.js';
import authRoutes from './routes/auth.js';


const app = express();
const PORT = 8080;

app.use(express.json());

app.use('/products', productsRoutes);

app.use('/users', userRoutes);
app.use('/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
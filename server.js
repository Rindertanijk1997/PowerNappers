import express from 'express';
import orderRoutes from './routes/orders.js'; 

const app = express();
const PORT = 8080;

app.use(express.json());
app.use('/orders', orderRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
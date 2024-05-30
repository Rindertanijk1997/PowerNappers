import express from 'express';
import order from './routes/orders.js';

const app = express();
const PORT = 8080;

app.use(express.json());
app.use('/api', order);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

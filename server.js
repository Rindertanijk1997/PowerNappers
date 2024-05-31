import express from 'express';
import aboutRouter from './routes/about.js'

const app = express();
const PORT = 8080;

app.use('/about', aboutRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
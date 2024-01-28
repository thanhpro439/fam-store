import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { env } from './config/environment.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartRouters from './routes/cartRouters.js';
import uploadRouters from './routes/uploadRouters.js';
import deleteRouters from './routes/deleteRouters.js';

const port = 4000;
const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(
  `mongodb+srv://${env.DB_USER}:${env.DB_PASSWORD}@famstore.bc1gtb2.mongodb.net/famstore`
);

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRouters);
app.use('/api/upload', uploadRouters);
app.use('/api/delete', deleteRouters);

// API Creation
app.get('/', (req, res) => {
  res.send('Fam Store is running');
});

// Implement global error handler
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

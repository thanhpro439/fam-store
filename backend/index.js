import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';
import cors from 'cors';

const port = 4000;
import { env } from './config/environment.js';

const app = express();

// Using middleware express.json() to handle JSON
app.use(express.json());

// Using cors middleware
app.use(cors());

// API Creation
app.get('/', (req, res) => {
  res.send('Express App is running');
});

app.listen(port, (e) => {
  if (!e) {
    console.log(`Server is running on port ${port}`);
  } else {
    console.log('Error: ', e);
  }
});

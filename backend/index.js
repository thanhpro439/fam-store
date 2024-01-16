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

mongoose.connect(
  `mongodb+srv://${env.DB_USER}:${env.DB_PASSWORD}@famstore.bc1gtb2.mongodb.net/famstore`
);

// Image storage engine
const storage = multer.diskStorage({
  destination: './upload/images',
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

// Create upload endpoint for images
app.use('/images', express.static('upload/images'));
app.post('/upload', upload.single('product'), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`,
  });
});

// Schema for creating new product
const Product = mongoose.model('Product', {
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number,
    required: true,
  },
  old_price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  available: {
    type: Boolean,
    default: true,
  },
});

// Creating API for adding new product endpoint
app.post('/addproduct', async (req, res) => {
  let products = await Product.find({});
  let id;
  if (products.length > 0) {
    let last_product = products.slice(-1)[0];
    id = last_product.id + 1;
  } else {
    id = 1;
  }
  const product = new Product({
    id: id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
    date: req.body.date,
  });

  await product
    .save()
    .then((savedProduct) => {
      console.log('Product saved successfully:', savedProduct);
      res.json({
        success: true,
        name: req.body.name,
      });
    })
    .catch((error) => {
      console.error('Error saving product:', error);
      res.json({
        success: false,
        error: 'Internal Server Error',
      });
    });
});

// Creating API for removing product endpoint
app.post('/removeproduct', async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id })
    .then((result) => {
      if (result) {
        console.log('Product deleted successfully:', result);
        res.json({
          success: true,
          name: req.body.name,
        });
      } else {
        console.log('Product not found.');
        res.json({
          success: false,
        });
      }
    })
    .catch((error) => {
      console.error('Error deleting product:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

// Creating API for getting all product endpoint
app.get('/allproducts', async (req, res) => {
  Product.find()
    .then((products) => {
      res.send(products);
    })
    .catch((error) => {
      console.error('Error finding products:', error);
      res.status(500).send({ error: 'Internal Server Error' });
    });
});

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

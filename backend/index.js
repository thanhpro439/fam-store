const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const port = 5000;

const app = express();

// Using middleware express.json() to handle JSON
app.use(express.json());

// Using cors middleware
app.use(cors());

// Connect Mongoose database
mongoose.connect(
  'mongodb+srv://thanhramen439:Tuanthanh439@famstore.bc1gtb2.mongodb.net/famstore'
);

// API Creation
app.get('/', (req, res) => {
  res.send('Express App is running');
});

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
app.use('/images', express.static('/upload/images'));
app.post('/upload', upload.single('product'), (req, res) => {
  // Get the server address and port from the req object
  // const serverAddress = `${req.protocol}://${req.get('host')}`;

  // Create the URL for the uploaded image using the server address and port
  // const imageUrl = `${serverAddress}/images/${req.file.filename}`;

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

app.listen(port, (e) => {
  if (!e) {
    console.log(`Server is running on port ${port}`);
  } else {
    console.log('Error: ', e);
  }
});

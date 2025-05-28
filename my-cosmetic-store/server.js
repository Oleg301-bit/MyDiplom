const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect('mongodb://127.0.0.1:27017/shop')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

const productSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  price: Number,
  rating: Number,
  image: String,
  category: String,
});

const Product = mongoose.model('Product', productSchema);

app.get('/api/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Товар не знайдено' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Помилка сервера' });
  }
});

app.listen(5500, () =>
  console.log('🚀 Сервер запущено на http://localhost:5500')
);

const Product = require('../models/product');
const MongoClient = require('../services/mongoClient');
const ProductService = require('../services/productService');

MongoClient.connectDB();

const products = [
  new Product({
    name: "Sledgehammer",
    price: 125.76
  }),
  new Product({
    name: "Axe",
    price: 190.51
  }),
  new Product({
    name: "Bandsaw",
    price: 562.14
  }),
  new Product({
    name: "Chisel",
    price: 13.9
  }),
  new Product({
    name: "Hacksaw",
    price: 19.45
  }),
];

const createCatalog = async () => {
  await ProductService.save(products).then(() => MongoClient.disconnectDB());
};

createCatalog();
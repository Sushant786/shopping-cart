const Product = require('../models/product');

const save = async (products) => {
  try {
    for (var i = 0; i < products.length; i++) {
      await products[i].save();
    };
  } catch (err) {
    console.error(err);
  }
}

const fetchProducts = (returnProducts) => {
  try {
    Product.find((error, products) => {
      returnProducts(products);
    });
  } catch (error) {
    console.error(error);
  }
}

const findProductById = (productId, returnProduct) => {
  try {
    Product.findById(productId, (error, product) => {
      returnProduct(product);
    });
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  save,
  fetchProducts,
  findProductById
};
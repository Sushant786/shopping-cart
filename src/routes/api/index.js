const express = require('express');

const router = express.Router();
const ProductService = require('../../services/productService');
const ShoppingCart = require('../../models/shoppingCart');

router.get('/', (req, res) => {
  res.send('Shopping Cart API');
});

router.get('/catalog', (req, res) => {
  try {
    ProductService.fetchProducts((products) => {
      const data = products.map((product) => (
        {
          name: product.name,
          price: `$${product.price}`,
          $link: `http://localhost:9000/api/addItem/${product._id}`,
        }
      ));
      res.send({ products: data });
    });
  } catch (error) {
    res.json({
      success: false,
      result: {
        data: error.message
      }
    });
  }
});

router.get('/viewCart', (req, res) => {
  try {
    const oldCart = req.session.shoppingCart ? req.session.shoppingCart : { items: {}, totalQty: 0, totalPrice: 0 };
    const shoppingCart = new ShoppingCart(oldCart);
    res.send(shoppingCart.getCartItems());
  } catch (error) {
    res.json({
      success: false,
      result: {
        data: error.message
      }
    });
  }
});

router.post('/addItem/:id', (req, res) => {
  try {
    const productId = req.params.id;
    const oldCart = req.session.shoppingCart ? req.session.shoppingCart : { items: {}, totalQty: 0, totalPrice: 0 };
    ProductService.findProductById(productId, (product) => {
      const shoppingCart = new ShoppingCart(oldCart);
      shoppingCart.addItem(product);
      req.session.shoppingCart = shoppingCart;
      res.send({
        success: true,
        result: "Shopping item addedd to the cart successfully!!"
      });
    })
  } catch (error) {
    res.json({
      success: false,
      result: {
        data: error.message
      }
    });
  }
});

router.delete('/deleteItem/:id', (req, res) => {
  try {
    const productId = req.params.id;
    const oldCart = req.session.shoppingCart ? req.session.shoppingCart : { items: {}, totalQty: 0, totalPrice: 0 };
    const shoppingCart = new ShoppingCart(oldCart);
    shoppingCart.deleteItem(productId);
    req.session.shoppingCart = shoppingCart;
    res.send({
      success: true,
      result: "Shopping item deleted successfully!!"
    });
  } catch (error) {
    res.json({
      success: false,
      result: {
        data: error.message
      }
    });
  }
});

router.delete('/clearCart', (req, res) => {
  try {
    req.session.shoppingCart = {items: {}, totalQty: 0, totalPrice: 0};
    res.send({
      success: true,
      result: "Shopping cart cleared successfully!!"
    });
  } catch (error) {
    res.json({
      success: false,
      result: {
        data: error.message
      }
    });
  }
});

module.exports = router;
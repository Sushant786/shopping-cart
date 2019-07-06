const Util = require('../utils/helper');

class ShoppingCart {
  constructor(oldShoppingCart) {
    this.items = oldShoppingCart.items;
    this.totalQty = oldShoppingCart.totalQty;
    this.totalPrice = oldShoppingCart.totalPrice;
  }

  addItem(shoppingItem) {
    let savedItem = this.items[shoppingItem.id];
    if (!savedItem) {
      savedItem = {item: shoppingItem, qty: 0, price: 0};
      this.items[shoppingItem.id] = savedItem;
    }

    savedItem.qty++;
    savedItem.price = savedItem.item.price * savedItem.qty;
    this.totalQty++
    this.totalPrice += savedItem.item.price;
  }

  deleteItem(itemId) {
    for (var id in this.items) {
      if (itemId == this.items[id].item._id) {
        delete this.items[id];
      }
    }
  }

  getCartItems() {
    let cartItems = [];
    for (var id in this.items) {
      const data = {
        item: this.items[id].item.name,
        price: `$${Util.roundToTwo(this.items[id].item.price)}`,
        quantity: this.items[id].qty,
        total: `$${Util.roundToTwo(this.items[id].price)}`
      };
      cartItems.push(data);
    }
    return cartItems.length > 0
      ? {items: cartItems, totalQty: this.totalQty, grandTotal: `$${Util.roundToTwo(this.totalPrice)}`}
      : cartItems;
  }
}

module.exports = ShoppingCart;

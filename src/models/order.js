const MongoClient = require('../services/mongoClient');

const orderSchema = MongoClient.Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true}
});

module.exports = MongoClient.Model('Order', orderSchema);
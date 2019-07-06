const MongoClient = require('../services/mongoClient');

const productSchema = MongoClient.Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true}
});

module.exports = MongoClient.Model('Product', productSchema);
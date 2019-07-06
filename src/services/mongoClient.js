const mongoose = require('mongoose');

const connectDB = () => {
    try {
        mongoose.connect('mongodb://localhost:27017/shopping-cart', { useNewUrlParser: true });
    } catch (error) {
        console.error(error);
    }
}

const disconnectDB = () => {
    try {
        mongoose.disconnect();
    } catch (error) {
        console.error(error);
    }
}

const Schema = (schema) => {
    return mongoose.Schema(schema);
}

const Model = (name, schema) => {
    return mongoose.model(name, schema);
}

module.exports = {
    connectDB,
    disconnectDB,
    Schema,
    Model
};
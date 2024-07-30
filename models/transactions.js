// models/ProductTransaction.js
const mongoose = require('mongoose');

const transaction = new mongoose.Schema({
    id: Number,
    title: String,
    description: String,
    price: Number,
    dateOfSale: Date,
    isSold: Boolean
});

const Transaction = mongoose.model('Transaction', transaction);

module.exports = Transaction;

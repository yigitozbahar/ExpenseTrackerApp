const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Başlık alanı zorunludur"],
        trim: true,
        maxLength: [50, "Başlık 50 karakterden uzun olamaz"]
    },
    amount: {
        type: Number,
        required: [true, "Miktar alanı zorunludur"],
        maxLength: [20, "Miktar 20 karakterden uzun olamaz"],
        trim: true
    },
    type: {
        type: String,
        default: "expense"
    },
    date: {
        type: Date,
        required: [true, "Tarih alanı zorunludur"],
        trim: true
    },
    category: {
        type: String,
        required: [true, "Kategori alanı zorunludur"],
        trim: true
    },
    description: {
        type: String,
        required: false,
        maxLength: [50, "Açıklama 50 karakterden uzun olamaz"],
        trim: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Expense', ExpenseSchema)
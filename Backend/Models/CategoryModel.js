const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    type: {
        type: String,
        required: true,
        enum: ['income', 'expense']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null 
    },
    color: {
        type: String,
        default: '#000000'
    },
    icon: {
        type: String,
        default: 'default-icon'
    },
    isBase: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

module.exports = mongoose.model('Category', CategorySchema) 
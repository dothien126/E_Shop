const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    richDescription: {
        type: String,
        default: '',
    },
    image: {
        type: String,
        default: '',
    },
    images: [
        {
            type: String,
            default: '',
        },
    ],
    brand: {
        type: String,
        default: '',
    },
    price: {
        type: Number,
        default: 0,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    countInStock: {
        type: Number,
        required: true,
        min: 0,
    },
    rating: {
        type: Number,
        required: true,
    },
    numReviews: {
        type: Number,
        required: true,
    },
    isFeatured: {
        type: Boolean,
        default: false,
    },
})

productSchema.virtual('id').get(function () {
    return this._id.toHexString()
})

productSchema.set('toJSON', {
    virtuals: true,
})

exports.Product = mongoose.model('Product', productSchema)

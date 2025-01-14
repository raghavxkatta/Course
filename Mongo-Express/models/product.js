const mongoose = require('mongoose')
const {Schema}=mongoose
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        lowercase: true,/* in case the person types Fruits because enum mein small f hai  */
        enum: ['fruit', 'vegetable', 'dairy']
    },
    farm:{
        type: Schema.Types.ObjectId,
        ref:'Farm'
    }
});
const Product = mongoose.model('Product', productSchema)
module.exports = Product  
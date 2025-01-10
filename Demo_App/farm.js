const mongoose = require('mongoose')
const { schema } = mongoose
const farmSchema = new Schema({
    name: {
        type: String,
        required: True
    },
    name: {
        type: String,

    }
category: {
        type: String,
        enum: ['anaar', 'kela', 'paudha']
    }
})
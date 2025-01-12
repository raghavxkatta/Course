const mongoose = require('mongoose')
const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    Salary: {
        type: Number,
        required: true
    },
    experienceInYears: {
        type: Number,
        required: true,
        default: 0
    },
    Qualification: {
        type: String,
        required: true
    },
    isTreating: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    worksInHospital: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
})

module.exports = mongoose.model('Doctor', doctorSchema)
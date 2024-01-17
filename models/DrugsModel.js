const mongoose = require('mongoose')

const DrugsSchema = new mongoose.Schema({
    NAME: {
        type: String,
        required: [true, 'Fill out the name of the drug/medicine...'],
        unique: true
    },
    DESCRIPTION: {
        type: String,
        required: [true, 'Fill out the description of the drug/medicine...']
    },
    RETAIL_PRICE: {
        type: Number,
        required: [true, 'Fill out the retail price of the item...']
    },
    ISSUANCE_DATE_STRING: {
        type: String,
        required: [true, 'Fill out the issuance date for the item...']
    },
    EXPIRY_DATE_STRING: {
        type: String,
        required: [true, 'Fill out the expiry date for the item...']
    },
    LIFE_SPAN: {
        type: Number,
        required: true
    },
    UPDATED_BY: {
        type: mongoose.Types.ObjectId,
        ref: 'Admin',
        required: true
    }
}, { timestamps: true })

//Create Virtual Properties for the date to use for conversion later
DrugsSchema.virtual('issuanceDate').get(function(){
    return new Date(this.ISSUANCE_DATE_STRING)
})

DrugsSchema.virtual('expiryDate').get(function(){
    return new Date(this.EXPIRY_DATE_STRING)
})

DrugsSchema.pre('save', function(next) {
    this.RETAIL_PRICE = Number(this.RETAIL_PRICE)
    this.LIFE_SPAN = Number(this.LIFE_SPAN)
    this.ISSUANCE_DATE_STRING = this.issuanceDate.toDateString()
    this.EXPIRY_DATE_STRING = this.expiryDate.toDateString()
    next()
})

const DrugsModel = mongoose.model('Drugs', DrugsSchema)

module.exports = DrugsModel
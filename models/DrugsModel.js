const mongoose = require('mongoose')

const DrugsSchema = new mongoose.Schema({
    NAME: {
        type: String,
        required: [true, 'Fill out the name of the drug/medicine...'],
        unique: false
    },
    DESCRIPTION: {
        type: String,
        required: [true, 'Fill out the description of the drug/medicine...']
    },
    RETAIL_PRICE: {
        type: Number,
        required: [true, 'Fill out the retail price of the item...']
    },
    ISSUANCE_DATE: {
        type: Date,
        required: [true, 'Fill out the issuance date for the item...']
    },
    EXPIRY_DATE: {
        type: Date,
        required: [true, 'Fill out the expiry date for the item...']
    },
    LIFE_SPAN: {
        type: Object
    },
    UPDATED_BY: {
        type: mongoose.Types.ObjectId,
        ref: 'Admin',
        required: true
    }
}, { timestamps: true })

//Create Virtual Properties for the date to use for conversion later
// DrugsSchema.virtual('issuanceDate').get(function(){
//     return new Date(this.ISSUANCE_DATE_STRING)
// })

// DrugsSchema.virtual('expiryDate').get(function(){
//     return new Date(this.EXPIRY_DATE_STRING)
// })


DrugsSchema.pre('save', function(next) {
    try {
        this.RETAIL_PRICE = parseFloat(this.RETAIL_PRICE)
        this.ISSUANCE_DATE = new Date(this.ISSUANCE_DATE)
        this.EXPIRY_DATE = new Date(this.EXPIRY_DATE)
        this.LIFE_SPAN = dateDifference(this.ISSUANCE_DATE, this.EXPIRY_DATE)
        next()
    } catch (error) {
        console.log("error in the catch block", error)
        next(error)
    }
})

function dateDifference(startDate, endDate) {
    // Calculate the difference in years, months, and days
    const years = endDate.getFullYear() - startDate.getFullYear();
    const months = endDate.getMonth() - startDate.getMonth();
    const days = endDate.getDate() - startDate.getDate();

    // Adjust for negative months and days
    let adjustedMonths = months;
    let adjustedDays = days;

    if (adjustedDays < 0) {
        const lastMonthDays = new Date(endDate.getFullYear(), endDate.getMonth(), 0).getDate();
        adjustedMonths--;
        adjustedDays = lastMonthDays + adjustedDays;
    }

    if (adjustedMonths < 0) {
        adjustedMonths = 12 + adjustedMonths;
    }

    return {
        years: years,
        months: adjustedMonths,
        days: adjustedDays
    };
}

const Drugs = mongoose.model('Drugs', DrugsSchema)

module.exports = Drugs
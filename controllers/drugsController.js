const { StatusCodes } = require('http-status-codes')
const Drugs = require('../models/DrugsModel')

const getDrugsList = (req, res) => {
    res.send('all data')
}
const addDrugItem = async (req, res) => {
    console.log(req.user)
    //Make sure that admins who added items are recorded
    req.body.UPDATED_BY = req.user.userId

    const item = await Drugs.create(req.body)
    console.log(item.issuanceDate, item.expiryDate)
    res.status(StatusCodes.OK).json(item)
}
const getSingleDrug = (req, res) => {
    res.send('get single data')
}
const updateSingleDrug = (req, res) => {
    res.send('update data')
}
const deleteSingleDrug = (req, res) => {
    res.send('delete data')
}

module.exports = {
    getDrugsList,
    addDrugItem,
    getSingleDrug,
    updateSingleDrug,
    deleteSingleDrug
}


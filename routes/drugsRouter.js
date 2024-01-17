const express = require('express')
const router = express.Router()

const {
    getDrugsList,
    addDrugItem,
    getSingleDrug,
    updateSingleDrug,
    deleteSingleDrug
} = require('../controllers/drugsController')

router.route('/').get(getDrugsList).post(addDrugItem)
router.route('/:id').get(getSingleDrug).patch(updateSingleDrug).delete(deleteSingleDrug)

module.exports = router


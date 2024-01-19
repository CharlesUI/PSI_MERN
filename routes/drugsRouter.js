const express = require('express')
const router = express.Router()
const checkUserRole = require('../middlewares/checkUserRole')

const {
    getDrugsList,
    addDrugItem,
    getSingleDrug,
    updateSingleDrug,
    deleteSingleDrug
} = require('../controllers/drugsController')

router.route('/').get(checkUserRole, getDrugsList).post(checkUserRole, addDrugItem)
router.route('/:id').get(checkUserRole, getSingleDrug).patch(checkUserRole, updateSingleDrug).delete(checkUserRole, deleteSingleDrug)

module.exports = router


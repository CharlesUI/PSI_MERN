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

//check user role before accessing
router.use(checkUserRole)

router.route('/').get(getDrugsList).post(addDrugItem)
router.route('/:id').get(getSingleDrug).patch(updateSingleDrug).delete(deleteSingleDrug)

module.exports = router


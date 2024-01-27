const { UnauthorizedError } = require("../errors/ErrorClassObj")
const Admin = require('../models/AdminModel')

const checkUserRole = async (req, res, next) => {
    const admin = await Admin.findOne({ _id: req.user.userId })
    if(!admin) {
        throw new UnauthorizedError('You are not authorized!')
    }

    const role = admin ? admin.role : undefined
    if(role === 'main_admin' || role === 'admin') {
        next()
    } else {
        throw new UnauthorizedError('You are not authorized!')
    }
}

module.exports = checkUserRole
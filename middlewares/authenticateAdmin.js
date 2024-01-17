const { UnauthorizedError } = require("../errors/ErrorClassObj")
const jwt = require('jsonwebtoken')
const Admin = require('../models/AdminModel')

const authenticateAdmin = async (req, res, next) => {
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith('Bearer')) {
        throw new UnauthorizedError('Unauthorized attempt')
    }

    const token = authHeader.split(' ')[1]
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = { userId: payload.userId, name: payload.username }
        next()
    } catch (error) {
        console.log(error)
    }
}

module.exports = authenticateAdmin
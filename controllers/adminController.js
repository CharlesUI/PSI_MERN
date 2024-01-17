const { StatusCodes } = require('http-status-codes')
const Admin = require('../models/AdminModel')
const { BadRequestError, UnauthorizedError } = require('../errors/ErrorClassObj')

const register = async (req, res) => {
    //Pass the req.body to the admin model and process it in the middleware pre of mongoose
    const admin = await Admin.create(req.body)
    //Create token after registering
    const token = admin.createToken()
    res.status(StatusCodes.OK).json({ admin, token })
}

const login = async (req, res) => {
    const { username, password } = req.body

    if(!username || !password) {
        throw new BadRequestError('Fill out all the necessary fields')
    }

    const admin = await Admin.findOne({ username })
    if(!admin) {
        throw new UnauthorizedError('User not Authorized')
    }

    //If Admin exist check for the password
    const isPasswordCorrect = admin.isMatch(password)
    if(!isPasswordCorrect) {
        throw new UnauthorizedError('User not Authorized')
    }

    const token = admin.createToken()
    res.status(StatusCodes.OK).json({ admin, token })
}

module.exports = {
    register,
    login
}
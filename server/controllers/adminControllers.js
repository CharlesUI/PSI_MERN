const { StatusCodes } = require('http-status-codes')
const Admin = require('../model/Admin')
const { BadRequestError, UnAuthorizedError } = require('../errors/ErrorClass')

const register = async (req, res) => {
    //Create using admin model
    const admin = await Admin.create(req.body)

    //After registration, create a token
    const token = admin.createToken()

    res.status(StatusCodes.OK).json({token, ...{ email: admin.email, adminUser: admin.username }})
}
const login = async (req, res) => {
    const { username, password } = req.body

    if(!username || !password) {
        throw new BadRequestError('Fill out all the necessary fields...')
    }

    const admin = await Admin.findOne({username}) 
    if(!admin) {
        throw new UnAuthorizedError('User not Authorized')
    }

    //Check the password if the admin username is found on the database
    const isPasswordCorrect = await admin.isMatch(password)
    if(!isPasswordCorrect) {
        throw new UnAuthorizedError('User not Authorized')
    }

    const token = admin.createToken()

    res.status(StatusCodes.OK).json({token, ...{ email: admin.email, adminUser: admin.username }})
}

module.exports = {
    register,
    login
}
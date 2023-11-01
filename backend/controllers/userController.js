const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const asyncHandler = require("express-async-handler")
const User = require("../model/userModel")

// @desc    Register new user
// @route   POST/api/users/
// @access  Public
const regUser = asyncHandler(async (req, res) => {
    const {name, email, passw} = req.body

    if(!name || !email || !passw){
        res.status(400)
        throw new Error ("Please add all the fields")
    }
    // checking existing user
    const userExist = await User.findOne({email})
    if(userExist){
        res.status(400)
        throw new Error("The user already exist")
    }

    // hashing password
    const salt = await bcrypt.genSalt(10)
    const hasshedPW = await bcrypt.hash(passw, salt)

    //creating user
    const user = await User.create({
        name,
        email,
        passw: hasshedPW
    })

    if(user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })}
    else{
        res.status(400)
        throw new Error("Invalid User")
    }
    
})

const loginUser = asyncHandler(async (req, res) => {
    const {email, passw} = req.body
    const user = await User.findOne({email})

    if(user && await bcrypt.compare(passw, user.passw)){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error ("Invalid Credentials")
    }
    res.status(200).json({"message": "login user"})
})

const findME = asyncHandler(async (req, res) => {
    const {_id, email, name} = await User.findById(req.user.id)
    res.status(200).json({
        id: _id,
        name,
        email
    })
})

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "30d"} )
}

module.exports = {regUser, loginUser, findME}
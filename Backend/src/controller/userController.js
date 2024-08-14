const User = require('../models/userSchema');
const bcrypt = require('bcrypt')
const { generateToken } = require('../utils/generateToken');


const userRegistration = async (req, res) => {
    try {
        const { userName, email, password } = req.body;
        if (!userName.length || !email || !password) {
            res.status(400).json({
                status: 'failed',
                message: 'data missing'
            })
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                status: 'failed',
                message: 'user already exist'
            })
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const user = new User({ userName, email, password: hash });
        const savedUser = await user.save();

        res.status(201).json({
            status: 'succes',
            message: 'user registered succefully',
            savedUser
        })

    } catch (error) {
        res.status(400).json({
            stattus: 'failed',
        })
        console.log(error, "err");

    }
}


const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({
                status: 'failed',
                message: 'email or password is not provided'
            })
        }
        const user = await User.findOne({ email })
        console.log(user);

        const userPassword = user.password
        const hash = await bcrypt.compareSync(password, userPassword);
        const token = generateToken(user)
        if (hash) {
            res.status(200).json({
                status: 'sucess',
                message: "login succesfully",
                token
            })

        }

    } catch (error) {
        console.log(error);
    }
}


const getuser = async (req, res) => {
    try {
        const id = req.decoded.user._id;
        const user = await User.findOne({ _id: id })
        return res.status(200).json({
            status: "success",
            user
        })


    } catch (error) {
        console.log(error);

    }
}


module.exports = { userRegistration, login, getuser } 
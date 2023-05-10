const user = require("../schemas/users")
const jwt = require('jsonwebtoken')

const signup = async (req, res) => {
    const data = {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
    }

    if (!await isUsernameExist(data.username)) {
        if (!await isEmailExist(data.email)) {
            try {
                await user.create(data)
                console.log("New user created " + new Date().toLocaleString('en-GB', {
                    hour12: true,
                }))
                return await res.status(200).json("User created successfully")
            } catch (error) {
                return await res.status(400).json(Object.values(error.errors).map(val => val.message))
            }
        } else {
            return res.status(400).json({ message: "This Email is already exist" })
        }
    } else {
        return res.status(400).json({ message: "This Username is already exist" })
    }
}

const login = async (req, res) => {
    try {
        const result = await user.find({ username: req.body.username, password: req.body.password })
        if (result.length == 1) {
            const token = jwt.sign({ time: Date(), username: result[0].username, role: result[0].role }, process.env.JWT_KEY, { expiresIn: '30d' });
            return res.status(200).json({
                token: token,
            })
        } else {
            return res.status(400).json({ message: "Invalid username or password" })
        }
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

const isUsernameExist = async (username) => {
    try {
        const result = await user.find({ username: username })
        return result.length >= 1 ? true : false
    } catch (error) {
        console.log(err.message)
        return false
    }
}

const isEmailExist = async (email) => {
    try {
        const result = await user.find({ email: email })
        return result.length >= 1 ? true : false
    } catch (error) {
        console.log(err.message)
        return false
    }
}

module.exports = {signup, login }
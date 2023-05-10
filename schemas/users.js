const mongoose = require("mongoose")
const validator = require("validator")
const uniqueValidator = require("mongoose-unique-validator")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique:true,
        validate(value) {
            if (value.length < 4) {
                throw new Error("Username must be more than 4 characters")
            } else if (value.includes(" ")) {
                throw new Error("Username cannot contain space")
            }
        }
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique:true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid email")
            }
        }
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        validate(value) {
            if (value.length < 4) {
                throw new Error("Password must be more than 4 characters")
            } else if (value.replace(/\s/g, "").length <= 0) {
                throw new Error("Field cannot be empty")
            }
        }
    },
    role: {
        type: String,
        default: "user"
    },
    registerDate: {
        type: Date,
        default: () => new Date().toLocaleString('en-GB', {
            hour12: true,
        })
    }

})
userSchema.plugin(uniqueValidator)

module.exports = mongoose.model("users", userSchema)
const mongoose = require("mongoose")
const conn = async ()=>{
    try {
        await mongoose.connect(process.env.URI)
    } catch (error) {
        console.log(error.message)
    }
}
module.exports = conn
const mongoose = require("mongoose")
const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Add your name"]
        },
        email: {
            type: String,
            required: [true, "Add your mail address"],
            //unique: true
        },
        passw: {
            type: String,
            required: [true, "Add your password"]
        }
    },
    {
        timestamp: true
    }
)

module.exports = mongoose.model("User", userSchema)
const mongoose = require("mongoose")
const goalSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        requried: true,
        ref: "User"
    },
    text: {
        type: String,
        requried: [true, "Please add a text value"]
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Goal", goalSchema)
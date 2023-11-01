const express = require("express")
const router = express.Router()
const {getGoals, setGoals, updGoals, delGoals} = require("../controllers/goalController")
const {protect} = require("../middleware/authMiddleware")

//router.get("/", getGoals).post("/", setGoals)
router.route("/").get(protect, getGoals).post(protect, setGoals)
router.put("/:id", protect, updGoals).delete("/:id", protect, delGoals)

module.exports = router


const express = require("express")
const router = express.Router()
const {getGoals, setGoals, updGoals, delGoals} = require("../controllers/goalController")

//router.get("/", getGoals).post("/", setGoals)
router.route("/").get(getGoals).post(setGoals)
router.put("/:id", updGoals).delete("/:id", delGoals)

module.exports = router


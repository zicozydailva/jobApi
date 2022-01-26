const { register, login } = require("../controllers/auth")
const valid = require("../middleware/valid")

const router = require("express").Router()


router.post("/register", register)
router.post("/login", valid, login)

module.exports = router
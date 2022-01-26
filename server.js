const express = require("express")
require("dotenv").config()
const mongoose = require("mongoose")
const app = express()

const authRoute = require("./routes/users")
const jobRoute = require("./routes/jobs")
const authUser = require("./middleware/authen")

// MIDDLEWARE
app.use(express.json())


// DB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("DB CONNECTED SUCCESSFULLY"))

// ROUTES
app.use("/api/v1/auth", authRoute)
app.use("/api/v1/jobs",authUser, jobRoute)


const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Server is running on port ${port}`))
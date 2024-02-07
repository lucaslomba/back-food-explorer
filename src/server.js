require("dotenv/config")

const AppError = require("./utils/AppError")

const express = require("express")
const app = express()

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
const { Router } = require("express")

const UsersController = require("../controllers/UserController")
const usersController = new UsersController();

const usersRoutes = Router()
usersRoutes.post("/", usersController.create)

module.exports = usersRoutes
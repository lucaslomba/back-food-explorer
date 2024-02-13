const { Router } = require("express")

const DishsController = require("../controllers/DishsController")
const dishsController = new DishsController()

const dishsRoutes = Router()
dishsRoutes.post("/", dishsController.create)

module.exports = dishsRoutes
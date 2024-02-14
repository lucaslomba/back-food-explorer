const { Router } = require("express")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const DishsController = require("../controllers/DishsController")
const dishsController = new DishsController()

const dishsRoutes = Router()
dishsRoutes.use(ensureAuthenticated)

dishsRoutes.post("/", dishsController.create)

module.exports = dishsRoutes
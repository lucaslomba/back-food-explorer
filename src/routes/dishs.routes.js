const { Router } = require("express")
const multer = require("multer")
const uploadConfig = require("../configs/upload.js")


const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const DishsController = require("../controllers/DishsController")
const dishsController = new DishsController()

const dishsRoutes = Router()
const upload = multer(uploadConfig.MULTER)

dishsRoutes.post("/",ensureAuthenticated, upload.single("dishFile"), dishsController.create)
dishsRoutes.get("/",ensureAuthenticated, dishsController.index)
dishsRoutes.get("/:id",ensureAuthenticated, dishsController.show)
dishsRoutes.patch("/:id", ensureAuthenticated, upload.single("dishFile"), dishsController.update)

module.exports = dishsRoutes
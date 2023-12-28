const { Router } = require("express")
const UsersController = require("../controllers/UsersController")

const usersRoutes = Router()

const usersController = new UsersController()
//Route Params
usersRoutes.get("/:id", usersController.create)

usersRoutes.get("/:id/:userName", usersController.routeTest)

module.exports = usersRoutes

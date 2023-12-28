const { Router } = require("express")
const ProdsController = require("../controllers/ProdsController")
const prodsController = new ProdsController()
const prodsRoutes = Router()
//Get Query Params
prodsRoutes.get("/", prodsController.create)

module.exports = prodsRoutes

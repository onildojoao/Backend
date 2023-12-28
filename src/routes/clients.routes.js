const { Router } = require("express")
const ClientsController = require("../controllers/ClientsController")
const clientsController = new ClientsController()
const clientsRoutes = Router()

/* function myMiddleware(request, response, next) {
  if (!request.body.isAdmin)
    return response.json({ message: "User unauthorized" })
  next()
} */

//POST
clientsRoutes.post("/", clientsController.create)

module.exports = clientsRoutes

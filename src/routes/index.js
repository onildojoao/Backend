const {Router} = require("express")

const usersRouter = require("./users.routes")
const clientsRouter = require("./clients.routes")
const prodsRouter = require("./prods.routes")

const routes = Router()

routes.use("/users", usersRouter)
routes.use("/clients", clientsRouter)
routes.use("/prods", prodsRouter)

module.exports = routes
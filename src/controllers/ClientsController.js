const AppError = require("../utils/AppError")

class ClientsController {
  create(request, response) {
    const { name, email, password } = request.body
    /* response.send(
    `Rota POST client funcionando. Nome: ${request.body.name}, E-mail: ${request.body.email} e Senha: ${request.body.password}.`) */

    if (!name) {
      throw new AppError("O nome é obrigatório")
    }
    response.status(201).json({ name, email, password })
  }
}

module.exports = ClientsController

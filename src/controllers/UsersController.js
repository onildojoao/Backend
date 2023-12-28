class UsersController {
  create(request, response) {
    const { id } = request.params
    response.send(`Rota GET users funcionando.  O id do usuário é: ${id}`)
  }

  routeTest(request, response) {
    const { id, userName } = request.params
    response.send(
      `Rota GET users funcionando. O id do usuário é: ${id}, O nome do usuário é: ${userName}`
    )
  }
}

module.exports = UsersController

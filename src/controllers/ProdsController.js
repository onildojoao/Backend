class ProdsController {
  create(request, response) {
    const { page, limit } = request.query
    response.send(
      `Rota GET prod funcionando. Página: ${page}, Limite: ${limit}`
    )
  }
}

module.exports = ProdsController

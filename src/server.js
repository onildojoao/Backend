require("express-async-errors")
//Importando o express
const express = require("express")
const AppError = require("./utils/AppError")
//Fazendo a chamada do agregador de rotas
const routes = require("./routes")
//Iniciando o express
const app = express()
//Informando para a aplicação que vamos receber objetos do tipo json
app.use(express.json())
app.use(routes)

app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response
      .status(error.statusCode)
      .json({ status: "error", message: error.message })
  }

  return response
    .status(500)
    .json({ status: "error", message: "internal server error" })
})
const PORT = 3333
//Get Route Params
app.get("/", (request, response) => {
  response.send("Rota GET padrão funcionando.")
})

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`)
})

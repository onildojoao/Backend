<h2>Criando a estrutura do node</h2>
<p>Abra o terminal até a pasta designada, e roda o comando npm init -y</p>
<p>Por que -y?</p>
<p>Caso tente utilizar sem o -y, vão ser feitas várias perguntas durante o processo de instalação</p>

<h2>Configurando o backend para tratar as requisições HTTP</h2>

<p>Instale o express para lidar com essas requisições, rodando o comando no terminal npm i express --save</p>
<p>Por que o --save?</p>
<p>Para deixar salvo no projeto a biblioteca express.</p>
<p>Com a instalação do express, vários outros componentes serão baixados também na pasta node_modules</p>
<p>Caso apague a pasta node_modules, basta rodar no terminal o comando npm install</p>
<p>A pasta node_modules é naturalmente grande, então para evitar que ela seja enviada para o github, crie um arquivo chamado .gitignore e dentro dela escreva na primeira linha apenas o nome da pasta node_modules. Esse arquivo também serve para ignorar todas as outras pastas que quiser.</p>

<h2>Iniciando a API</h2>
<p>Como boa prática, crie uma nova pasta com o nome src, e dentro dela crie o arquivo server.js</p>
<p>Dentro do arquivo, importe o express pelo comando const express = require('express');</p>
<p>Depois disso crie uma nova variável para iniciar o express e indique a porta que ele irá executar, através do comando `const app = express();`
`const PORT = 3333;`
e depois `app.listen(PORT, () => {console.log(`Server is running at ${PORT}`)});`</p>

<h2>Executando o servidor</h2>
<p>Para executar o servidor, abra o terminal e rode o comando node src/server.js</p>
<p>Por que node src/server.js? </p>
<p>Precisamos rodar o arquivo que está o servidor, e para este início devemos roda-lo no caminho direto do arquivo principal.</p>
<p>Para facilitar rodar o servidor, vá no arquivo package.json e crie um script com um nome qualquer, e depois o comando de execução do servidor original. EX: "start": "node ./src/server.js". Feito isso, para executar o servidor basta rodar o comando node + o nome do script. EX: node start</p>
<p>Para parar o servidor, aperte Control C</p>
<p>O problema em utilizar essa forma é que sempre que houver alguma atualização de qualquer arquivo, o servidor precisa ser reiniciado manualmente. Anteriormente era utilizado o pacote nodemon, porém existe uma alternativa presente no próprio node.</p>

<h2>Usar Node em vez de nodemon</h2>
<p>A partir do node 18.11, podemos usar a flag node --watch para rodar o servidor e permitir que ele atualize automaticamente caso haja alguma atualização de arquivo. </p>
<p>Este processo era feito anteriormente pelo nodemon, mas hoje não é mais necessário.</p>
<p>Por padrão o node --watch vai apagar o console sempre que for rodar, mas para evitar que isso ocorra, é possível utilizar a flag --watch-preserve-output, ficando da seguinte forma node --watch --watch-preserve-output ./src/server.js</p>
<p>Para tornar mais fácil, basta fazer da mesma forma como o item de rodar o servidor, alterando o comando do script no arquivo package.json, ficando da seguinte forma `"start": "node --watch --watch-preserve-output ./src/server.js"`</p>
<p> <strong>ATENÇÃO</strong> - Lembre de executar o comando npm "script", e não node "script</strong>"

<h2>Trabalhando com Rotas e Métodos HTTP</h2>
Os métodos mais comuns são GET, POST, PUT, DELETE e PATCH<br>
<strong>POST = Criação de informações</strong><br>
<strong>PUT = Atualizar informações</strong><br>
<strong>DELETE = Deletar informações</strong><br>
<strong>PATCH = Atualização parcial de informações</strong><br><br>
<strong>GET = Leitura/Requisição de informações</strong>
<br>
<p>Para criar uma rota com o get, vamos utilizar o app que iniciou o express, ficando da seguinte forma `app.get("/", (request, response) => {
response.send("Rota GET funcionando.")})`</p>
<p>
Por padrão, a função callback sempre vai ter os parâmetros de request e response, sendo o response a devolutiva do servidor para o lado do cliente.</p>
<p>Dentro da "/" é informada a rota para cada uma das rotas desejadas, então podemos ter um /test, /clientes, /produtos e etc</p>
<br>

<strong>Route Params</strong><br>

<p>Podemos passar parâmetros para durante a chamada da url e obter eses valores pelo request da rota da aplicação.<br> EX: enderecoservidor.com.br/users/5</p>
<p>Geralmente utilizamos o Route Params para dados simples, como id de produto, usuário e etc.</p>
<p>Vamos adaptar a rota get para que ela possa perceber que esses valores passam a ser atributos. Vai ficar da seguinte forma <br>
EX app.get("/users/:id", (request, response) => { response.send("Rota GET users funcionando ${request.params.id}")})</p>
<p>Podemos criar quantos parâmetros quisermos, para isso basta editar a rota, e ela vai ficar da seguinte forma: <br>
EX app.get("/users/:id/:userName")</p>
<p>Com isso também podemos pegar o novo parâmetro passado pela requisição, ficando a seguinte forma: <br>
EX: response.send("Rota GET users funcionando. ID:${request.params.id}, Usuário: ${request.params.userName}")</p>
<p>Uma forma de facilitar a visualização do código é desestruturar o mesmo, pois a entrada de dados request.params se repete diversas vezes. Então podemos desestruturar da seguinte forma: <br>
EX: const {id, userName} = request.params</p>
<p>Feito isso, na resposta da rota, agora podemos utilizar diretamente através de interpolação as varáveis como ${id} e ${userName}</p>

<strong>Query Params</strong>

<p>Uma outra forma de passar as informações. Em vez de utilizarmos os dois pontos (:), agora vamos passar através da mudança na url da requisição com uma interrogação, seguida de chaves e valores. <br>
EX: enderecoservidor.com.br/users?page=2&limit=10</p>
<p>Porém nesse caso, a chamada da rota não precisa mais possuir as barras e dois pontos igual como foi com o Route Params. Então ela vai ficar da seguinte forma: <br>
EX: app.get("/users", (request, response) => {
const {val2, val3} = request.query})</p>
<p>Entende-se que os val2 e val3 estão implícitos na requisição, e eles podem existirem ou não, porem isso não faz como que ele retorne um erro.</p>
<p><strong>Quando utilizar Query Params em vez de Route Params?</strong><br>
Os valores dentro do Query Params podem ser opcionais. Diferente do Route Params que devem ser obrigatórios. Caso esteja utilizando o Route Params e não utilize todos os valores necessários, a aplicação vai retornar um erro.</p>

<h2>Body Params</h2>
<p>Geralmente utilizamos o método POST para enviar informações para a API, e essa informações comumente são enviadas através do corpo da requisição com o uso de JSON.</p>
<p>Dentro do Insomnia, criamos uma requisição do tipo POST, e em Body selecionamos a opção JSON. Feito isso, podemos criar um objeto JSON dentro da chamada e passarmos para a API.<br>
EX:{
	"name": "teste",
	"email":"email@teste.com",
	"password" : "123"
}</p>
<p>Neste exemplo, como estamos trabalhando com JSON, precisamos informar para a aplicação que vamos utilizar este formato no body das requisições. Para isso, vamos apenas adicionar uma linha de código, onde vamos dizer que vamos utilizar objetos do tipo JSON. Então, logo abaixo da variável que inicia o express, vamos escrever: <br>
app.use(express.json())</p>
<p>Uma vez dentro do servidor, podemos recuperar essa informações que foram passadas e trabalharmos com elas, desestruturando-as como foi feito em Route e Query Params.</p>
<p>Podemos devolver os dados também em forma de objeto, para isso em vez de utilizarmos a forma response.send, podemos utilizar response.json({name, email, password})</p>

<h2>Utilizando o Insomnia</h2>
<p>Os navegadores por padrão só permitem testes com o método GET, então para podermos utilizar os outros protocolos, podemos utilizar outras ferramentas para testar as outras formas de requisição</p>
<p>Podemos configurar o Insomnia para trabalhar com múltiplas rotas para facilitar o trabalho. Isso se da a partir da criação de pastas para cada tipo de requisição, e dentro dela colocar as chamadas de teste.</p>
<p>Podemos também criar variáveis de ambiente para evitar a repetição de códigos desnecessários, como por exemplo o endereço localhost vai sempre se repetir. Para isso vamos na opção de gerenciar ambientes, criamos um nome de um ambiente, e podemos criar uma variável com o endereço localhost para reaproveita-lo sempre que quisermos. EX: "BASE_URL": "localhost:3333"</p>
<p>Por fim podemos também criar uma variável de ambiente para cada uma das rotas, para isso basta ir na pasta agregadora, clicar na setinha ao lado e criar uma nova variável de ambiente com o nome e valor daquela rota, EX: "RESOURCES": "clients"</p>

<h2>Organizando a estrutura e separando responsabilidades</h2>
<p>Para ter uma boa consistência e manutenibilidade do código e do projeto, o ideal é separar as responsabilidades e componentes do projeto.</p>
<p>Uma ideia é criar uma pasta src que vai ter boa parte da lógica do servidor, contendo um server.js, routes.js, controllers.js, utils.js e as demais necessidades do banco de dados.</p>
<h3>Routes</h3>
<p>Começando pelas rotas, podemos criar uma pasta routes que vai agrupar todas as rotas possíveis do usuário. A partir dela, teremos arquivos separados para cada conjunto de rotas. Por exemplo user.routes.js, client.routes.js, prod.routes.js e etc.</p>

<p>Depois de criar cada arquivo de rotas, mova as rotas para cada arquivo relacionado. Feito isso, precisamos criar novamente o router do express, pois nesse novo arquivo de rota ele não conhece este iniciador. Porém dessa vez ele deve ser feito de forma diferente.<br>
Dentro do arquivo novo de rotas, a criação deve seguir o estilo de criação de uma constante: <br>
const {Router} = require ("express") <br>
const usersRoutes = Router()<br>
Precisamos importar e criar uma constante e iniciar esse Router para que os novos routers possam gerenciar as rotas já criadas, mas dentro dos novos arquivos</p>

<p>Após criado e iniciado o novo Router, ele vai tomar o lugar do app no novo arquivo de rotas, ficando: <br>
usersRoutes.post("/users", (request, response))...</p>

<p>Depois de criar cada um dos novos Routers nos arquivos específicos, precisamos agora expor esses novos Routers para o server.js, para que ele possa direcionar as chamadas para os caminhos corretos. Lembrando que por conta do script iniciar o server.js, ele vai ser sempre o caminho padrão para criar e iniciar as rotas</p>

<p>Para expor esses novos routers, vamos nos arquivos de cada um dos routes, e no final dos mesmos, digitamos a seguinte linha de código:<br>
module.exports = "nomeDoRouter"<br>
Com isso, quem precisar utilizar esses novos routers, vai poder utilizar somente importando para o servidor o novo router.</p>

<strong>Consolidando as Rotas</strong>

<p>É esperado que a aplicação cresça com o tempo, e com isso várias rotas sejam criadas. Uma boa prática para agregar as importações de todas as rotas é criar um novo arquivo, como por exemplo index.js dentro da pasta routes, e trazer todas as rotas de usuário para esse novo arquivo.<br>
Essa prática evita com que o arquivo principal server.js fique poluído com muitas importações de rotas além da responsabilidade que ele ja possui.</p>

<p>Para configurar o index.js, vamos mais uma ver criar e iniciar um Router como foi criado acima. Depois vamos importar cada um dos routers da seguinte forma: <br>
const nomeDoRouter = require("caminho do router")<br>
const usersRoutes = require("./users.routes.js")</p>

<p>Feita a importação de todos os routers, vamos sinalizar para o index.js que ele deve usar a rota específica com base na requisição do usuário. Lembrando que criamos o novo Router para o index.js no passo acima, e chamamos ele de routes. Para isso vamos digitar o seguinte código:<br>
routes.use("/tipodachamada", nomeDoRouter)
routes.use("/users", usersRoutes)<br>
Perceba que nessa nova chamada, não temos mais o request e response, temos apenas a função que chama o router que acabamos de criar.</p>

<p>Com essa nova passagem de parametros, podemos ir direto nos Routers criados,e podemos remover as chamadas que vem depois do "/", pois estas chamadas agora estão no index.js.</p>

<p>Por fim vamos exportar o novo index.js para que o server.js possa utiliza-lo nas chamadas das requisições. Vamos fazer isso da mesma forma que fizemos as exportações dos demais routers<br>
const routes = require("./routes")<br>
Perceba que não precisamos chamar o index ou index.js, pois por padrão o js sempre vai buscar os arquivos de nome index.<br>
Por fim vamos dizer ao server que ele deve usar o nosso arquivo de routes. adicionado no nosso código o seguinte:<br>
app.use(routes)
</p>

<h3>Controllers</h3>
<p>Controller é a parte responsável por processar as requisições. Podemos dizer que ela é a parte inteligente da aplicação como por exemplo verificar se um usuário existe, cadastrar um produto e etc.</p>

<p>A lógica de execução por padrão é: Primeiro é verificada qual a rota que o usuário está requisitando, e a partir da rota é verificado qual é o controller responsável por tratar a necessidade deste usuário. Por fim o controller devolve para o router, que vai devolver de voltar para o usuário.</p>

<p>Vamos criar dentro da parta src, vamos criar uma pasta chamada controllers, e depois vamos criar um arquivo de controller para cada uma das rotas que precisam ser tratadas.<br>
Por exemplo, vamos criar os controladores UsersController.js, ProdsController.js, ClientsController.js e etc.</p>

<p>Vamos criar cada um dos controllers como uma classe e vamos exporta-los. A criação vai seguir o seguinte formato:<br>
class NomeDoController<br>
module.exports = NomeDoController<br>
<strong>Por que trabalhar dessa forma?</strong><br>
Porque a classe permite termos várias funcionar e acessar todas as que precisarmos, e vez de criar uma função solta.</p>

<p>Um controller pode ter até no máximo 5 métodos, podendo ser elas:<br>
<strong>index - GET para listar vários registros<br>
show - GEt para exibir um registro específico<br>
create - POSt para criar um registro<br>
update - PUT para atualizar um registro<br>
delete - DELETE para remover um registro<br></strong></p>
<strong>E se o meu controller precisar ter mais que 5 funções?</strong>
<p>Nesse caso recomenda-se criar um outro controller para lidar com estas situações.

<p>Após feita a criação dos controllers, vamos enviar a responsabilidade do que fazer para este controller, e desassociar da rota, visto que a responsabilidade da rota é apenas receber a requisição e encaminhar para o controller responsável.</p>

<p>Dentro do controller vamos criar o método, o vai tratar os dados das requisições. Vamos pegar a tratativa que a rota estava dando para a requisição, e vamos enviar para o controller. Além disso, a criação do método dentro do controller precisa seguir o padrão: <br>
nomeDoMétodo (request,response){}<br>
create(request, response){}</p>

<p>Depois de atribuir a responsabilidade ao controller, precisamos informar a rota qual o controller e qual o método deve ser chamado para tratar a requisição. Como a exportação já foi feita no passo anterior, vamos apenas importar o controller:<br>
const UsersController = require("../controllers/UsersController")<br>
Como o controller é uma classe, precisamos também instancia-lo:<br>
const usersController = new UsersController()
Perceba que usamos 2 pontos porque vamos sair da pasta routes e vamos para a pasta controllers.</p>

<p>Feita a importação e a instanciação, vamos informar a rota que vamos utilizar este controller o método desejado para o mesmo:<br>
usersRoutes.get("/:id", usersController.create)</p>

<h2>Status Codes</h2>
<p>As respostas das requisições também retornam códigos HTTP, e eles trabalham por faixas de números. Por exemplo:
<p><strong>1xx</strong><br>Informativo - a solicitação foi aceita ou o processamento continua em andamento <br>Código 102 - Processando</p>
<strong>2xx</strong><p>Sucesso <br>Código 200 - Requisição bem sucedida <br>Código 201 - Criado - Geralmente utilizado para o POST após uma inserção.</p>
<strong>3xx</strong><p>Redirecionamento <br>Código 301 - Movido permanentemente<br>Código 302 - Movido</p>
<strong>4xx</strong><p>Erro do cliente <br>Código 400 - Bad Request<br>Código 401 - Unauthorized<br>Código 404 - Not Found</p>
<strong>5xx</strong><p>Erro no servidor - O servidor falhou ao concluir a solicitação <br>Código 500 - Erro interno</p>

<p>Podemos retornar os códigos HTTP que façam sentido com o que estamos trabalhando. Para isso, dentro da resposta do controller, na linha do response podemos adicionar o status daquela tratativa. No exemplo de enviar um POST para criar um dado, fica da seguinte forma:<br>
response.status(201).json({name, email, password})

<h3>Middlewares</h3>
<p>É uma função que tem o papel de interceptar a requisição. Ele tem acesso ao conteúdo da requisição, consegue devolver a resposta se necessário, e também sabe pra quem ele deve devolver. Eles podem executar qualquer código, podem fazer mudança na requisição e resposta, chamar o próximo middleware, e até mesmo encerrar o ciclo de solicitação e resposta.</p>

<p>Por exemplo, se para cadastrar um produto o usuário deve ser um administrador, eu posso ter um middleware que faz essa verificação. Caso ele não seja, o middleware pode barrar essa passagem.</p>

<strong>Implementando middlewares</strong>

<p>O middleware é uma função que geralmente é chamada no arquivo de rotas. Dentro do arquivo de rotas, dentro da chamada que do response, a primeira função chamada é o middleware, e em seguida o  o controller, ficando da seguinte forma:<br>
usersRoutes.get("/:id/:userName", myMiddleware, usersController.routeTest)</p>

<p>Dentro da estrutura do middleware, é necessário existir a chamada do método next(), para que o fluxo de execução não fique travado.</p>

<p>O middleware permite também encerrar um ciclo de execução, caso alguma condição necessária não seja atendida. Por exemplo se um usuário não estiver autenticado, ele pode encerrar o fluxo de execução dando um simples return response.send ou response.json caso queira devolver um objeto com algum tipo de mensagem</p>

<p>Podemos utilizar um middleware em todos os tipos de rotas de uma vez, em vez de cada rota pontualmente. Apara isso vamos utilizar o comando userRoutes.use(myMiddleware)</p>

<h2>Tratamento de erros</h2>
<p>Uma boa prática para de resolver o tratamento de exceções é criar uma padronização para eles. Neste caso, podemos criar uma nova pasta onde teremos armazenado o fluxo de tratamento de erros. Vamos criar uma pasta chamada utils e um arquivo chamado AppError.js com uma classe</p>

</p>Dentro dessa classe, podes ter dois atributos, os quais serão responsáveis por armazenar uma mensagem, e outra que vai trabalhar com o statusCode, onde se por padrão não houver nenhuma informação, vamos retornar o código 400. Vamos criar um construtor padrão para a classe e exporta-la. </p>

<p>Feita a exportação, vamos importa-la em um controlador. Dentro do controlador podemos fazer um teste, por exemplo se não for enviado um nome dentro do objeto da requisição, podemos criar um novo erro do tipo AppError, ficando da seguinte forma:<br>
if (!name) {<br>
      throw new AppError("O nome é obrigatório")<br>
    }

<p>Vamos adicionar uma nova biblioteca no projeto para lidar com alguns problemas tanto do lado do servidor quanto do lado do cliente:<br>
npm install express-async-errors --save
Depois de instalada a biblioteca, precisamos ir no server.js raiz e adicionar essa biblioteca para informar a nossa api que ela irá utilizar essas ferramentas.</p>

<p>A importação é feita em duas etapas, inicialmente antes da primeira linha vamos importar no server.js tanto o AppError, quanto o async-errors adicionando a linha:<br>
require("express-async-errors")<br>
E depois, vamos capturar os erros dizendo para o nosso servidor que ele vai usar as ferramentas.<br>
app.use((error, request, response, next) => {})</p>

<p>Dentro da nova chamada, vamos verificar de onde veio o erro gerado. Caso ela venha do cliente, vamos implementar da seguinte forma:<br>
if (error instanceof AppError) {<br>
    return response<br>
      .status(error.statusCode)<br>
      .json({ status: "error", message: error.message })<br>
  }<br>
Perceba que verificamos primeiro se o error é uma instancia do tipo AppError, para então retornarmos uma tratativa adequada.</p>

<p>Vamos criar também uma tratativa para que caso o erro seja de alguma outra fonte, vamos dar um erro mais geral:<br>
return response<br>
    .status(500)<br>
    .json({ status: "error", message: "internal server error" })</p>

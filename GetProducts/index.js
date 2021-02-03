const createMongoClient = require('../shared/mongoClient');

module.exports = async function (context, req) {

  const {client: MongoClient, closeConnectionFn} = await createMongoClient();
  //(MongoClient) -> "Recebe o cliente" e encerra conexão, está dever ser uma função assíncrona

  const Products = MongoClient.collection('products');
  // ↑ Obtém os dados da coleção no banco de dados
  const res = await Products.find({}); // Lista todos os itens da coleção
  const body = await res.toArray(); // Transforma a lista de dados em um array

  closeConnectionFn(); // Encerrando a conexão
  context.res = {
    status: 200,
    // body: "mensagem",
    // ↑ "body" é o retorno que será "exibido". em versões mais recentes, neste caso,
    // não é necessário colocar duas vezes:
    body,
  };
};

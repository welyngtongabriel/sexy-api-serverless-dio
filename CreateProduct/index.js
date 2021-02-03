const createMongoClient = require("../shared/mongoClient");

module.exports = async function (context, req) {
  const product = req.body;

  const { client: MongoClient, closeConnectionFn } = await createMongoClient();
  //(MongoClient) -> "Recebe o cliente" e encerra conexão, está dever ser uma função assíncrona
  const Products = MongoClient.collection("products");
  // ↑ Obtém os dados da coleção no banco de dados

  const res = await Products.insert({ product });
  closeConnectionFn(); // Encerrando a conexão

  context.res = {
    status: 201,
    body: res,
  };
};

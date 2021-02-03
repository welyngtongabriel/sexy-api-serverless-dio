const { ObjectId } = require("mongodb");
const createMongoClient = require("../shared/mongoClient");

module.exports = async function (context, req) {
  const { id } = req.params; // Recebido pelo parâmetro da URL

  const { client: MongoClient, closeConnectionFn } = await createMongoClient();
  //(MongoClient) -> "Recebe o cliente" e encerra conexão, está dever ser uma função assíncrona
  const Products = MongoClient.collection("products");
  // ↑ Obtém os dados da coleção no banco de dados
  const res = await Products.findOne({ _id: ObjectId(id) });
  // O id procurado no banco será o parâmetro id convertido em ObjectId

  closeConnectionFn(); // Encerrando a conexão

  context.res = {
    status: 200,
    body: res,
  };
};

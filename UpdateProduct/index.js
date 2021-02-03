const { ObjectId } = require("mongodb");
const createMongoClient = require("../shared/mongoClient");

module.exports = async function (context, req) {
  const { id } = req.params; // Recebido pelo parâmetro da URL
  const product = req.body;

  const { client: MongoClient, closeConnectionFn } = await createMongoClient();
  //(MongoClient) -> "Recebe o cliente" e encerra conexão, está dever ser uma função assíncrona
  const Products = MongoClient.collection("products");
  // ↑ Obtém os dados da coleção no banco de dados

  const res = await Products.findOneAndUpdate(
    { _id: ObjectId(id) },
    { $set: product }
  );
  // ↑ No 1º parâmetro procura pelo documento, e no 2º Atualiza pelo operador do mongo "set" em "product"

  closeConnectionFn(); // Encerrando a conexão
  context.res = {
    status: 200,
    body: res,
  };
};

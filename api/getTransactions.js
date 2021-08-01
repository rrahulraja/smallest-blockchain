module.exports = (request, h) => {
  const blockchain = request.server.app.bcInstance;
  const blocks = blockchain.get();
  const transactions = [].concat
    .apply(
      [],
      blocks.map((block) => block.data.transaction)
    )
    .filter((transaction) => transaction != null);

  transactions.forEach((transaction) => ({
    ...transaction,
    createdAt: new Date(transaction.createdAt).toUTCString(),
  }));

  const response = h.response({
      transactions
  })

  response.statusCode = 200

  return response
};


const Joi = require('joi');

const { createTransaction } = require('./api');

module.exports = [
  {
    method: 'POST',
    path: '/api/transaction',
    config: {
      handler: createTransaction,
      description: 'Submit a new transaction to the transaction queue',
      tags: ['api', 'transaction'],
      validate: {
        payload: Joi.object({
          from: Joi.string().required().description('Transaction sender id'),
          to: Joi.string().required().description('Transaction receiver id'),
          amount: Joi.string()
            .required()
            .description('Amount of coins sent in the transaction'),
        }),
      },
    },
  },
];

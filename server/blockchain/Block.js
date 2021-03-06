'use strict'

const crypto = require('crypto')

class Block {
  constructor (index, timestamp, data, previousHash) {
    this.index = index
    this.timestamp = timestamp
    this.data = data
    this.previousHash = previousHash
    this.hash = this.calculateHashOfBlock()
  }

  calculateHashOfBlock () {
    return crypto
      .createHash('sha256')
      .update(
        this.index.toString(),
        this.timestamp.toString(),
        JSON.stringify(this.data),
        this.previousHash
      )
      .digest('hex')
  }

  static generateGenesisBlock () {
    return new Block(
      0,
      1627801785239,
      {
        name: 'Genesis block',
        proofOfWork: 9
      },
      '-1'
    )
  }

  static generateNextBlock (latestBlock, data) {
    return new Block(latestBlock.index + 1, Date.now(), data, latestBlock.hash)
  }
}

module.exports = Block

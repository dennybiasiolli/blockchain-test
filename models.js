const { sha256 } = require('js-sha256')

class Block {
  constructor(previousHash, data) {
    this.data = data
    this.hash = this.calculateHash()
    this.previousHash = previousHash
    this.timestamp = new Date()
    this.proofOfWork = 0
  }

  calculateHash() {
    return sha256(
      this.previousHash +
      JSON.stringify(this.data) +
      this.timestamp +
      this.proofOfWork
    )
  }

  mine(difficulty) {
    while (!this.hash.startsWith('0'.repeat(difficulty))) {
      this.proofOfWork++
      this.hash = this.calculateHash()
    }
  }
}

class Blockchain {
  constructor(difficulty) {
    this.difficulty = difficulty
    // let genesisBlock = new Block('0', { isGenesis: true })
    // this.chain = [genesisBlock]
    this.chain = []
    this.addBlock({ isGenesis: true })
  }

  addBlock(data) {
    const lastBlock = this.chain[this.chain.length - 1]
    const newBlock = new Block(lastBlock?.hash, data)
    newBlock.mine(this.difficulty)
    this.chain.push(newBlock)
  }

  isValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i]
      const previousBlock = this.chain[i - 1]

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false
      }
      if (currentBlock.previousHash !== previousBlock.hash) {
        return false
      }
    }
    return true
  }
}

const preDate = new Date()
let blockchain = new Blockchain(5)
blockchain.addBlock({ data: 'First block' })
blockchain.addBlock({ data: 'Second block' })
blockchain.addBlock({ data: 'Third block' })

console.log(blockchain)
console.log(blockchain.isValid())
const postDate = new Date()
console.log(postDate - preDate)

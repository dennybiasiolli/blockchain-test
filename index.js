const blockchain = require('./blockchain')

blockchain.initBlockchain()
blockchain.addNewBlock('First new block')
blockchain.addNewBlock('I love blockchains')
blockchain.addNewBlock('Make me a new hash!!')

console.log(blockchain.getAllBlocks())


require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    goerli: {
      url: 'https://eth-goerli.alchemyapi.io/v2/UASePshVPhfSvgf-SYsAZtqm0Zl8Ov6z',
      accounts: ['08760aac5e1005ef4bd2a7fb1ef45dff2194ddea63a1327541f32fb31d37721a']
    }
  }
}
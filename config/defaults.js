module.exports = {
  default: {
    MONGO_URI: 'mongodb://localhost:27017',
    JWT_SECRET: '5EDCF654-0909-417F-914D-954CD3C1A3F4-secret',
    JWT_EXPIRY: '6h',
    SOLANA_KEY_GEN_URL: 'https://sol-key-gen-staging.herokuapp.com/generatePair',
  },
  production: {
    SOLANA_KEY_GEN_URL: 'https://sol-key-gen.herokuapp.com/generatePair',
  },
};

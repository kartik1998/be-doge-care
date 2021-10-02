const mongoose = require('mongoose');
const { MONGO_URI } = require('nconf').get();

const establishMongoDbConnection = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected:: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = establishMongoDbConnection;

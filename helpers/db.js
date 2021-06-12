const mongoose = require('mongoose');

module.exports = {
  connect: async () => {
    const connection = await mongoose
      .connect(process.env.DBURL, {
        useUnifiedTopology: true,
        bufferCommands: false,
        bufferMaxEntries: 0,
        useNewUrlParser: true,
        useCreateIndex: true,
      })
      .then((dbconnection) => dbconnection);
    return connection;
  },
  close: () => {
    mongoose.connection.close();
  },
};

const mongoose = require("mongoose");
const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_CLOUD_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(
        `DATABASE CONNECTED SUCCESSFULLY WITH SERVER: ${data.connection.name}`
        );
    })
    .catch((e) => {
      console.warn(e);
    });
};

module.exports = connectDatabase;

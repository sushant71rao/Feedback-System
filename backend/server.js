const connectDatabase = require("./config/database");
const dotenv = require("dotenv");
dotenv.config({ path: "config/config.env" });
const app = require("./app");

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception thrown :", err.message);
  console.warn("shutting down server");
  process.exit(1);
});

connectDatabase();
app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

//unhandled rejection handling
process.on("unhandledRejection", (err) => {
  console.log(`Error:`, err.message);
  console.log("Shutting down the server");
  server.close(() => {
    process.exit(1);
  });
});

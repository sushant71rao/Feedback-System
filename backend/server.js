const connectDatabase = require("./config/database");
const app = require("./app");
const dotenv = require("dotenv");

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception thrown :", err.message);
  console.warn("shutting down server");
  process.exit(1);
});

dotenv.config({ path: "config/config.env" });
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

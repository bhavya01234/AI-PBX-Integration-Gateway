const express = require("express");
const connectAMI = require("./ami/amiClient");
const connectARI = require("./ari/ariClient");
const { sequelize } = require("./db/models");
const callsRoute = require("./routes/calls");

const app = express();
app.use(express.json());

app.use("/calls", callsRoute);

(async () => {
  try {
    await sequelize.sync();
    console.log("📦 Database synced");

    connectAMI();
    connectARI();

    app.listen(3000, () => {
      console.log("🚀 Middleware running on port 3000");
    });
  } catch (err) {
    console.error("Startup failed:", err);
  }
})();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/public", express.static(__dirname + "/public"));

async function connectDB() {
  console.log("connecting to DB...");
  await mongoose.connect(process.env.DB_URI).then(() => {
    console.log("DB connected");
  });
}

const PORT = process.env.PORT;
const todoRoutes = require("./routes/todo-routes");

app.use("/todos", todoRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
  connectDB();
});

const express = require("express");
const tableRouter = require("./routes/tableRoutes.js");
const app = express();

const PORT = 5000;

// Middleware to parse JSON & URL-encoded data
app.use(express.json());             
app.use(express.urlencoded({ extended: true }));

// Mount table API
app.use("/api/table", tableRouter);

// Start the server
app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});

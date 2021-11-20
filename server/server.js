const express = require("express");
const cors = require("cors");
const bookRouter = require("./routes/book/book");
const userRouter = require("./routes/user/user");
require("dotenv").config({ path: "../.env" });
require("./core/db/db");

const app = express();
app.use(cors());
app.use(express.json());
app.use(bookRouter);
app.use(userRouter);
const PORT = process.env.SERVER_PORT;

app.listen(PORT, () => {
  console.log(`Server is up and running at: ${PORT}`);
});

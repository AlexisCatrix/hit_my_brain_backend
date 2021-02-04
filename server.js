const express = require("express");
const cors = require("cors");
const { backPort } = require("./conf");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    console.log("GET / was called!");
    res.send("Hi there!");
  });

app.listen(backPort, () => {
  console.log(`API avalable on http://localhost:${backPort}`);
});

app.use("/signIn", require("./routes/signIn"));

app.use("/signUp", require("./routes/signUp"));
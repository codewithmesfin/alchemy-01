const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  // "0x1": 100,
  // "0x2": 50,
  // "0x3": 75,
  '02da7de6dfc88c8613cdeb0af09f1ccb44c59c56c062ced5dbb0497e386c6aa020':100,
  '03375732f9d4215b013ce6af604d5ad0506f99d270f8c0e6ca607860d63484996c':50,
  '02e176aadfb9741ef4c77460b46c99e8ed2e7c76f9fe6f42ae15abeca8d6ac8446':55
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}

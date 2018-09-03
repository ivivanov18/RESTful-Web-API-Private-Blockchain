const express = require("express");
const router = express.Router();
const Blockchain = require("../../simpleChain").BlockChain;
const Block = require("../../simpleChain").Block;

let simpleChain = new Blockchain();

router.get("/block/:height", async (req, res) => {
  const { height } = req.params;
  const block = await simpleChain.getBlock(height);
  res.json({
    block: block
  });
});

router.post("/block", async (req, res) => {
  const { body } = req.body;
  try {
    const blockAdded = await simpleChain.addBlock(new Block(body));
    res.json({
      addedBlock: blockAdded
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

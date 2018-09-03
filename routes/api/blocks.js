const express = require("express");
const router = express.Router();
const Blockchain = require("../../simpleChain").BlockChain;
const Block = require("../../simpleChain").Block;

let simpleChain = new Blockchain();

/**
 * @route GET api/blocks/block/:height
 * @desc gets the block at the specified height
 * @access Public
 */
router.get("/block/:height", async (req, res) => {
  try {
    const { height } = req.params;
    const block = await simpleChain.getBlock(height);
    res.status(200).json({
      block: block
    });
  } catch (error) {
    console.log(error);
  }
});

/**
 * @route POST api/blocks/block
 * @desc creates the block with the specified body
 * @access Public
 */
router.post("/block", async (req, res) => {
  try {
    const { body } = req.body;
    const blockAdded = await simpleChain.addBlock(new Block(body));
    res.json({
      addedBlock: blockAdded
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

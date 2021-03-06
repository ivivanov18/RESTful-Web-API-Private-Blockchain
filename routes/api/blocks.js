const express = require("express");
const router = express.Router();
const Blockchain = require("../../simpleChain").BlockChain;
const Block = require("../../simpleChain").Block;

const validateBlock = require("../../validation/validateBlock");

let simpleChain = new Blockchain();

/**
 * @route GET api/blocks/block/:height
 * @desc gets the block at the specified height
 * @access Public
 */
router.get("/block/:height", async (req, res) => {
  const { height } = req.params;
  try {
    const block = await simpleChain.getBlock(height);
    res.status(200).json({
      blockRequested: block
    });
  } catch (error) {
    res.status(404).json({
      error: `Block at the requested height - ${height} - is not found`
    });
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
    const { isValid, errors } = validateBlock(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }
    await simpleChain.addBlock(new Block(body));
    const blockHeight = await simpleChain.getBlockHeight();
    const lastBlock = await simpleChain.getBlock(blockHeight);
    res.status(201).send({ blockAdded: lastBlock });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

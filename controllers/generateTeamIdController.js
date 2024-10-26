const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");


//generate uuid 
const generate_uuid = async (req, res) => {
  try {
    const uuid = uuidv4()
    res.json({uuid})
  } catch (error) {
    console.error(error.message)
    res.sendStatus(500)//Bad request
  }
}

module.exports = {generate_uuid}
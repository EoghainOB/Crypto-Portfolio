const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser')
require('dotenv').config();
const cors = require("cors");

main().catch(err => console.log(err));

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(cors());

async function main() {
    await mongoose.connect (`mongodb+srv://Eoghain:${process.env.PASS}@cluster0.sdqzzhz.mongodb.net/portfolio?retryWrites=true&w=majority`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const cryptoSchema = new mongoose.Schema({
        coin: String,
        quantity: Number,
        price: Number
      });
    
    const Crypto = mongoose.model("Crypto", cryptoSchema);

    app.get("/portfolio", async (req, res) => {
      const completePortfolio = await Crypto.find();
      return res.status(200).json(completePortfolio);
    });

    app.get("/portfolio/:id", async (req, res) => {
      const { id } = req.params;
      const coin = await Crypto.findById(id);
      return res.status(200).json(coin);
    });

    app.post("/portfolio", async (req, res) => {
      const newCoins = new Crypto({ ...req.body });
      await newCoins.save();
      return res.status(201).json(newCoins);
    });

    app.delete("/portfolio/:id", async (req, res) => {
      const { id } = req.params;
      const removeCoin = await Crypto.findByIdAndDelete(id);
      return res.status(200).json(removeCoin);
    });

    app.listen(8080, () => {
        console.log("Server listening on port 8080");
    });

}

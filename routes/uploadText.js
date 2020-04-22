const express = require("express");
const router = express.Router();
const callNLUnderstanding = require("../utils/watsonNL");
const proDataNL = require("../utils/proDataNL");
const params = require("../params.json");

router.post("/upload-text", async function (req, res) {
  const inputText = req.body.text;

  try {
    if (!inputText) {
      res.send({
        status: false,
        message: "No text uploaded",
      });
    } else {
      await callNLUnderstanding(params, inputText).then((ans) =>
        proDataNL(ans).then((finalRes) => res.json(finalRes))
      );
      console.log("\nDone!");
    }
  } catch (err) {
    res.status(500).json({ message: "No se pudo analizar el texto ingresado" });
  }
});

module.exports = router;

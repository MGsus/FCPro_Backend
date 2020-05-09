let Controller = {};

//Carga de modulos
var util = require("util");
const sleep = util.promisify(setTimeout);
const IBMCloudEnv = require("ibm-cloud-env");
IBMCloudEnv.init();
const s3function = require("./S3Functions");

// Get file
Controller.obtenerfile = async function (req, res) {
  console.log("Obteniendo object");
  console.log(`Bucket: ${req.body.bucket}, Key: ${req.body.key}`);
  var texto = await s3function.getfile(
    `${req.body.bucket}`,
    `${req.body.name}`
  );
  let response = `${texto}`;
  res.send({ text: response });
};

// Get list of files

Controller.getFiles = function (req, res) {
  var response = [];
  console.log("Obteniendo Lista de archivos");
  console.log(`Bucket: ${req.body.bucket}`);
  s3function
    .getFiles(`${req.body.bucket}`)
    .then((data) => {
      if (data != null && data.Contents != null) {
        for (var i = 0; i < data.Contents.length; i++) {
          var itemKey = data.Contents[i].Key;
          var itemDate = data.Contents[i].LastModified;
          console.log(`Item: ${itemKey} (${itemDate}).`);
          response.push({ date: itemDate, doc: itemKey });
        }
      }
      res.json(response);
    })
    .catch((e) => {
      console.error(`ERROR: ${e.code} - ${e.message}\n`);
    });
};

module.exports = Controller;

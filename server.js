const express = require("express");
const tf = require("@tensorflow/tfjs-node");
const app = express();
const port = 5000;

let model;

// Load the model
async function loadModel() {
  model = await tf.loadLayersModel('file://path_to_your_model/model.json');  // Path to your TensorFlow.js model
}

// Expose the model via API
app.use(express.json());

app.post("/predict", async (req, res) => {
  const data = req.body.stock_data;
  const inputTensor = tf.tensor(data);
  const prediction = model.predict(inputTensor.reshape([1, data.length]));
  const output = prediction.dataSync();
  res.json({ prediction: output });
});

// Start server
app.listen(port, async () => {
  await loadModel();
  console.log(`Server is running on http://localhost:${port}`);
});

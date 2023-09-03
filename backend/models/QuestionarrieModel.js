const mongooose = require("mongoose");

let QusetionSchema = mongooose.Schema({
  q0: { type: String, required: true },
  q1: { type: String, required: true },
  q2: { type: String, required: true },
  q3: { type: String, required: true },
  q4: { type: String, required: true },
  q5: { type: String, required: true },
  q6: { type: String, required: true },
  q7: { type: String, required: true },
});

module.exports = mongooose.model("question", QusetionSchema);

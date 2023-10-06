const fs = require("fs");

let mainData = {};

fs.readFile("./ulits/db.json", "utf8", (err, jsonString) => {
  if (err) {
    console.log("Error reading", err);
    res.status(500).json({ error: "Internal Server Error" });
    return;
  }

  try {
    mainData = JSON.parse(jsonString);
    // res.json(data);
  } catch (error) {
    console.log("Error parsing", error);
    // res.status(500).json({ error: "Internal Server Error" });
  }
});
console.log(mainData);

const questions = (req, res) => {
  const questions = mainData["questions"];
  res.json(questions);
};
const numbersList = (req, res) => {
  const numbers = mainData["numberList"];
  res.json(numbers);
};

const question = (req, res) => {
  const questionNo = parseInt(req.params.questionNO);
  if (mainData && mainData.hasOwnProperty("questions")) {
    const questions = mainData["questions"];

    const question = questions.find((q) => q["questionNo"] === questionNo);
    if (question) {
      res.json(question);
    } else {
      res.status(404).json({ error: "Question not found" });
    }
  }
};
const answer = (req, res) => {
  const choice = parseInt(req.params.choice);
  const questionNO = parseInt(req.params.questionNo);
  if (mainData && mainData.hasOwnProperty("answers")) {
    const answers = mainData["answers"];
    const answer = answers.find((a) => a["questionNo"] === questionNO && a["answerNo"] === choice);
    if (answer) {
      res.json(answer);
    } else {
      res.status(404).json({ error: "answer not found" });
    }
  }
};
module.exports = {
  questions,
  numbersList,
  question,
  answer,
};

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

module.exports = { mainData };

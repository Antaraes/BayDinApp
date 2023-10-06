const express = require("express");
const router = express.Router();

const { questions, numbersList, question, answer } = require("../controllers/BayDinControllers");

router.get("/", questions);
router.get("/questions/:questionNO", question);

router.get("/questions/:questionNo/:choice", answer);
router.get("/numberList", numbersList);

module.exports = router;

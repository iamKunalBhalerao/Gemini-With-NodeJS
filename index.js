const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const app = express();
app.use(express.json());

// const prompt =
//   "Give me the specific diet plan for me, my weight is 87kg, i am 19 years old";

app.post("/getans", async (req, res) => {
  const prompt = req.body.prompt;

  try {
    const result = await model.generateContent(prompt);

    res.status(200).json({
      Answer: result.response.text(),
    });
  } catch (error) {
    res.json({
      Error: error,
    });
  }
});

app.listen(3000, () => {
  console.log("server is on PORT:3000");
});

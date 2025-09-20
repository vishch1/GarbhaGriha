import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch"; // or global fetch if Node 18+

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

app.get("/", (req, res) => {
  res.send("OpenRouter backend is running!");
});

app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  if (!message) return res.status(400).json({ error: "No message provided" });

  try {
    // Handle instant commands
    const commandResponse = (() => {
      switch (message.toLowerCase()) {
        case "joke":
          return "Why don’t scientists trust atoms? Because they make up everything! 😄";
        case "motivate":
          return "Remember, every small step you take is progress. You’ve got this! 💪";
        case "breathe":
          return "Let's take a deep breath together… Inhale… Exhale… 🌬️";
        case "resource":
          return "You can check out mental health resources here: https://www.mentalhealth.gov/ 📚";
        default:
          return null;
      }
    })();

    if (commandResponse) return res.json({ reply: commandResponse });

    // Call OpenRouter API
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", // or gpt-4o / gpt-3.5-turbo
        messages: [
          { role: "system", content: "You are a friendly AI mental health companion." },
          { role: "user", content: message }
        ],
        temperature: 0.7,
        max_tokens: 200
      })
    });

    const data = await response.json();
    const aiReply = data.choices?.[0]?.message?.content || "Sorry, I couldn't respond.";

    res.json({ reply: aiReply });
  } catch (err) {
    console.error("Backend Error:", err);
    res.status(500).json({ reply: "Oops! Something went wrong. 😢" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

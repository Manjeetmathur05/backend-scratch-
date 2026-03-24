const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

let dataStore = {};

function getReward() {
  const rand = Math.random();
  if (rand < 0.5) return 0;
  if (rand < 0.75) return 1;
  if (rand < 0.85) return 2;
  if (rand < 0.95) return 5;
  return 9;
}

function generateCode() {
  return 'DF' + Math.random().toString(36).substr(2, 6).toUpperCase();
}

app.post('/scratch', (req, res) => {
  const { userId } = req.body;
  const today = new Date().toDateString();

  if (!userId) {
    return res.json({ error: "Enter mobile number" });
  }

  if (dataStore[userId] === today) {
    return res.json({ reward: 0, code: "ALREADY_USED" });
  }

  const reward = getReward();
  const code = generateCode();

  dataStore[userId] = today;

  res.json({ reward, code });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

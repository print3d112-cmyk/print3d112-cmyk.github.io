const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 4000;

const steamReadings = [
  'The brass compass points toward a daring expedition.',
  'Your gear is polished and the pressure is rising to perfection.',
  'A hidden valve opens; expect spark and story in equal measure.',
  'The steam engine hums with secrets only the bold can hear.',
  'Cog alignment indicates a surge of inspiration ahead.',
  'The forge whispers of a masterpiece in the making.',
  'A copper circuit hums with ambition and arcane precision.',
  'Your blueprint is blessed by the clockwork council.'
];

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/reading', (req, res) => {
  const name = req.query.name ? req.query.name.trim() : 'Artifact';
  const target = name || 'Artifact';
  const message = steamReadings[Math.floor(Math.random() * steamReadings.length)];
  const level = Math.floor(Math.random() * 26) + 75;
  const result = {
    target,
    message,
    level,
    theme: level > 90 ? 'masterwork' : level > 80 ? 'clockwork' : 'well-tuned'
  };
  res.json(result);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Steamworks Forge is running on http://localhost:${port}`);
});

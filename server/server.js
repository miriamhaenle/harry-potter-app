import express from 'express';
import path from 'path';
import { dirname } from './helpers.js';

const app = express();
const __dirname = dirname(import.meta.url);

app.use(express.static(path.join(__dirname, '../client/build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

app.get('/api', (req, res) => {
  res.json({ status: 'Alive and awake' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log('Server successfully started on: ' + PORT));

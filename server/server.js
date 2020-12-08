import express from 'express';
import path from 'path';
import cors from 'cors';
import { dirname } from './helpers.js';
import { connectDatabase, database, disconnectDatabase } from './database.js';

const app = express();
const __dirname = dirname(import.meta.url);

connectDatabase();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

app.get('/api', (req, res) => {
  res.json({ status: 'Alive and awake' });
});

app.get('/api/spells', async (req, res) => {
  const collection = database().collection('spells');
  return await collection.find({}).toArray((error, docs) => res.json(docs));
});

app.get('/api/leaderboard', async (req, res) => {
  const collection = database().collection('leaderboard');
  return await collection.find({}).toArray((error, docs) => res.json(docs));
});

app.post('/api/leaderboard', async (req, res) => {
  const houseToUpdate = req.body;
  const collection = database().collection('leaderboard');
  return await collection
    .find({ house: houseToUpdate.house.toLowerCase() })
    .toArray((error, docs) =>
      updateLeaderBoard(
        docs.find((house) => house.house === houseToUpdate.house.toLowerCase()),
        houseToUpdate.points
      ).then(() => res.json('Updated house'))
    );
});

async function updateLeaderBoard(houseToUpdate, housePoints) {
  const collection = database().collection('leaderboard');
  return await collection.updateOne(
    houseToUpdate,
    { $set: { points: houseToUpdate.points + housePoints } },
    (error, result) => console.log(result)
  );
}

app.get('/dbs', (req, res) => {
  run();
  res.send('Mongo db works');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log('Server successfully started on: ' + PORT));

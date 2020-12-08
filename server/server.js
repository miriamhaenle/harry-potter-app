import express from 'express';
import path from 'path';
import { dirname } from './helpers.js';
import { default as mongodb } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();
const {
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_NAME,
  DATABASE_HOST,
} = process.env;

let MongoClient = mongodb.MongoClient;

const app = express();
const __dirname = dirname(import.meta.url);

const uri = `mongodb+srv://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}/${DATABASE_NAME}`;

async function run() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(DATABASE_NAME);
    const collection = db.collection('hogwarts-houses');
    const housesPoints = await collection
      .find({})
      .toArray((error, docs) => console.log(docs));
  } catch (error) {
    console.error(error);
  }
}

app.use(express.static(path.join(__dirname, '../client/build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

app.get('/api', (req, res) => {
  res.json({ status: 'Alive and awake' });
});

app.get('/dbs', (req, res) => {
  run();
  res.send('Mongo db works');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log('Server successfully started on: ' + PORT));

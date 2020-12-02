import express from 'express';
import path from 'path';
import { dirname } from './helpers.js';
import { default as mongodb } from 'mongodb';
let MongoClient = mongodb.MongoClient;

const app = express();
const __dirname = dirname(import.meta.url);
const databaseUser = 'MathewGriffinthore';
const databasePassword = 'A1hrmRBi3QyfRDGB';
const databaseName = 'harry-potter-wizard-game';

const uri = `mongodb+srv://${databaseUser}:${databasePassword}@miriam-super-cluster.q4ahs.mongodb.net/test?authSource=admin&replicaSet=atlas-pq5i4z-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true`;

async function run() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(databaseName);
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

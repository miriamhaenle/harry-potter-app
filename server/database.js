import { default as mongodb } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();
const {
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_NAME,
  DATABASE_HOST,
} = process.env;

let db;
let MongoClient = mongodb.MongoClient;
const uri = `mongodb+srv://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}/${DATABASE_NAME}`;

const connectDatabase = async () => {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    db = client.db(DATABASE_NAME);
  } catch (error) {
    console.error(error);
  }
};

const database = () => db;

const disconnectDatabase = () => {
  db.close();
};

export { connectDatabase, database, disconnectDatabase };

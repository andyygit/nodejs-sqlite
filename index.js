import express from 'express';
import sqlite3 from 'sqlite3';
sqlite3.verbose();
import { MyDatabase } from './sqlite.js';

// const app = express();

// app.get('/', (req, res) => {
//   res.send('hello da');
//   console.log('get reguested');
// });

// app.listen(3000, () => {
//   console.log('listening on port 3000');
// });

// //test connect to db
let db = new MyDatabase();
db.connect();
db.select();
db.disconnect();

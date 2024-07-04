// import express from 'express';
// import sqlite3 from 'sqlite3';
// sqlite3.verbose();
import sqlite3 from 'sqlite3';
sqlite3.verbose();
import { MyDatabase } from './sqlite.js';

// const app = express();
// app.get('/', (req, res) => {
//   res.send('hello da');
// });
// app.listen(3000, () => {
//   console.log('listening on port 3000');
// });

//connect to db
let db = new MyDatabase();
db.connect();
db.createTable('lorem');
db.disconnect();

// //work with db
// // db.serialize(() => {
// //   db.run('CREATE TABLE lorem (info TEXT)');
// //   const stmt = db.prepare('INSERT INTO lorem VALUES (?)');
// //   for (let i = 0; i < 10; i++) {
// //     stmt.run(`Ipsum ${i}`);
// //   }
// //   stmt.finalize();
// // });
// db.serialize(() => {
//   db.all('SELECT * FROM lorem WHERE info LIKE $id', { $id: 'Ipsum%' }, (err, rows) => {
//     if (err) {
//       console.error(err.message);
//     }
//     rows.forEach((row) => {
//       console.log(row.info);
//     });
//   });
// });

// //close db
// db.close((err) => {
//   if (err) {
//     console.error(err.message);
//   }
//   console.log('Close the database connection.');
// });

import express from 'express';
import sqlite3 from 'sqlite3';

sqlite3.verbose();

const app = express();
app.use(express.json());

//get all middleware
app.get('/posts', (req, res, next) => {
  console.log(`get reguested from ${req.url}`);

  let db = new sqlite3.Database('test.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      return next({ status: 500, message: 'nu s-a putut conecta la db' });
    }
    console.log('Connected to database');
    db.serialize(() => {
      db.all(
        'SELECT info, datetime(currDate, "unixepoch") as currDate, randomReal FROM lorem WHERE info LIKE $info',
        { $info: 'Lorem%' },
        (err, rows) => {
          if (err) {
            return next({ status: 500, message: 'ceva nu a mers bine' });
          }
          res.contentType('application/json');
          res.status(200).json(rows);
          console.log('Response sent');
        }
      );
    });
    db.close((err) => {
      if (err) {
        console.error(err.message);
      }
      console.log('Close the database connection.');
    });
  });
});

//get single middleware
app.get('/posts/:id', (req, res, next) => {
  console.log(`get reguested from ${req.url}`);

  let id = parseInt(req.params.id, 10);

  let db = new sqlite3.Database('test.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      return next({ status: 500, message: 'nu s-a putut conecta la db' });
    }
    console.log('Connected to database');
    db.serialize(() => {
      db.get(
        'SELECT info, datetime(currDate, "unixepoch") as currDate, randomReal FROM lorem WHERE rowid = $id',
        { $id: id },
        (err, row) => {
          if (err) {
            return next({ status: 500, message: 'ceva nu a mers bine' });
          }
          res.contentType('application/json');
          res.status(200).json(row == undefined ? { message: 'no such ROWID in db' } : row);
          console.log('Response sent');
        }
      );
    });
    db.close((err) => {
      if (err) {
        console.error(err.message);
      }
      console.log('Close the database connection.');
    });
  });
});

//describe table
app.get('/describe/:tablename', (req, res, next) => {
  console.log(`get reguested from ${req.url}`);

  let db = new sqlite3.Database('test.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      return next({ status: 500, message: 'nu s-a putut conecta la db' });
    }
    console.log('Connected to database');
    db.serialize(() => {
      db.get(`SELECT sql FROM sqlite_schema WHERE name = "${req.params.tablename}"`, (err, row) => {
        if (err) {
          return next({ status: 500, message: 'ceva nu a mers bine' });
        }
        res.contentType('application/json');
        res.status(200).json(row == undefined ? { message: 'no such table in db' } : row);
        console.log('Response sent');
      });
    });
    db.close((err) => {
      if (err) {
        console.error(err.message);
      }
      console.log('Close the database connection.');
    });
  });
});

//redirects
app.all('*', (req, res) => {
  res.status(404).send('<h3>404 Not found!</h3>');
});

//errors
app.use((err, req, res, next) => {
  res.status(err.status).json(err);
});

app.listen(3000, () => {
  console.log('listening on port 3000');
});

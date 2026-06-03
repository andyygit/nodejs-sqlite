import sqlite3 from 'sqlite3';

sqlite3.verbose();

const values = [
  {
    info: 'Lorem ipsum dolor sit amet.',
    random: 5.33,
  },
  {
    info: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet consectetur, adipisicing elit.',
    random: 350,
  },
  {
    info: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
    random: 29.664,
  },
];

let db = new sqlite3.Database('test.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to database');
  db.serialize(() => {
    //create table
    db.run('CREATE TABLE lorem (info TEXT, currDate INTEGER, randomReal REAL)');
    //insert into table
    let stmt = db.prepare(
      `INSERT INTO lorem (info, currDate, randomReal) VALUES ($info, (SELECT unixepoch("now","localtime")), $random)`
    );
    values.forEach((el) => {
      stmt.run({
        $info: el.info,
        $random: el.random,
      });
    });
    stmt.finalize();
  });
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Close the database connection.');
  });
});

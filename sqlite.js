import sqlite3 from 'sqlite3';

class MyDatabase {
  connect() {
    this.db = new sqlite3.Database('test.db', (err) => {
      if (err) {
        console.error(err.message);
      }
      console.log('connected to database');
    });
  }

  disconnect() {
    if (!(this.db === undefined)) {
      this.db.close((err) => {
        if (err) {
          console.error(err.message);
        }
        console.log('Close the database connection.');
      });
    } else {
      console.warn('Nothing to close');
    }
  }

  createTable(tableName, columnData = []) {
    columnData = [
      {
        name: 'info',
        type: 'TEXT',
      },
      {
        name: 'currDate',
        type: 'INTEGER',
      },
      {
        name: 'randomReal',
        type: 'REAL',
      },
    ];
    let params = columnData.map((item) => `${item.name} ${item.type}`);
    params = params.reduce((accum, curvalue) => accum.concat(', ', curvalue));
    this.db.serialize(() => {
      this.db.run(`CREATE TABLE ${tableName} (${params})`);
    });
  }

  insert(table, values = []) {
    values = [
      {
        info: 'Lorem ipsum dolor sit amet.',
        random: 5.33,
      },
      {
        info: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
        random: 29.664,
      },
    ];
    this.db.serialize(() => {
      let stmt = this.db.prepare(
        `INSERT INTO ${table} (info, currDate, randomReal) VALUES ($info, (SELECT unixepoch("now","localtime")), $random)`
      );
      values.forEach((el) => {
        stmt.run({
          $info: el.info,
          $random: el.random,
        });
      });
      stmt.finalize();
    });
  }

  select() {
    this.db.serialize(() => {
      this.db.all(
        'SELECT info, datetime(currDate, "unixepoch") as currDate, randomReal FROM lorem WHERE info LIKE $info',
        { $info: 'Lorem%' },
        (err, rows) => {
          if (err) {
            console.error(err.message);
          }
          // rows.forEach((row) => {
          //   console.log(row);
          // });
          console.log(rows);
        }
      );
    });
  }

  describeTable(table) {
    this.db.serialize(() => {
      this.db.get(`SELECT sql FROM sqlite_schema WHERE name = "${table}"`, (err, row) => {
        if (err) {
          console.error(err.message);
        }
        console.log(row);
      });
    });
  }
}

export { MyDatabase };

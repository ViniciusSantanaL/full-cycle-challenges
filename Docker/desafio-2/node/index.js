const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
});

function queryDatabase(sql) {
  return new Promise((resolve, reject) => {
    pool.query(sql, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

(async () => {
  try {
    await queryDatabase(`CREATE TABLE IF NOT EXISTS people (name varchar(255) NULL);`);
    await queryDatabase(`INSERT INTO people(name) VALUES('Vinícius')`);
  } catch (err) {
    console.error(err);
  }
})();

app.get('/', async (req, res) => {
  try {
    const result = await queryDatabase(`SELECT * FROM people;`);
    let names = result.map((item) => `<li>${item.name}</li>`).join("");

    res.send(`
      <h1>Full Cycle Rocks!</h1>
      <h2>Lista de Usuários Cadastrados</h2>
      <ul>${names}</ul>
    `);
  } catch (err) {
    res.status(500).send("Erro ao consultar o banco de dados");
    console.error(err);
  }
});

app.listen(port, () => {
  console.log('Server running on port: ' + port);
});

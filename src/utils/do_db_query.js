import mysql from "mysql";

/**
 *
 * Use this function to make SQL statements run against your database.
 *
 * e.g. await doDbQuery({query: "INSERT INTO Users (id, email, password, salt)  VALUES (?, ?, ?, ?)",
 *       values: [newUserId, newUserEmail, saltedAndHashedPassword, salt]})
 *
 * The ?'s in the example above are escaped values, they get filled in when the query is run.
 * See https://www.npmjs.com/package/mysql#escaping-query-values for more information.
 *
 * @param query The SQL query as a string you want to run. Uses escaped values.
 * @param values The values to use in your query (if any) as an array, in the order they appear in the query string.
 * @returns {Promise<Query>}
 */
export default async function doDbQuery({ query, values }) {
  let connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD
  });
  await connection.connect()

  const queryResults = await connection.query({sql: query, values});

  await connection.end();
  return queryResults;
}
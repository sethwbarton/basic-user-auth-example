import mysql from "mysql";

let pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  database: process.env.MYSQL_DATABASE,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD
});

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
  return new Promise((resolve, reject) => {
    pool.query({sql: query, values}, (error, results) => {
      if (error) reject(error)
      else resolve(results)
    });
  })
}
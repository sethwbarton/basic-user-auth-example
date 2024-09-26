import doDbQuery from '@/utils/do_db_query';
import {createHash} from 'node:crypto';
import {generateAndSignJwt} from '@/pages/api/sign-up';

export default async function handler(req, res) {
  if (req.method !== 'POST') res.status(404).send('Not Found')

  const userEmail = req.body.email
  const passwordFromRequest = req.body.password

  try {
    const dbResult = await doDbQuery({query: "SELECT * FROM Users WHERE email = (?)",
      values: [userEmail]})
    const userFromDb = dbResult[0]

    const hashToTest = createHash('sha256').
        update(passwordFromRequest + userFromDb.salt).digest('base64')

    const realHash = userFromDb.password;

    if (hashToTest === realHash) {
      const jwt = generateAndSignJwt(userFromDb.email, userFromDb.id)
      res.setHeader("Set-Cookie", `session_token=${jwt}; HttpOnly; SameSite=Strict; Secure;`);
      res.status(200).send()
    }

    res.status(403).send('Unauthorized. That was the wrong password!')
  } catch (e) {
    console.error(e)
    res.status(500).send('Internal Server Error')
  }

  res.status(403).send('Unauthorized. That was the wrong password!')
}

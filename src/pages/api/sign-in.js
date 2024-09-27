import doDbQuery from '@/utils/do_db_query';
import {createHash} from 'node:crypto';
import {generateAndSignJwt} from '@/pages/api/sign-up';

export default async function handler(req, res) {
  if (req.method !== 'POST') res.status(404).send('Not Found')

  console.log("GOT A SIGN IN REQUEST")

  // TODO: Compare the sent password (salted and hashed) to the stored password in the DB.
  // TODO: Generate and sign a JWT for the user, send it back using the Set-Cookie header.
  // TODO: If the password isn't right, send the user a 403.
  // TODO: If something breaks, send them a 500.
}

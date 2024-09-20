// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {createHash} from 'node:crypto';
import doDbQuery from '@/utils/do_db_query';
import * as crypto from 'crypto';

/**
Great article on salting and storing passwords:
https://auth0.com/blog/adding-salt-to-hashing-a-better-way-to-store-passwords/
**/

export default async function handler(req, res) {
  if (req.method !== 'POST') res.status(404).send('Not Found')

  const newUserEmail = req.body.email
  const newUserPassword = req.body.email

  try {
    const salt =  crypto.randomBytes(16).toString('base64');

    const saltedAndHashedPassword = createHash('sha256').
        update(newUserPassword + salt).digest('base64')

    const newUserId = crypto.randomUUID()

    await doDbQuery({query: "INSERT INTO Users (id, email, password, salt)  VALUES (?, ?, ?, ?)",
      values: [newUserId, newUserEmail, saltedAndHashedPassword, salt]})

  } catch (e) {
    console.error(e)
    res.status(500).send('Internal Server Error')
  }

  res.status(200).send('Successfully created new account for ' + newUserEmail)
}

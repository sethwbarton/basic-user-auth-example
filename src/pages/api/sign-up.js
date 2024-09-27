// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {createHash} from 'node:crypto';
import doDbQuery from '@/utils/do_db_query';
import * as crypto from 'crypto';
import {encodeToBase64} from 'next/dist/build/webpack/loaders/utils';

/**
Here are some articles that go over things you'll need to understand before
successfully implementing sign up:

Great article on salting, hashing, and storing passwords:
https://auth0.com/blog/adding-salt-to-hashing-a-better-way-to-store-passwords/

Explains how JWT's work in moderate detail:
https://jwt.io/introduction

It could be educational to implement the algorithm you read about on that
website yourself, but if you don't want to you can use a library.

This project has the jsonwebtoken library pre-installed for you to use.
Learn about it here:

https://www.npmjs.com/package/jsonwebtoken

You'll need to understand a bit about how setting cookies works between the
browser and server. Here is a useful doc to read about that:

https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie

The various options for setting a cookie in the browser are critical for security.
Especially the HttpOnly, SameSite, and Secure options. Even with these options
properly set, JWT storage on the client is not a clear-cut topic. In the real world,
it would be better to let a well-supported library handle these complexities for you.
**/
export default async function handler(req, res) {
  if (req.method !== 'POST') res.status(404).send('Not Found')

  const newUserEmail = req.body.email
  const newUserPassword = req.body.password
  const newUserId = crypto.randomUUID()

  try {

    const salt =  crypto.randomBytes(16).toString('base64');

    const saltedAndHashedPassword = createHash('sha256').
        update(newUserPassword + salt).digest('base64')

    // TODO: Handle users that already exist.
    await doDbQuery({query: "INSERT INTO Users (id, email, password, salt)  VALUES (?, ?, ?, ?)",
      values: [newUserId, newUserEmail, saltedAndHashedPassword, salt]})

  } catch (e) {
    console.error(e)
    res.status(500).send('Internal Server Error')
  }

  // See https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie
  // for information about what all the cookie options do.
  res.setHeader("Set-Cookie", `session_token=${generateAndSignJwt(newUserEmail, newUserId)}; HttpOnly; SameSite=Strict; Secure; Max-Age=900; Path=/`);
  res.status(200).send('Successfully created new account for ' + newUserEmail)
}

export function generateAndSignJwt(userEmail, newUserId) {
  const header ={
    "alg": "HS256",
    "typ": "JWT"
  }
  const headerEncoded = encodeToBase64(JSON.stringify(header))

  const payload = {
    "sub": `${newUserId}`,
    "email": `${userEmail}`,
  }
  const payloadEncoded = encodeToBase64(JSON.stringify(payload))

  const signatureEncoded = createHash('sha256').update(headerEncoded + "." + payloadEncoded + process.env.JWT_SECRET).digest('base64')

  return headerEncoded + "." + payloadEncoded + "." + signatureEncoded
}
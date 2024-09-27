# Web Auth Basics Activity

Hello! Welcome to this activity I've created to help you understand the very basics of end-user web authentication.

Ideally you'd spend ~4 hours completing what's in this activity and its challenges. If you want to do more and make a 
fully-functional full-stack app with this as a template, you can also do that.

## What are we building? 

In this activity, you'll create a basic sign-in system. It doesn't use the latest and greatest technologies,
it's not even that secure, but it works for signing people in and out, and it illustrates the important concepts. 

You'll learn about the following topics:

- Token-based authentication
- Cookies and cookie-browser-server relationship.
- Password salting and hashing.
- Next.js
- Communicating with a Database

We won't dive into these topics in excessive detail, but you should gain a high level understanding which you can 
use to learn these topics in more detail.

# Project Setup

## Install Dependencies

First you'll have to make sure you have the dependencies for the project installed:

```
npm install
```

Then you can start the server with:

```
npm run dev
```

## Database Setup

This project is going to use a locally-running MySQL database. So you will need to set that up.
First step is to install the software on your machine to talk to a MySQL database.

On your machine run:

```
brew install MySQL
```

Next, you need to install the software on your machine to run and serve data from a MySQL database.

You can do this most easily by installing the MySQL Server application from Oracle: 

https://dev.mysql.com/downloads/mysql/8.0.html

Pick a password you'll remember for the root user when you set up the MySQL server. In a real-world scenario, this password
would need to be very strong and closely guarded. And you probably wouldn't even be using password authentication for your
production database. For this exercise, it's ok to use something basic.

Store your password in a secure, common place. You'll need it in a second.

Now, with MySQL installed, we need to create a database and allow password-based auth for the root user: 

```bash
mysql -u root -p -e "CREATE DATABASE user_auth_example; ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '<your root db user password>'"
```

This command will prompt you for the password you just set for the root user for your MySQL instance. Just keep using the same password.

Once your database has been created, you can set up a connection to it right inside of IntelliJ or WebStorm.

NOTE: If you are using Webstorm, you'll need to install the database tools plugin from JetBrains for this next step. 
The plugin is already installed in IntelliJ. It will say it's a paid plugin, but it should link up with your already active
JetBrains license.

Open the side panel for the database plugin (right side of the editor) and connect a new data source. 

Fill in the details for the connection to your database according to what you chose while setting it up.

Mine looked something like this:

![db_connection_settings](https://github.com/user-attachments/assets/bffc87a6-1570-4441-ad44-54f94a54bd2b)

You then need to select which database or "schema" you'll do queries against in the side panel.

![db_schema_selection](https://github.com/user-attachments/assets/31fc8e88-be60-4dc9-a000-cf45d99ae3f9)

Now it's time to create tables for your database.

Run the SQL script in `sql/create_tables.sql` to create the only database table we'll be using - the users table.

If you need to reset the table for any reason, you can run the `nuke_tables` script next to it to clear your data. Then you
need to run the creation script again.

With the JetBrains database plugin installed, you should be able to do all if this easily within your editor's UI.

## Environment Variable Setup

Fill in the following information for your database in a new file called `.env` in the root of the project.

```
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_DATABASE=user_auth_example
MYSQL_USER=root
MYSQL_PASSWORD=<your password here>
JWT_SECRET=some_secret_string
```

These variables will get loaded into the Next server code to be accessed through `process.env`.

Read about Next.js environment variables: https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables

# Let's Get Coding!

With all that setup out of the way, we're ready to take a look at the code and what we'll be building.
The goal of all of this is to learn how web authentication works by doing it ourselves. What we're building
is NOT sufficiently secure to go into users' hands. It's not feature complete. And it doesn't necessarily follow best practices,
but it does illustrate how authentication works generally. 

# Challenges

This section will guide you through completing the challenges.

The `main` branch has all the challenges complete. You can use this branch as a cheat sheet when you get stuck doing the 
challenges. But don't use it too much, or you won't learn anything! When you feel the urge to look at it, instead try
reading about how the feature you're working on should work online.

To get started checkout the `challenges` branch.

```bash
git checkout challenges
```
As you read through the rest of this guide, things to do are marked with checkboxes for you to keep track of where you are.

- [ ] Example checkbox.

## Sign Up

The sign-flow involves two files, `src/pages/index.js` and `src/pages/api/sign-up.js`.

The first file is the default page you land on after starting the app. We'll refer to it as the base page.

The second file is a Next.js API route. You can read more about how those work here: 

https://nextjs.org/docs/pages/building-your-application/routing/api-routes

You need to connect these two JS files by having the page call the sign-up API route when the user submits the sign-up form.

To make this job easier for you, I've installed [TanStack Query](https://tanstack.com/query/latest/docs/framework/react/overview)
in the project for you. This library makes it easy to do data fetching in React applications. 
You'll need to read the docs about how to do mutations for this part of the challenge.

- [ ] Handle sign-up form submission on the base page. 
- [ ] Sign-up form sends email and password to the API route.

Once your frontend is sending data to your Next.js API route, it's time to implement the backend code for storing your
user in the database and generating a JWT token for them to be stored in the browser as a cookie. First things first,
let's work on storing that password properly.

- [ ] READ: https://auth0.com/blog/adding-salt-to-hashing-a-better-way-to-store-passwords/
- [ ] Sign-up API route salts the user's password
- [ ] Sign-up API route stores the user's salt, salted password, email, and new id, in the DB.

There is a utility function already written for you called `doDbQuery` which I recommend you use for this part.

Next up is generating a token for the user to have in the cookies on their browser. We'll be following (loosely) the JWT
standard.

- [ ] READ: https://jwt.io/introduction
- [ ] Sign-up API route generates a token according to the algorithm laid out in the article above.

If you're unsure how to hash things in Node.js, you can refer to this GeeksForGeeks article: https://www.geeksforgeeks.org/node-js-crypto-createhash-method/

Next, you need to send that JWT back to the user as a cookie once their account is created. You can use the `Set-Cookie` http header to do this.

- [ ] READ: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie
- [ ] The Sign-up API route tells the browser to set a cookie, which persists between page refreshes, and uses the proper options to not get leaked to other sites or bad actors.
- [ ] The browser successfully sets the cookie after sign up.

Extra points if you read about where the best place to store a JWT _really_ is. Setting JWTs in cookies works, but isn't necessarily the most secure.
Usually, JWT's get sent in the `Authorization` http header, not cookies.

With the cookie set, you're user is technically signed in. But what if they come back to the page later? They'll need to use the sign-in flow.

## Sign In

Sign-in in does a lot of the same logic as your sign-up API route. But this time it doesn't need to store anything new in the database.
Instead, we'll be checking the credentials the user sent against the credentials stored in the database.

- [ ] The base page sends a request to the sign-in API route when the user submits the sign in form.
- [ ] The sign-in API route checks the sent password against the hashed and salted password stored in the DB.
- [ ] If the passwords match, a token is generated for the user and the token is stored in the cookies.
- [ ] If the passwords don't match, the API request fails with a 403.

Now that you're sign-in flow properly authenticates users, it's time to allow those users to view the `/authenticated` page if 
they have the proper token set.

## Creating an Authenticated Page

We'll use the `authenticated.js` page to create our authenticated route. Users should only be able to see this if they have
successfully signed in.

Before you can successfully implement this in Next.js,  you need to learn a bit about `getServerSideProps`.

- [ ] READ: https://nextjs.org/docs/pages/building-your-application/data-fetching/get-server-side-props
- [ ] READ: https://nextjs.org/docs/pages/api-reference/functions/get-server-side-props#redirect
- Redirect the user in `getServerSideProps` if their token isn't set in the page request.

Just checking that the user's token exists isn't enough to secure this page - someone could spoof the token being set.
Instead, we need to make sure the token is valid; that our application is the one who created it. You can learn how to 
do this in the JWT introduction I linked earlier. https://jwt.io/introduction

- [ ] The authenticated page checks that the token is valid before sending the page to the user.

## Sign Out

This bit is extra credit as it's not implemented in the `main` branch.

To sign a user out when they click the sign-out button, you need to delete that cookie and redirect them back to the base page.
Can you find an elegant way to do this? 

- [ ] Clicking the "sign out" button signs users out.
- [ ] Signed-out users can't access the authenticated page.







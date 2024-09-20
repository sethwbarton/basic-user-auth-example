# Web Auth Basics Activity

Hello! Welcome to this small activity I've created to help understand the very basics of end-user web authentication.

Ideally you'd spend ~4 hours completing what's in this activity. If you want to learn more and make a fully-functional
full-stack app with this as a template, you are welcome to do so.

## What are we building? 

In this activity, you'll create a fully functioning sign-in system. It doesn't use the latest and greatest technologies,
it's not even the most secure, but it works for signing people in and it illustrates the most important concepts. 

You'll learn about the following topics:

- Token-based authentication
- Session-based authentication
- The pros and cons of token and session-based authentication.
- Cookies vs session storage vs local storage in the browser
- Password salting and hashing.
- Next.js
- The server / client relationship
- Communicating with a Database

We won't dive into these topics in excessive detail, but you should gain a high level understanding which you can 
use to learn these topics in more detail.

## Project Setup

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

Pick a password you'll remember for the root user when you setup the SQL server. 
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
```

These variables will get loaded into the Next server code to be accessed through `process.env`.

Read about Next.js environment variables: https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables

# Let's Get Coding!

With all that setup out of the way, we're ready to take a look at the code and what it is we'll be building.
The goal of all of this is to learn how web authentication works by doing it ourselves. What we're building
is NOT sufficiently secure to go into users' hands. It's not feature complete. And it doesn't necessarily follow best practices,
but it does illustrate how authentication works. 

We'll use Next.js to build a full-stack application that allows users to register an account, login, and log out, with 
bonus points if you can implement the change password feature.

We're going to implement these features two ways: with JWT (token) authentication, and session-based authentication.
















This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/sign-up.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

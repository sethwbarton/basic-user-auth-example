import Head from "next/head";
import styles from "@/styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>Basic User Auth Example</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <main className={styles.main}>
          <h1>Sign Up</h1>
          <form className={styles.form}>
            <label htmlFor="email-input">Email</label>
            <input type={"email"}/>
            <label htmlFor="password-input">Password</label>
            <input type={"password"} />
            <button type={'submit'}> Create My Account</button>
          </form>
          <h1>Sign In</h1>
          <form className={styles.form}>
            <label htmlFor="email-input">Email</label>
            <input type={"email"} />
            <label htmlFor="password-input">Password</label>
            <input type={"password"}/>
            <button type={'submit'}>Sign In</button>
          </form>
        </main>
    </>
  );
}

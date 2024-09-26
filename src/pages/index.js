import Head from "next/head";
import styles from "@/styles/Home.module.css";
import {useMutation} from '@tanstack/react-query';
import axios from 'axios';

export default function Home() {
  const signUpMutation = useMutation({
    mutationFn: (signUpData) => {
      return axios.post('/api/sign-up', signUpData)
    },
  })

  const signInMutation = useMutation({
    mutationFn: (signInData) => {
      return axios.post('/api/sign-in', signInData)
    },
  })

  function submitSignUp(e) {
    e.preventDefault();
    signUpMutation.mutate({email: e.target[0].value, password: e.target[1].value})
  }

  async function submitSignIn(e) {
    e.preventDefault();
    signInMutation.mutate({email: e.target[0].value, password: e.target[1].value})
  }

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
          <form className={styles.form} onSubmit={submitSignUp}>
            <label htmlFor="email-input">Email</label>
            <input type={"email"}/>
            <label htmlFor="password-input">Password</label>
            <input type={"password"} />
            <button type={'submit'}> Create My Account</button>
          </form>
          <h1>Sign In</h1>
          <form className={styles.form} onSubmit={submitSignIn}>
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

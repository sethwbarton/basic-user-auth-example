import styles from "@/styles/Home.module.css";
import {redirect} from 'next/navigation';
import {createHash} from 'node:crypto';

/**
 * The challenge is to make it so that only logged in users can see this page.
 * Think about using the getServerSideProps function from Next.js to check if the user is logged in.
 *
 * https://nextjs.org/docs/pages/building-your-application/data-fetching/get-server-side-props
 *
 * There are smoother ways of doing authenticated pages like this in Next.js,
 * including some really neat libraries.
 */
export default function Authenticated() {
  return (
      <>
        <div className={styles.main}>
          <h1>You're logged in!</h1>
          <p>You shouldn't see this page if you aren't</p>
          {/*TODO: Handle log out by unsetting the JWT and redirecting the user back to the landing page*/}
          <button>Log Out</button>
        </div>
      </>
  );
}

export async function getServerSideProps(context) {
  // TODO: Grab the user's auth cookie from the context object.
  // TODO: Check if the auth cookie is a valid JWT that has this application's signature.
  // If it is, show the user the page. Otherwise, redirect them back to the base page.

  return { props: {}}
}

function isValidJwt(jwt) {
 // TODO: Implement me!
 // https://jwt.io/introduction
}
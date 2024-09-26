import styles from "@/styles/Home.module.css";
import {redirect} from 'next/navigation';

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
          {/*TODO: Handle log out*/}
          <button>Log Out</button>
        </div>
      </>
  );
}

export async function getServerSideProps(context) {
  // check the context (should have the user's auth cookie in there) and see if they are logged in.
  // If they aren't logged in, you'll have to redirect them back to the home page.
  // const jwt = context.req.cookies
  console.log("COOKIES")
  console.log(context.req.cookies);
  const jwt = context.req.cookies.session_token

  if (!jwt) {
    return {
      redirect: {
        destination: '/', // The URL to redirect to
        permanent: true, // Set to true for a permanent redirect (301) or false for a temporary redirect (302)
      },
    };
  }

  return { props: {}}
}

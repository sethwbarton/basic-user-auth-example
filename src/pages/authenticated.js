import styles from "@/styles/Home.module.css";

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
          <h1>You're logged in! Or, I hope you are.</h1>
          {/*TODO: Handle log out*/}
          <button>Log Out</button>
        </div>
      </>
  );
}

export async function getServerSideProps(context) {
  // check the context (should have the user's auth cookie in there) and see if they are logged in.
  // If they aren't logged in, you'll have to redirect them back to the home page.
  return { props: {}}
}

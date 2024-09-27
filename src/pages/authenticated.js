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
  const jwt = context.req.cookies.session_token

  // If the user doesn't have a token, or the token they have can't be verified,
  // redirect them before showing them this page.
  if (!jwt || !isValidJwt(jwt)) {
    return {
      redirect: {
        destination: '/', // The URL to redirect to
        permanent: true, // Set to true for a permanent redirect (301) or false for a temporary redirect (302)
      },
    };
  }

  return { props: {}}
}

function isValidJwt(jwt) {
  const parts = jwt.split('.')
  const header = parts[0]
  const payload = parts[1]
  const signature = parts[2]

  const correctSignature = createHash('sha256').update(header + "." + payload + process.env.JWT_SECRET).digest('base64')

  return signature === correctSignature
}
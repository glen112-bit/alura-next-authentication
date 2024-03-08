import Link from 'next/link'
import { withSession } from '../src/services/auth/session.js'

function AuthPageSSR(props) {
  return (
    <>
      <div>
        <h1>Auth page Server</h1>
      </div>
       <Link href={'/'}>
        <div>home</div>
      </Link>
      <Link href={'/auth-page-static'}>
        <div>static</div>
      </Link>
      <pre>
        {JSON.stringify(props, null, 2)}
      </pre>
    </>
  )
}
export default AuthPageSSR

export const getServerSideProps = withSession((ctx) => {
  // console.log(ctx.req.session);

  return {
    props: {
      session: ctx.req.session,
    }
  }
})


import { withSession } from '../src/services/auth/session.js'

function AuthPageSSR(props) {
  return (
    <>
      <div>
        <h1>Auth page Server</h1>
      </div>
      <pre>
        {JSON.stringify(props, null, 2)}
      </pre>
    </>
  )
}
export default AuthPageSSR

export const getServerSideProps = withSession((ctx) => {
  console.log(ctx.req.session);

  return {
    props: {
      session: ctx.req.session,
    }
  }
})


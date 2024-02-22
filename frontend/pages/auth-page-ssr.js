

function AuthPageServer(props) {
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
export default AuthPageServer

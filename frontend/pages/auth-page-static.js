// import { useSession } from 'next-auth/react'
import React from 'react'
import Link from 'next/link'
import { whithSessionHOC } from '../src/services/auth/session.js'

function AuthPgeStatic(props) {
  return (
    <>
      <div>
        <h1>Auth page static</h1>
      </div>
      <Link href={'/'}>
        <div>home</div>
      </Link>
      <Link href={'/auth-page-ssr'}>
        <div>ssr</div>
      </Link>
      <pre>
        {JSON.stringify(props, null, 2)}
      </pre>
    </>
  )
}
export default whithSessionHOC(AuthPgeStatic) 

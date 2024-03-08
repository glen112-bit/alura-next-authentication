import { useRouter } from "next/router";
import { useState } from "react";
import { authService } from '../src/services/auth/authService.js'
import Link from 'next/link';

export default function HomeScreen() {
  const router = useRouter();
  const [values, setValues] = useState({
    usuario:'omariosouto',
    senha:'safepassword',
  });
  const handleChange = (e) => {
    const fieldValue = e.target.value;
    const fieldName = e.target.name
    setValues((currentValues) => {
      return {
        ...currentValues,
        [fieldName]: fieldValue
      };
    })
  }
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={e => {
        e.preventDefault()
        authService
          .login({
            username: values.usuario,
            password: values.senha,
          })
          .then(() => {
            router.push('/auth-page-ssr');
            // router.push('/auth-page-static');
          }) 
          .catch(() => {
            alert('usuario o senha invalida')
          })
      }}>
        <input
          placeholder="Usuário" name="usuario"
          onChange={handleChange}
          value={values.usuario}
        />
        <input
          placeholder="Senha" name="senha" type="password"
          onChange={handleChange}
          value={values.senha}
        />
        <pre>
          {JSON.stringify(values, null, 3)}
        </pre>
        <div>
          <button>
            Entrar
          </button>
        </div>
      </form>
      <Link href={'/auth-page-ssr'}>
        <div>ssr</div>
      </Link>
      <Link href={'/auth-page-static'}>
        <div>static</div>
      </Link>
    </div>
  );
}

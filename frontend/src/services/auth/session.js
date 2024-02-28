import { authService } from "./authService.js";
import { useRouter } from "next/router";
import React from "react";

export function withSession(func) {
  return async (ctx) => {
    try {
      const session = await authService.getSession(ctx);
      const modifiedCtx = {
        ...ctx,
        req: {
          ...ctx.req,
          session,
        },
      };
      return func(modifiedCtx);
    } catch (e) {
      /* handle error */
      return {
        redirect: {
          permanent: false,
          destination: "/?error=401",
        },
      };
    }
  };
}

export function useSession() {
  const [session, setSession] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    authService
      .getSession()
      .then((userSession) => {
        setSession(userSession);
        // console.log(userSession);
      })
      .catch((err) => {
        setError(err);
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return {
    data: session,
    loading,
    error,
  };
}

export function whithSessionHOC(Component) {
  return function wrapper(props) {
    const router = useRouter();
    const session = useSession();
    if (!session.loading && session.error) {
      router.push("/?error=401");
    }
    const modifyProps = {
      ...props,
      session: session.data,
    };
    return <Component {...modifyProps} />;
  };
}

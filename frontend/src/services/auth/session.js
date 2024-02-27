import { authService } from './authService.js';

export function withSession(func){
  return async(ctx) => {
    try {
      const session = await authService.getSession(ctx)
      const modifiedCtx = {
        ...ctx,
        req:{
          ...ctx.req,
          session,
        }
      }       
      return func(modifiedCtx)

      } catch (e) {
        /* handle error */
        return {
      redirect:{
        permanent: false,
        destination: '/?error=401',
        }
      }
    }
  }
}



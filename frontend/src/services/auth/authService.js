import { tokenService } from "../tokenService";
import { HttpClient } from "../../infra/HttpClient/HttpClient";

export const authService = {
  async login({username, password}) {
    return HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login`, {
      method: 'POST',
      body: { username,  password },
    })
      .then( async(serviceAnswer) => {
        if (!serviceAnswer.ok) throw new Error('Usuario o Senha no recnocida')
        const body = serviceAnswer.body
        console.log(body);
        tokenService.save(body.data.access_token)
      })
  }
};

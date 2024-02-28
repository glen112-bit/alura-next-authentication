import { tokenService } from "../tokenService";
import { HttpClient } from "../../infra/HttpClient/HttpClient";

export const authService = {

  async login({ username, password }) {
    return HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login`, {
      method: "POST",
      body: { username, password },
    })
      .then(async (serviceAnswer) => {
      if (!serviceAnswer.ok) throw new Error("Usuario o Senha no recnocida");
      const body = serviceAnswer.body;
      // console.log(body.data.access_token);
      tokenService.save(body.data.access_token);
        // console.log(token);
      return body
    })

    .then( async ({ data }) => {

      const { refresh_token } = data
      const response = await HttpClient('/api/refresh', {
        method: 'POST',
        body: {
          refresh_token
        }
      })
      console.log(response);
    })
  },

  async getSession(ctx = null) {
    const token = tokenService.get(ctx);
    return HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/session`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      if (!response.ok) throw new Error("no autorizado");
      return response.body.data;
    });
  },
};

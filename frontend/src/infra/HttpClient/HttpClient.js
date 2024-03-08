import nookies from 'nookies';

export async function HttpClient(fetchUrl, fetchOptions) {
  const options = {
    ...fetchOptions,
    headers:{
      'Content-Type': 'application/json',
      ...fetchOptions.headers,
    },
    body: fetchOptions.body ? JSON.stringify(fetchOptions.body) : null,
  };
  return fetch( fetchUrl, options )
    .then(async(serviceAnswer) => {
      return{
        ok: serviceAnswer.ok,
        status: serviceAnswer.status,
        statusText:  serviceAnswer.statusText,
        body: await serviceAnswer.json(), 
      }
    })
    .then( async (response) => {
      if (!fetchOptions.refresh) return response 
      if (response.status !== 401) return response
      console.log('middleware: rodar codigo actualzar token');

      const refreshResponse = await HttpClient('http://localhost:3000/api/refresh', {
        method: 'GET'
      })
      const newAccessToken = refreshResponse.body.data.access_token;
      const newRefreshToken = refreshResponse.body.data.refresh_token
      
      return refreshResponse
    }) 
}

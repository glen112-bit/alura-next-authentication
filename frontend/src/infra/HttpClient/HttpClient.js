
export async function HttpClient(fetchUrl, fetchOptions) {
  return fetch(fetchUrl, {
    ...fetchOptions,
    headers:{
      'Content-Type': 'application/json',
      ...fetchOptions.headers,
    },
    body: fetchOptions.body ? JSON.stringify(fetchOptions.body) : null,
  })
  .then(async(serviceAnswer) => {
    return{
      ok: serviceAnswer.ok,
      body: await serviceAnswer.json(),
    }
  });

}

export async function fetchWithTimeout(resource, options = {}) {
    const { timeout = 8000 } = options;
    
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
  
    const response = await fetch(resource, {
      ...options,
      signal: controller.signal,
      mode: 'cors',
      credentials: 'include'
    });
    clearTimeout(id);
  
    return response;
}


export async function asyncFetchPosts(posts) {
  
  return Promise.all(
      posts.map(async (id) => {
        let tmp = await fetch(
          `${process.env.REACT_APP_BACKEND_API}/posts/fetch/${id}`,
        )
        return tmp.json()
      })
  ).then(
    (ret) => {
      return ret
    }
  )
}
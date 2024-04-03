export async function fetchWithTimeout(resource, options = {}) {
    const { timeout = 8000 } = options;
    
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
  
    const response = await fetch(resource, {
      ...options,
      signal: controller.signal,
      mode: 'cors'
    });
    clearTimeout(id);
  
    return response;
}


export async function asyncFetchPosts(posts) {
  
  ret = await Promise.all(
      posts.map(async (id) => {
        return await fetch(`${process.env.EXPO_PUBLIC_API_URL}/posts/fetch/${id}`)
      })
  )

  return ret

}

declare global {
  interface Window {
    API_URL: any
  }
}

const request = async (
  url: string,
  query: string = '',
  options: Record<string, any> = {}
): Promise<any> => {
  if (process.env.REACT_APP_BASE_URL === undefined) {
    console.warn('BASE_URL is not configured')
  }
  const baseUrl = process.env.REACT_APP_BASE_URL ?? window.API_URL
  let requestUrl = String(baseUrl) + url
  if (query.length !== 0) {
    requestUrl += '?' + query
  }
  const defaultOptions = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8'
    }
  }
  const response = await fetch(requestUrl, { ...defaultOptions, ...options })
  return await response.json()
}

export default request

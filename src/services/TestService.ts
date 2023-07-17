import request from '../http'

const getAll = async (params: URLSearchParams): Promise<any> => {
  return await request('/api/tests', params.toString())
}

const deleteGiven = async (ids: string[]): Promise<any> => {
  const options = {
    method: 'POST',
    body: JSON.stringify({ ids: ids })
  }
  return await request('/api/tests/delete', '', options)
}

const TestService = {
  getAll,
  deleteGiven
}

export default TestService

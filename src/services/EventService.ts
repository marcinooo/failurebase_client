import request from '../http'

const getAll = async (params: URLSearchParams): Promise<any> => {
  return await request('/api/events', params.toString())
}

const deleteGiven = async (ids: string[]): Promise<any> => {
  const options = {
    method: 'POST',
    body: JSON.stringify({ ids: ids })
  }
  return await request('/api/events/delete', '', options)
}

const EventService = {
  getAll,
  deleteGiven
}

export default EventService

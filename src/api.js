import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000'
})

export const fetchTasks = _ => axiosInstance.get('/tasks', {
  params: {
    _sort: 'updated_at',
    _order: 'asc'
  }
})

export const createTask = payload => {
  payload.status = 'backlog'
  payload.created_at = new Date
  payload.updated_at = new Date
  return axiosInstance.post('/tasks', payload)
}

export const deleteTask = payload => {
  return axiosInstance.delete(`/tasks/${payload.id}`)
}

export const updateTask = payload => {
  payload.updated_at = new Date
  return axiosInstance.put(`/tasks/${payload.id}`, payload)
}

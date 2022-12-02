import { api } from 'boot/axios'

export function getAllTasks () {
  return api.get('/tasks')
}

export function getTasksList (id) {
  return api.get('/tasks/' + id)
}

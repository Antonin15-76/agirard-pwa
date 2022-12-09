import { api } from 'boot/axios'

export function getAllTasks () {
  return api.get('/tasks')
}

export function getTasksList (id) {
  return api.get('/tasks/list/' + id)
}

export function getTask (id) {
  return api.get('/tasks/' + id)
}

export function moveInOtherList (id, listId) {
  console.log(id)
  console.log(listId)
  return api.put('/tasks/move/' + id, { ...listId })
}

export function updateTask (id, data) {
  console.log(id, data)
  const newObject = data.data.reduce(
    (accumulator, currentValue) => {
      return ('')
    }
  )
  console.log(newObject.name)
  return api.put('/tasks/' + id, { newObject })
}

export function updateTaskForm (id, data) {
  return api.put('/tasks/' + id, { ...data })
}

export function createTask (data) {
  console.log(data)
  return api.post('/tasks', { data })
}

export function deleteTask (id) {
  return api.delete('tasks/' + id)
}

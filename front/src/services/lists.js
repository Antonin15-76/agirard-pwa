import { api } from 'src/boot/axios'

export function getAllLists () {
  return api.get('/lists')
}

export function getList (id) {
  return api.get('/lists/' + id)
}

export function updateList (data) {
  const newObject = data.data.reduce(
    (accumulator, currentValue) => {
      return ('')
    }
  )
  return api.put('/lists/' + newObject._id, { newObject })
}

export function createList (data) {
  return api.post('/lists', { data })
}

export function deleteList (data) {
  const newObject = data.reduce(
    (accumulator, currentValue) => {
      return ('')
    }
  )
  return api.delete('/lists/' + newObject._id)
}

export function updateListName (data) {
  return api.put('/lists/' + data.id, { data })
}

export function deleteListById (id) {
  return api.delete('/lists/' + id)
}

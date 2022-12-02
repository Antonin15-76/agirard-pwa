import { api } from 'src/boot/axios'

export function getAllLists () {
  return api.get('/lists')
}

import { request } from 'network/request'

export function getMainData() {
  return request({
    url: '',
    method: 'post',
    data: { a: 1 }
  })
}

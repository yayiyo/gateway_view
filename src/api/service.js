import request from '@/utils/request'

export function serviceList(query) {
  return request({
    url: '/services',
    method: 'get',
    params: query
  })
}

import request from '@/utils/request'

export function appList(query) {
  return request({
    url: '/apps',
    method: 'get',
    params: query
  })
}

export function appDelete(id) {
  return request({
    url: '/apps/' + id,
    method: 'delete'
  })
}

export function appDetail(id) {
  return request({
    url: '/apps/' + id,
    method: 'get'
  })
}

export function appStats(id) {
  return request({
    url: '/apps/' + id + '/stats',
    method: 'get'
  })
}

export function appCreate(data) {
  return request({
    url: '/apps',
    method: 'post',
    data
  })
}

export function appUpdate(id, data) {
  return request({
    url: '/apps/' + id,
    method: 'put',
    data
  })
}

import request from '@/utils/request'

export function serviceList(query) {
  return request({
    url: '/services',
    method: 'get',
    params: query
  })
}

export function serviceDelete(id) {
  return request({
    url: '/services/' + id,
    method: 'delete'
  })
}

export function serviceDetail(id) {
  return request({
    url: '/services/' + id,
    method: 'get'
  })
}

export function serviceStats(id) {
  return request({
    url: '/services/' + id + '/stats',
    method: 'get'
  })
}

export function serviceHTTPCreate(data) {
  return request({
    url: '/services/http',
    method: 'post',
    data
  })
}

export function serviceHTTPUpdate(id, data) {
  return request({
    url: '/services/http/' + id,
    method: 'put',
    data
  })
}

export function serviceTCPCreate(data) {
  return request({
    url: '/services/tcp',
    method: 'post',
    data
  })
}

export function serviceTCPUpdate(id, data) {
  return request({
    url: '/services/tcp/' + id,
    method: 'put',
    data
  })
}

export function serviceGRPCCreate(data) {
  return request({
    url: '/services/grpc',
    method: 'post',
    data
  })
}

export function serviceGRPCUpdate(id, data) {
  return request({
    url: '/services/grpc/' + id,
    method: 'put',
    data
  })
}

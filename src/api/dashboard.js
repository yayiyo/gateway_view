import request from '@/utils/request'

export function panelGroupData() {
  return request({
    url: '/dashboard/panel_group_data',
    method: 'get'
  })
}

export function flowStats() {
  return request({
    url: '/dashboard/flow_stats',
    method: 'get'
  })
}

export function serviceStats() {
  return request({
    url: '/dashboard/service_stats',
    method: 'get'
  })
}

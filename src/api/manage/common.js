import request from '@/utils/request'

// 获取areaid
export function listAreaID() {
  return request({
    url: '/common/areaid/list',
    method: 'get'
  })
}

// 获取userid
export function listUserID(query) {
  return request({
    url: '/common/userid/list',
    method: 'get',
    params:query
  })
}
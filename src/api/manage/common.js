import request from '@/utils/request'

// 获取areaid
export function listAreaID() {
  return request({
    url: '/common/areaid/list',
    method: 'get'
  })
}

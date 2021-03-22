import request from '@/utils/request'

// 查询任务分派列表
export function listAssignMent(query) {
  return request({
    url: '/manage/assign/list',
    method: 'get',
    params: query
  })
}
import request from '@/utils/request'

// 查询任务分派列表
export function listAssignment(query) {
  return request({
    url: '/manage/assign/list',
    method: 'get',
    params: query
  })
}
// 保存任务分派列表--新增
export function createAssignmentList(query) {
  return request({
    url: '/manage/assign/createall',
    method: 'put',
    params: query
  })
}
// 保存任务分派列表--更新
export function updateAssignmentList(query) {
  return request({
    url: '/manage/assign/updateall',
    method: 'post',
    params: query
  })
}
// 创建单行任务
export function createAssignment(query) {
  return request({
    url: '/manage/assign/create',
    method: 'put',
    params: query
  })
}
// 更新单行任务
export function updateAssignment(query) {
  return request({
    url: '/manage/assign/update',
    method: 'post',
    params: query
  })
}
// 更新单行任务
export function assignTask(query) {
  return request({
    url: '/manage/assign/assign',
    method: 'post',
    params: query
  })
}
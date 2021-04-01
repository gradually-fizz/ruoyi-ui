import request from '@/utils/request'

// 查询我的当前任务
export function listMyCurAssignment(query) {
  return request({
    url: '/manage/mytask/list',
    method: 'get',
    params:query
  })
}

// 提交我的任务
export function submitMyAssignment(query) {
  return request({
    url: '/manage/mytask/submit',
    method: 'put',
    params:query,
  })
}

// 转办我的任务
export function transferMyAssignment(query) {
  return request({
    url: '/manage/mytask/transfer',
    method: 'put',
    params:query,
  })
}

// 查询我的历史任务
export function listMyHisAssignment(query) {
  return request({
    url: '/manage/mytask/history',
    method: 'get',
    params:query
  })
}

// 查询我的转办任务
export function listMyTraAssignment(query) {
  return request({
    url: '/manage/mytask/transferhis',
    method: 'get',
    params:query
  })
}
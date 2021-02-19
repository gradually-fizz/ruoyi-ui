import request from '@/utils/request'

// 查询变化点模板列表
export function listTemplate(query) {
  return request({
    url: '/manage/template/list',
    method: 'get',
    params: query
  })
}

// 查询变化点模板详细
export function getTemplate(group) {
  return request({
    url: '/manage/template/' + group,
    method: 'get'
  })
}

// 新增变化点模板
export function addTemplate(data) {
  return request({
    url: '/manage/template',
    method: 'post',
    data: data
  })
}

// 修改变化点模板
export function updateTemplate(data) {
  return request({
    url: '/manage/template',
    method: 'put',
    data: data
  })
}

// 删除变化点模板
export function delTemplate(group) {
  return request({
    url: '/manage/template/' + group,
    method: 'delete'
  })
}

// 导出变化点模板
export function exportTemplate(query) {
  return request({
    url: '/manage/template/export',
    method: 'get',
    params: query
  })
}
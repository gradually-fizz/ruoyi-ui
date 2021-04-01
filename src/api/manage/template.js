import request from '@/utils/request'
import { praseStrEmpty } from "@/utils/ruoyi";

// 查询变化点模板列表
export function listTemplate(query) {
  return request({
    url: 'business/template/list/'+ query,
    method: 'get',
  })
}
// 查询变化点模板列表
export function getTemplateAll() {
  return request({
    url: '/business/template/all',
    method: 'get'
  })
}

// 查询变化点模板详细
export function getTemplate(group) {
  return request({
    url: '/business/template/' + group,
    method: 'get'
  })
}

// 新增变化点模板
export function addTemplate(data) {
  return request({
    url: '/business/template',
    method: 'post',
    data: data
  })
}

// 修改变化点模板
export function updateTemplate(data) {
  return request({
    url: '/business/template/edit',
    method: 'put',
    data: data
  })
}

// 删除变化点模板
export function delTemplate(group) {
  return request({
    url: '/business/template/' + group,
    method: 'delete'
  })
}

// 导出变化点模板
export function exportTemplate(query) {
  return request({
    url: '/business/template/export',
    method: 'get',
    params: query
  })
}

// 下载用户导入模板
export function importTemplate() {
  return request({
    url: '/business/template/importTemplate',
    method: 'get'
  })
}
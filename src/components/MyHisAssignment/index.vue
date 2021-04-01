<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{title}}</span>
      </div>
      <div class="text item">
        <el-table
          v-loading="loading"
          :data="list"
          :span-method="objectSpanMethod"
          border
        >
        
          <el-table-column
            label="分组"
            prop="categorygroup"
            width="80"
            align="center"
          />
          
          <el-table-column
            label="类别"
            prop="category"
            width="80"
            align="center"
          />
          <el-table-column
            label="变化点内容"
            prop="items"
            width="80"
            align="center"
          />
          <el-table-column
            label="确认项目"
            prop="item"
            width="80"
            align="center"
          />
          <el-table-column
            label="未执行到位产生异常"
            prop="unexcepteditem"
            width="80"
            align="center"
          />
          
          <el-table-column
            label="变化数量"
            prop="recognizednum"
            width="80"
            align="center"
          />
          
          <el-table-column
            label="变化点内容"
            prop="recognizeditem"
            width="80"
            align="center"
          />
          <el-table-column
            label="责任人"
            prop="reponsibe"
            width="80"
            align="center"
          />
          <el-table-column
            label="确认结果"
            prop="result"
            width="80"
            align="center"
          />
          <el-table-column
            label="计划确认时间"
            prop="duedate"
            width="80"
            align="center"
          />
          <el-table-column
            label="突发数量"
            prop="unexceptednum"
            width="80"
            align="center"
          />
          <el-table-column
            label="突发内容"
            prop="unexcepteditem"
            width="80"
            align="center"
          />
 
        </el-table>
        <pagination
          v-show="total>0"
          :total="total"
          :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize"
          @pagination="$emit('getHisList',queryParams.pageNum,queryParams.pageSize)"
        />
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
    name: 'MyHisAssignment',
    props: {
      list:Array,
      title:String,
      queryParams:Object,
      total:Number
    },
  data() {
    return {};
  },
};
</script>
<style scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 100%;
}
</style>
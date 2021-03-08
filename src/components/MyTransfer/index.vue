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
        </el-table>
        <pagination
          v-show="total>0"
          :total="total"
          :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize"
          @pagination="getList"
        />
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
    name: 'MyTransfer',
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
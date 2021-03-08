<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
        <span>{{title}}</span>
      </div>
      <div class="text item">
        图表展示，e-charts
      </div>
        </el-card>
    </div>
</template>
<script>
export default {
    name:"AssignmentShow",
    props:{
        title:String
    }
}
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
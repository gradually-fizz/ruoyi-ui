<template>
  <div class="app-container">
    <div class="app-container">
      <el-badge :value="12" class="title-container">
        <el-button icon="el-icon-warning" @click="showNum = 0"
          >当前任务</el-button
        >
      </el-badge>
      <el-badge hidden class="title-container">
        <el-button icon="el-icon-s-flag" @click="showNum = 1"
          >历史任务</el-button
        >
      </el-badge>
      <el-badge hidden class="title-container">
        <el-button icon="el-icon-share" @click="showNum = 2"
          >转办记录</el-button
        >
      </el-badge>
    </div>
    <el-divider></el-divider>

    <!-- 当前任务 -->
    <div v-show="showDetails[0].show">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>当前任务</span>
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
        </div>
      </el-card>
    </div>

    <!-- 历史任务 -->
    <div v-show="showDetails[1].show">历史任务</div>

    <!-- 转办记录 -->
    <div v-show="showDetails[2].show">转办记录</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showDetails: [{ show: true }, { show: false }, { show: false }],
      showNum: 0,
      list: [
        {
          category: "c",
          items: "is",
          item: "i",
        },
      ],
    };
  },
  methods: {},
  watch: {
    showNum() {
      for (var i = 0; i < this.showDetails.length; i++) {
        if (i == this.showNum) {
          this.showDetails[i].show = true;
        } else {
          this.showDetails[i].show = false;
        }
      }
    },
  },
};
</script>
<style>
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
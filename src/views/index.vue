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

    <div v-show="showDetails[0].show">
      <my-assignment
        :list="curlist"
        title="当前任务"
        :queryParams="queryParams"
        :total="total"
        @getList="getList"
      />
    </div>

    <div v-show="showDetails[1].show">
      <my-his-assignment-show title="图表展示" class="card"/>
      <my-his-assignment
        :list="hislist"
        title="历史任务"
        :queryParams="queryParams"
        :total="total"
        class="card"
      />
    </div>

    <div v-show="showDetails[2].show">
      <my-transfer
        :list="tralist"
        title="转办记录"
        :queryParams="queryParams"
        :total="total"
      />
    </div>
  </div>
</template>
<script>
import MyAssignment from "@/components/MyAssignment";
import MyHisAssignmentShow from "@/components/MyHisAssignmentShow";
import MyHisAssignment from "@/components/MyHisAssignment";
import MyTransfer from "@/components/MyTransfer";
export default {
  components: { MyAssignment, MyHisAssignmentShow, MyHisAssignment, MyTransfer },
  data() {
    return {
      showDetails: [{ show: true }, { show: false }, { show: false }],
      showNum: 0,
      queryParams: {
        pageNum: 1,
        pageSize: 5,
      },
      total: 13,
      curlist: [
        {
          category: "c",
          items: "is",
          item: "i",
        },{
          category: "c",
          items: "is",
          item: "i",
        },{
          category: "c",
          items: "is",
          item: "i",
        },{
          category: "c",
          items: "is",
          item: "i",
        },{
          category: "c",
          items: "is",
          item: "i",
        },{
          category: "c",
          items: "is",
          item: "i11",
        },{
          category: "c",
          items: "is",
          item: "i12",
        },
      ],
      hislist: [
        {
          category: "h",
          items: "is",
          item: "i",
        },
      ],
      tralist: [
        {
          category: "t",
          items: "is",
          item: "i",
        },
      ],
    };
  },
  created: {},
  methods: {
    getList(value){
      console.log(value);
    }
  },
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
.card {
  padding: 30px;
}
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
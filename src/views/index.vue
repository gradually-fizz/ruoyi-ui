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
        @handleSubmit="handleSubmit"
        @handleTransfer="handleTransfer"
        @getCurList="getCurList"
      />
    </div>

    <div v-show="showDetails[1].show">
      <my-his-assignment-show title="图表展示" class="card" />
      <my-his-assignment
        :list="hislist"
        title="历史任务"
        :queryParams="queryParams"
        :total="total"
        class="card"
        @getHisList="getHisList"
      />
    </div>

    <div v-show="showDetails[2].show">
      <my-transfer
        :list="tralist"
        title="转办记录"
        :queryParams="queryParams"
        :total="total"
        @getTraList="getTraList"
      />
    </div>

    <!-- 获取人员信息对话框 -->
    <el-dialog
      :title="title"
      :visible.sync="open"
      width="600px"
      append-to-body
    >
      <el-form :inline="true" >
        <el-form-item label="用户工号" prop="userId">
          <el-input
            v-model="queryParams1.userId"
            clearable
            size="small"
            style="width: 100px"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item label="用户姓名" prop="userName">
          <el-input
            v-model="queryParams1.userName"
            clearable
            size="small"
            style="width: 100px"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-search"
            size="mini"
            @click="handleQuery"
            >搜索</el-button
          >
          <el-button icon="el-icon-refresh" size="mini" @click="resetQuery"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
      <el-card header="检索结果">
      <el-table
        ref="singleTable"
        :data="userList"
        highlight-current-row
        @current-change="handleCurrentChange"
        style="width: 100%"
      >
        <el-table-column property="userId" label="工号" >
        </el-table-column>
        <el-table-column property="userName" label="姓名">
        </el-table-column>
      </el-table>
      </el-card>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import MyAssignment from "@/components/MyAssignment";
import MyHisAssignmentShow from "@/components/MyHisAssignmentShow";
import MyHisAssignment from "@/components/MyHisAssignment";
import MyTransfer from "@/components/MyTransfer";
import {
  listMyCurAssignment,
  listMyHisAssignment,
  listMyTraAssignment,
  submitMyAssignment,
  transferMyAssignment,
} from "@/api/manage/mytask";
export default {
  components: {
    MyAssignment,
    MyHisAssignmentShow,
    MyHisAssignment,
    MyTransfer,
  },
  data() {
    return {
      title:'',
      open:false,
      curTaskRow:{},
      userList:[],
      showDetails: [{ show: true }, { show: false }, { show: false }],
      showNum: 0,
      queryParams: {
        pageNum: 1,
        pageSize: 5,
      },
      queryParams1: {
        userId: '',
        userName: '',
      },
      total: 13,
      curlist: [
        {
          category: "c",
          items: "is",
          item: "i",
          transferredperson:"tom1",
        },
        {
          category: "c",
          items: "is",
          item: "i",
          transferredperson:"cat1",
        },
        {
          category: "c",
          items: "is",
          item: "i",
        },
        {
          category: "c",
          items: "is",
          item: "i",
        },
        {
          category: "c",
          items: "is",
          item: "i",
        },
        {
          category: "c",
          items: "is",
          item: "i11",
        },
        {
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
    handleSubmit(value) {
      this.$confirm('确认提交？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
      // submitMyAssignment(value).then(response=>{
      // })
      // this.getCurList(this.queryParams.pageNum,this.queryParams.pageSize);
          this.$message({
            type: 'success',
            message: '提交成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消提交'
          });          
        });
    },
    handleTransfer(value) {
      this.title = '请选择转办人员';
      this.open = true;
      this.curTaskRow = value;
    },
    submitForm(){
      
      let transferObject = {
        taskid: this.curTaskRow.taskid,
        status: this.curTaskRow.status,
        transferor: localStorage.getItem("loginuserid"),
        transferredperson: this.curTaskRow.transferredperson,
      };
      // transferMyAssignment(transferObject).then(response=>{
      // })
      // this.getCurList(this.queryParams.pageNum,this.queryParams.pageSize);
      this.open = false;
    },
    cancel(){
      this.open = false;
    },
    handleCurrentChange(value){
      this.curTaskRow.transferredperson = value.userId
    },
    getCurList(value1, value2) {
      console.log(value1);
      console.log(value2);
      this.queryParams.pageNum = value1;
      this.queryParams.pageSize = value2;
      let queryObject = {
        userId: localStorage.getItem("loginuserid"),
        pageNum: value1,
        pageSize: value2,
      };
      // listMyCurAssignment(queryObject).then(response=>{
      //   this.curlist = response
      // })
      this.curlist = [
        {
          category: "casc",
          items: "is",
          item: "i",
          transferredperson:"tom",
        },
        {
          category: "cac",
          items: "is",
          item: "i",
          transferredperson:"cat",
        },
        {
          category: "casc",
          items: "is",
          item: "i",
        },
      ];
    },
    getHisList(value1, value2) {
      this.queryParams.pageNum = value1;
      this.queryParams.pageSize = value2;
      let queryObject = {
        userId: localStorage.getItem("loginuserid"),
        pageNum: value1,
        pageSize: value2,
      };
      // listMyHisAssignment(queryObject).then(response=>{
      //   this.hislist = response
      // })
      this.hislist = [
        {
          category: "casc",
          items: "is",
          item: "i",
          transferredperson:"tom",
        },
        {
          category: "cac",
          items: "is",
          item: "i",
          transferredperson:"cat",
        },
        {
          category: "casc",
          items: "is",
          item: "i",
        },
      ];
    },
    getTraList(value1, value2) {
      console.log(value1);
      console.log(value2);
      this.queryParams.pageNum = value1;
      this.queryParams.pageSize = value2;
      let queryObject = {
        userId: localStorage.getItem("loginuserid"),
        pageNum: value1,
        pageSize: value2,
      };
      // listMyTraAssignment(queryObject).then(response=>{
      //   this.tralist = response
      // })
      this.tralist = [
        {
          category: "casc",
          items: "is",
          item: "i",
          transferredperson:"tom",
        },
        {
          category: "cac",
          items: "is",
          item: "i",
          transferredperson:"cat",
        },
        {
          category: "casc",
          items: "is",
          item: "i",
        },
      ];
    },
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
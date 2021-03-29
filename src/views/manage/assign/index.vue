<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      v-show="showSearch"
      :inline="true"
    >
      <el-form-item label="区域" prop="areaid">
        <el-select
          v-model="queryParams.areaid"
          placeholder="选择区域"
          clearable
          size="small"
          style="width: 240px"
        >
          <el-option
            v-for="dict in areas"
            :key="dict.dictCode"
            :label="dict.dictLabel"
            :value="dict.dictCode"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="日期" prop="date">
        <el-date-picker
          v-model="queryParams.date"
          type="date"
          placeholder="选择日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="班别" prop="shifts">
        <el-select
          v-model="queryParams.shifts"
          placeholder="选择班别"
          clearable
          size="small"
          style="width: 240px"
        >
          <el-option
            v-for="dict in shiftslist"
            :key="dict.dictCode"
            :label="dict.dictLabel"
            :value="dict.dictCode"
          />
        </el-select>
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
    <el-row :gutter="10" class="mb8">
      <right-toolbar
        :showSearch.sync="showSearch"
        @queryTable="getList"
      ></right-toolbar>
    </el-row>
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-s-opportunity"
          size="mini"
          @click="handleSave"
          v-hasPermi="['system:role:edit']"
          >保存</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['system:user:edit']"
          >修改</el-button
        >
      </el-col>
    </el-row>

    <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
      <el-tab-pane label="人" name="man">
        <el-table
          v-loading="loading"
          :data="manList"
          :span-method="objectSpanMethod"
          border
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column
            label="类别"
            prop="category"
            width="80"
            align="center"
          />
          <el-table-column
            label="变化点内容"
            prop="subcategory"
            width="80"
            align="center"
          />
          <el-table-column
            label="确认项目"
            prop="content"
            width="80"
            align="center"
          />
          <el-table-column
            label="未执行到位产生异常"
            prop="exceptioncontent"
            width="80"
            align="center"
          />
          <el-table-column label="突发变化点" align="center">
            <el-table-column
              label="变化数量"
              prop="unexceptednum"
              width="80"
              align="center"
            />
            <el-table-column
              label="变化点内容"
              prop="unexcepteditem"
              width="80"
              align="center"
            />
            <el-table-column
              label="责任人"
              prop="assigneduserid"
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
          </el-table-column>
          <el-table-column
            label="状态"
            prop="status"
            width="80"
            align="center"
          />
          <el-table-column
            label="转办人"
            prop="transferor"
            width="80"
            align="center"
          />
          <el-table-column
            label="被转办人"
            prop="transferredperson"
            width="80"
            align="center"
          />
          <el-table-column
            label="操作"
            align="center"
            width="80"
            class-name="small-padding fixed-width"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                icon="el-icon-edit"
                @click="handleAssign(scope.row)"
                v-hasPermi="['system:user:edit']"
              >分派</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="机" name="machine">
        <el-table
          v-loading="loading"
          :data="machineList"
          :span-method="objectSpanMethod"
          border
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            label="类别"
            prop="category"
            width="80"
            align="center"
          />
          <el-table-column
            label="变化点内容"
            prop="subcategory"
            width="80"
            align="center"
          />
          <el-table-column
            label="确认项目"
            prop="content"
            width="80"
            align="center"
          />
          <el-table-column
            label="未执行到位产生异常"
            prop="exceptioncontent"
            width="80"
            align="center"
          />
          <el-table-column label="突发变化点" align="center">
            <el-table-column
              label="变化数量"
              prop="unexceptednum"
              width="80"
              align="center"
            />
            <el-table-column
              label="变化点内容"
              prop="unexcepteditem"
              width="80"
              align="center"
            />
            <el-table-column
              label="责任人"
              prop="assigneduserid"
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
          </el-table-column>
          <el-table-column label="突发变化点" align="center">
            <el-table-column
              label="变化数量"
              prop="unexceptednum"
              width="80"
              align="center"
            />
            <el-table-column
              label="变化点内容"
              prop="unexcepteditem"
              width="80"
              align="center"
            />
          </el-table-column>
          <el-table-column
            label="状态"
            prop="status"
            width="80"
            align="center"
          />
          <el-table-column
            label="转办人"
            prop="transferor"
            width="80"
            align="center"
          />
          <el-table-column
            label="被转办人"
            prop="transferredperson"
            width="80"
            align="center"
          />
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="料" name="material">
        <el-table
          v-loading="loading"
          :data="materialList"
          :span-method="objectSpanMethod"
          border
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column
            label="类别"
            prop="category"
            width="80"
            align="center"
          />
          <el-table-column
            label="变化点内容"
            prop="subcategory"
            width="80"
            align="center"
          />
          <el-table-column
            label="确认项目"
            prop="content"
            width="80"
            align="center"
          />
          <el-table-column
            label="未执行到位产生异常"
            prop="exceptioncontent"
            width="80"
            align="center"
          />
          <el-table-column label="突发变化点" align="center">
            <el-table-column
              label="变化数量"
              prop="unexceptednum"
              width="80"
              align="center"
            />
            <el-table-column
              label="变化点内容"
              prop="unexcepteditem"
              width="80"
              align="center"
            />
            <el-table-column
              label="责任人"
              prop="assigneduserid"
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
          </el-table-column>
          <el-table-column label="突发变化点" align="center">
            <el-table-column
              label="变化数量"
              prop="unexceptednum"
              width="80"
              align="center"
            />
            <el-table-column
              label="变化点内容"
              prop="unexcepteditem"
              width="80"
              align="center"
            />
          </el-table-column>
          <el-table-column
            label="状态"
            prop="status"
            width="80"
            align="center"
          />
          <el-table-column
            label="转办人"
            prop="transferor"
            width="80"
            align="center"
          />
          <el-table-column
            label="被转办人"
            prop="transferredperson"
            width="80"
            align="center"
          />
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="法" name="method">
        <el-table
          v-loading="loading"
          :data="methodList"
          :span-method="objectSpanMethod"
          border
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column
            label="类别"
            prop="category"
            width="80"
            align="center"
          />
          <el-table-column
            label="变化点内容"
            prop="subcategory"
            width="80"
            align="center"
          />
          <el-table-column
            label="确认项目"
            prop="content"
            width="80"
            align="center"
          />
          <el-table-column
            label="未执行到位产生异常"
            prop="exceptioncontent"
            width="80"
            align="center"
          />
          <el-table-column label="突发变化点" align="center">
            <el-table-column
              label="变化数量"
              prop="unexceptednum"
              width="80"
              align="center"
            />
            <el-table-column
              label="变化点内容"
              prop="unexcepteditem"
              width="80"
              align="center"
            />
            <el-table-column
              label="责任人"
              prop="assigneduserid"
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
          </el-table-column>
          <el-table-column label="突发变化点" align="center">
            <el-table-column
              label="变化数量"
              prop="unexceptednum"
              width="80"
              align="center"
            />
            <el-table-column
              label="变化点内容"
              prop="unexcepteditem"
              width="80"
              align="center"
            />
          </el-table-column>
          <el-table-column
            label="状态"
            prop="status"
            width="80"
            align="center"
          />
          <el-table-column
            label="转办人"
            prop="transferor"
            width="80"
            align="center"
          />
          <el-table-column
            label="被转办人"
            prop="transferredperson"
            width="80"
            align="center"
          />
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="环" name="enviroment">
        <el-table
          v-loading="loading"
          :data="environmentList"
          :span-method="objectSpanMethod"
          border
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column
            label="类别"
            prop="category"
            width="80"
            align="center"
          />
          <el-table-column
            label="变化点内容"
            prop="subcategory"
            width="80"
            align="center"
          />
          <el-table-column
            label="确认项目"
            prop="content"
            width="80"
            align="center"
          />
          <el-table-column
            label="未执行到位产生异常"
            prop="exceptioncontent"
            width="80"
            align="center"
          />
          <el-table-column label="突发变化点" align="center">
            <el-table-column
              label="变化数量"
              prop="unexceptednum"
              width="80"
              align="center"
            />
            <el-table-column
              label="变化点内容"
              prop="unexcepteditem"
              width="80"
              align="center"
            />
            <el-table-column
              label="责任人"
              prop="assigneduserid"
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
          </el-table-column>
          <el-table-column label="突发变化点" align="center">
            <el-table-column
              label="变化数量"
              prop="unexceptednum"
              width="80"
              align="center"
            />
            <el-table-column
              label="变化点内容"
              prop="unexcepteditem"
              width="80"
              align="center"
            />
          </el-table-column>
          <el-table-column
            label="状态"
            prop="status"
            width="80"
            align="center"
          />
          <el-table-column
            label="转办人"
            prop="transferor"
            width="80"
            align="center"
          />
          <el-table-column
            label="被转办人"
            prop="transferredperson"
            width="80"
            align="center"
          />
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="测" name="measure">
        <el-table
          v-loading="loading"
          :data="measureList"
          :span-method="objectSpanMethod"
          border
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column
            label="类别"
            prop="category"
            width="80"
            align="center"
          />
          <el-table-column
            label="变化点内容"
            prop="subcategory"
            width="80"
            align="center"
          />
          <el-table-column
            label="确认项目"
            prop="content"
            width="80"
            align="center"
          />
          <el-table-column
            label="未执行到位产生异常"
            prop="exceptioncontent"
            width="80"
            align="center"
          />
          <el-table-column label="突发变化点" align="center">
            <el-table-column
              label="变化数量"
              prop="unexceptednum"
              width="80"
              align="center"
            />
            <el-table-column
              label="变化点内容"
              prop="unexcepteditem"
              width="80"
              align="center"
            />
            <el-table-column
              label="责任人"
              prop="assigneduserid"
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
          </el-table-column>
          <el-table-column label="突发变化点" align="center">
            <el-table-column
              label="变化数量"
              prop="unexceptednum"
              width="80"
              align="center"
            />
            <el-table-column
              label="变化点内容"
              prop="unexcepteditem"
              width="80"
              align="center"
            />
          </el-table-column>
          <el-table-column
            label="状态"
            prop="status"
            width="80"
            align="center"
          />
          <el-table-column
            label="转办人"
            prop="transferor"
            width="80"
            align="center"
          />
          <el-table-column
            label="被转办人"
            prop="transferredperson"
            width="80"
            align="center"
          />
        </el-table>
      </el-tab-pane>
    </el-tabs>

    <!-- 添加或修改参数配置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="600px" append-to-body>
      <el-form ref="form" :model="form" label-width="80px">
        <el-row :span="24">
          <el-form-item label="taskId" prop="taskId">
            <el-input v-model="form.taskId" disabled />
          </el-form-item>
        </el-row>
        <el-row :span="24">
          <el-form-item label="变化数量" prop="unexceptednum">
            <el-input v-model="form.unexceptednum" type="textarea" />
          </el-form-item>
        </el-row>
        <el-row :span="24">
          <el-form-item label="变化点内容" prop="unexcepteditem">
            <el-input v-model="form.unexcepteditem" type="textarea" />
          </el-form-item>
        </el-row>
        <el-row :span="24">
          <el-form-item label="责任人" prop="assigneduserid">
            <span>{{ form.assigneduserid }}</span>
            <span>{{ form.assignedusername }}</span>
            <el-button @click="openassigneduserdialog" type="primary">选择责任人</el-button>
          </el-form-item>
        </el-row>
        <el-row :span="24">
          <el-form-item label="确认结果" prop="result">
            <el-input v-model="form.result" type="textarea" />
          </el-form-item>
        </el-row>
        <el-row :span="24">
          <el-form-item label="计划确认时间" prop="duedate">
            <el-date-picker
              v-model="form.duedate"
              type="datetime"
              placeholder="选择日期时间"
            >
            </el-date-picker>
          </el-form-item>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 获取人员信息对话框 -->
    <el-dialog
      :title="title1"
      :visible.sync="open1"
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
            @keyup.enter.native="handleQuery1"
          />
        </el-form-item>
        <el-form-item label="用户姓名" prop="userName">
          <el-input
            v-model="queryParams1.userName"
            clearable
            size="small"
            style="width: 100px"
            @keyup.enter.native="handleQuery1"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-search"
            size="mini"
            @click="handleQuery1"
            >搜索</el-button
          >
          <el-button icon="el-icon-refresh" size="mini" @click="resetQuery1"
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
      <el-card header="常用联系人">
      <el-table
        ref="commonUserTable"
        :data="commonUserList"
        highlight-current-row
        @current-change="handleCurrentChange"
        style="width: 100%"
      >
        <el-table-column property="userId" label="工号" >
        </el-table-column>
        <el-table-column property="userName" label="姓名" >
        </el-table-column>
      </el-table>
      </el-card>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm1">确 定</el-button>
        <el-button @click="cancel1">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  updateAssignment,
  createAssignmentList,
  updateAssignmentList,
  assignTask,
} from "@/api/manage/assign";
import { listUserID } from "@/api/manage/common";

export default {
  data() {
    return {
      showSearch: true,
      activeName: "person",
      currentgroup: "person",
      OrderIndexObj: {},
      templateitemsid: "",
      orderId: "",
      flag: false,
      open: false,
      open1: false,
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 弹出层标题
      title: "",
      title1: "",
      list: [],
      categoryArr: [],
      itemsArr: [],
      itemArr: [],
      myexceptionArr: [],
      templist: [],
      manList: [],
      machineList: [],
      materialList: [],
      methodList: [],
      environmentList: [],
      measureList: [],
      areas: [],
      shiftslist: [],
      userList:[],
      commonUserList:[],
      queryParams: {
        area: "",
        date: "",
        shifts: "",
      },
      queryParams1: {
        userId: "",
        userName: "",
      },
      // upload: {
      //   open: false,
      //   title: "",
      //   // 是否禁用上传
      //   isUploading: false,
      //   // 是否更新已经存在的用户数据
      //   updateSupport: 0,
      //   // 设置上传的请求头部
      //   headers: { Authorization: "Bearer " + getToken() },
      //   // 上传的地址
      //   url: process.env.VUE_APP_BASE_API + "/system/user/importData",
      // },
      form: {
        orderId: "",
        taskId: "",
        categorygroup: "",
        category: "",
        subcategory: "",
        content: "",
        exceptioncontent: "",
        unexceptednum: "",
        unexcepteditem: "",
        assigneduserid: "",
        assignedusername: "",
        result: "",
        duedate: "",
        status: "",
        transferor: "",
        transferredperson: "",
      },
      assignList: [],
      loading: true,
      currentRow:{
        userId:'',
        userName:'',
      },
    };
  },
  created() {
    this.getDicts("mng_common_areas").then((response) => {
      this.areas = response.data;
    });
    this.getDicts("mng_common_shifts").then((response) => {
      this.shiftslist = response.data;
    });
  },
  watch: {
    assignList: function (val) {
      this.manList = this.assignList.filter((n) => n.categorygroup == "man");
      this.machineList = this.assignList.filter(
        (n) => n.categorygroup == "machine"
      );
      this.materialList = this.assignList.filter(
        (n) => n.categorygroup == "material"
      );
      this.methodList = this.assignList.filter(
        (n) => n.categorygroup == "method"
      );
      this.environmentList = this.assignList.filter(
        (n) => n.categorygroup == "environment"
      );
      this.measureList = this.assignList.filter(
        (n) => n.categorygroup == "measure"
      );
    },
  },
  methods: {
    handleAssign(row) {
      const assignObject = {
        taskId : row.taskId,
        userId : row.userId,
        userName : row.userName,
      };
      let commonUser = {
        userId : row.userId,
        userName : row.userName,
      };
      let commonUserList = JSON.parse(localStorage.getItem("commonUser"));
      if(commonUserList == null || commonUserList == '')
        commonUserList=[];
      commonUserList.unshift(commonUser);
      if(commonUserList.length > 5)
        commonUserList.slice(0,5);
      this.commonUserList = commonUserList;
      localStorage.setItem("commonUser",JSON.stringify(commonUserList))
      assignTask(assignObject).then(
        this.$message("分派成功！")
      );
    },
    handleCurrentChange(val){
      this.currentRow = val;
    },
    openassigneduserdialog(){
      this.open1 = true;
      this.title1 = "选择责任人";
    },
    getassigneduserid() {
      // listUserID(this.form).then((response) => {});
      this.userList = [{
        userId:'1',
        userName:'Tom',
      },{
        userId:'2',
        userName:'Cat',
      }]
    },
    handleSave() {
      let tasklisttmp = [];
      tasklisttmp.push(this.manList);
      tasklisttmp.push(this.machineList);
      tasklisttmp.push(this.materialList);
      tasklisttmp.push(this.methodList);
      tasklisttmp.push(this.environmentList);
      tasklisttmp.push(this.measureList);
      let assignObject = {
        orderId: this.orderId,
        tasklist: tasklisttmp,
      };
      if (this.orderId == null || this.orderId == "") {
        createAssignmentList(assignObject).then((response) => {});
      } else {
        updateAssignmentList(assignObject).then((response) => {});
      }
      this.getList();
    },
    getOrderNumber() {
      this.OrderIndexObj = {};
      let OrderObj = {};
      this.templist =
        this.currentgroup == "man"
          ? this.manList
          : this.currentgroup == "machine"
          ? this.machineList
          : this.currentgroup == "material"
          ? this.materialList
          : this.currentgroup == "method"
          ? this.methodList
          : this.currentgroup == "environment"
          ? this.environmentList
          : this.currentgroup == "measure"
          ? this.measureList
          : null;
      this.templist.forEach((element, index) => {
        element.rowIndex = index;
        if (OrderObj[element.category]) {
          OrderObj[element.category].push(index);
        } else {
          OrderObj[element.category] = [];
          OrderObj[element.category].push(index);
        }
      });

      for (let k in OrderObj) {
        this.OrderIndexObj[OrderObj[k][0]] = OrderObj[k].length;
      }
    },

    // 合并单元格
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (this.flag == false) {
        this.getList();
        this.flag = true;
      }
      if (columnIndex == 1) {
        if (rowIndex in this.OrderIndexObj) {
          return {
            rowspan: this.OrderIndexObj[rowIndex],
            colspan: 1,
          };
        } else {
          return {
            rowsapn: 0,
            colspan: 0,
          };
        }
      }
      // if (columnIndex == 15) {
      //   if (rowIndex == 0) {
      //     return {
      //       rowspan: this.templist.length,
      //       colspan: 1,
      //     };
      //   } else {
      //     return {
      //       rowspan: 0,
      //       colspan: 0,
      //     };
      //   }
      // }
    },

    // tableRowClassName({ row, rowIndex }) {
    //   let arr = this.hoverOrderArr;
    //   for (let i = 0; i < arr.length; i++) {
    //     if (rowIndex == arr[i]) {
    //       return "hovered-row";
    //     }
    //   }
    // },

    // cellMouseEnter(row, column, cell, event) {
    //   this.rowIndex = row.rowIndex;
    //   this.hoverOrderArr = [];
    //   this.OrderIndexArr.forEach((element) => {
    //     if (element.indexOf(this.rowIndex) >= 0) {
    //       this.hoverOrderArr = element;
    //     }
    //   });
    // },

    // cellMouseLeave(row, column, cell, event) {
    //   this.rowIndex = "-1";
    //   this.hoverOrderArr = [];
    // },
    handleQuery() {
      this.getList();
    },
    handleQuery1() {
      this.getassigneduserid();
    },
    getList() {
      this.loading = true;
      // listAssignment().then((response) => {
      //   this.assignList = response.data.tasklist;
      //   this.templateitemsid =  response.data.templateitemsid;
      //   this.orderId = response.data.orderId;
      //   this.loading = false;
      // });
      this.assignList = [
        {
          taskId: "taskId",
          categorygroup: "man",
          category: "1",
          subcategory: "2",
          content:
            "sjdfhaksjdfhkasj\n dlfkjlsadfkjal\ndasflaldkfjls\nafgafgafgafg",
          exceptioncontent: "4",
          unexceptednum: "",
          unexcepteditem: "",
          assigneduserid: "tom",
          result: "",
          duedate: "",
          status: "",
          transferor: "",
          transferredperson: "",
        },
      ];
      this.templateitemsid = "response.data.templateitemsid";
      this.orderId = "response.data.orderId";
      this.loading = false;
      this.getOrderNumber();
    },
    handleClick(tab, event) {
      this.currentgroup = tab.paneName;
      this.getList();
    },
    /** 修改按钮操作 */
    handleUpdate() {
      this.title = "分配任务";
      this.form.mygrouping = this.currentgroup;
      this.form.category = this.categoryArr[0];
      this.form.items = this.itemsArr[0];
      this.form.item = this.itemArr[0];
      this.form.myexception = this.myexceptionArr[0];
      this.open = true;
    },

    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm("是否确认导出所有用户数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return exportTemplate(queryParams);
        })
        .then((response) => {
          this.download(response.msg);
        })
        .catch(function () {});
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          updateAssignment(this.form).then((response) => {
            this.msgSuccess("修改成功");
            this.open = false;
            this.getList();
          });
        }
      });
    },
    submitForm1: function () {
      this.open1 = false;
      this.form.assigneduserid = this.currentRow.userId;
      this.form.assignedusername = this.currentRow.userName;
    },
    // 取消按钮
    cancel() {
      this.open = false;
    },
    cancel1() {
      this.open1 = false;
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.form.orderId = selection.map((item) => item.orderId);
      this.form.taskId = selection.map((item) => item.taskId);
      this.form.categorygroup = selection.map((item) => item.categorygroup);
      this.form.category = selection.map((item) => item.category);
      this.form.subcategory = selection.map((item) => item.subcategory);
      this.form.content = selection.map((item) => item.content);
      this.form.exceptioncontent = selection.map(
        (item) => item.exceptioncontent
      );
      this.form.unexceptednum = selection.map((item) => item.unexceptednum);
      this.form.unexcepteditem = selection.map((item) => item.unexcepteditem);
      this.form.assigneduserid = selection.map((item) => item.assigneduserid);
      this.form.result = selection.map((item) => item.result);
      this.form.duedate = selection.map((item) => item.duedate);
      this.form.status = selection.map((item) => item.status);
      this.form.transferor = selection.map((item) => item.transferor);
      this.form.transferredperson = selection.map(
        (item) => item.transferredperson
      );
      // this.categoryArr = selection.map((item) => item.category);
      // this.itemsArr = selection.map((item) => item.items);
      // this.itemArr = selection.map((item) => item.item);
      // this.myexceptionArr = selection.map((item) => item.myexception);
      console.log("taskid" + this.form.taskId);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    // /** 导入按钮操作 */
    // handleImport() {
    //   this.upload.title = "用户导入";
    //   this.upload.open = true;
    // },
    // /** 下载模板操作 */
    // importTemplate() {
    //   importTemplate().then((response) => {
    //     this.download(response.msg);
    //   });
    // },
    // // 文件上传中处理
    // handleFileUploadProgress(event, file, fileList) {
    //   this.upload.isUploading = true;
    // },
    // // 文件上传成功处理
    // handleFileSuccess(response, file, fileList) {
    //   this.upload.open = false;
    //   this.upload.isUploading = false;
    //   this.$refs.upload.clearFiles();
    //   this.$alert(response.msg, "导入结果", { dangerouslyUseHTMLString: true });
    //   this.getList();
    // },
    // // 提交上传文件
    // submitFileForm() {
    //   this.$refs.upload.submit();
    // },
  },
};
</script>
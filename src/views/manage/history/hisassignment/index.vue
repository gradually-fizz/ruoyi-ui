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
          placeholder="区域"
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
      <el-form-item label="班别" prop="shiftid">
        <el-select
          v-model="queryParams.shiftid"
          placeholder="班别"
          clearable
          size="small"
          style="width: 240px"
        >
          <el-option
            v-for="dict in shifts"
            :key="dict.dictCode"
            :label="dict.dictLabel"
            :value="dict.dictCode"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="创建人" prop="userid">
        <el-input
          v-model="queryParams.userid"
          placeholder="创建人"
          clearable
          size="small"
          style="width: 240px"
        >
          <el-button slot="append" icon="el-icon-search" @click="showUserIdDialog"></el-button>
        </el-input>
      </el-form-item>
      <el-form-item label="创建日期" prop="formDate">
        <el-date-picker
          v-model="queryParams.formDate"
          type="date"
          value-format="yyyy-MM-dd"
          format="yyyy-MM-dd"
          placeholder="选择日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select
          v-model="queryParams.status"
          placeholder="状态"
          clearable
          size="small"
          style="width: 240px"
        >
          <el-option
            v-for="dict in statuses"
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
    <el-row>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:role:export']"
          >导出</el-button
        >
      </el-col>
    </el-row>
    <el-row />
    <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
      <el-tab-pane label="历史任务" name="person">
        <el-table
          v-loading="loading"
          :data="personList"
          :span-method="objectSpanMethod"
          border
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column label="类别" prop="category" width="80" />
          <el-table-column label="变化点内容" prop="items" width="80" />
          <el-table-column label="确认项目" prop="item" width="80" />
          <el-table-column
            label="未执行到位产生异常"
            prop="myexception"
            width="80"
          />
          <el-table-column label="已识别变化点">
            <el-table-column label="变化数量" prop="recognizedNum" width="80" />
            <el-table-column
              label="变化点内容"
              prop="recognizedItem"
              width="80"
            />
            <el-table-column label="责任人" prop="responsible" width="80" />
            <el-table-column label="确认结果" prop="result" width="80" />
            <el-table-column label="计划确认时间" prop="acktime" width="80" />
          </el-table-column>
          <el-table-column label="突发变化点">
            <el-table-column label="变化数量" prop="unexceptednum" width="80" />
            <el-table-column
              label="变化点内容"
              prop="unexcepteditem"
              width="80"
            />
          </el-table-column>
          <el-table-column
            label="创建追踪事项"
            prop="creatematter"
            width="80"
          />
          <el-table-column label="早会总结" prop="summary" width="120" />
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="转办记录" name="equipment">
        <el-table
          v-loading="loading"
          :data="equipmentList"
          :span-method="objectSpanMethod"
          border
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column label="类别" prop="category" width="80" />
          <el-table-column label="变化点内容" prop="items" width="80" />
          <el-table-column label="确认项目" prop="item" width="80" />
          <el-table-column
            label="未执行到位产生异常"
            prop="myexception"
            width="80"
          />
          <el-table-column label="已识别变化点">
            <el-table-column label="变化数量" prop="recognizedNum" width="80" />
            <el-table-column
              label="变化点内容"
              prop="recognizedItem"
              width="80"
            />
            <el-table-column label="责任人" prop="responsible" width="80" />
            <el-table-column label="确认结果" prop="result" width="80" />
            <el-table-column label="计划确认时间" prop="acktime" width="80" />
          </el-table-column>
          <el-table-column label="突发变化点">
            <el-table-column label="变化数量" prop="unexceptednum" width="80" />
            <el-table-column
              label="变化点内容"
              prop="unexcepteditem"
              width="80"
            />
          </el-table-column>
          <el-table-column
            label="创建追踪事项"
            prop="creatematter"
            width="80"
          />
          <el-table-column label="早会总结" prop="summary" width="120" />
        </el-table>
      </el-tab-pane>
    </el-tabs>
    
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
            v-model="queryParams2.userId"
            clearable
            size="small"
            style="width: 100px"
            @keyup.enter.native="handleQuery2"
          />
        </el-form-item>
        <el-form-item label="用户姓名" prop="userName">
          <el-input
            v-model="queryParams2.userName"
            clearable
            size="small"
            style="width: 100px"
            @keyup.enter.native="handleQuery2"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-search"
            size="mini"
            @click="handleQuery2"
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
        <el-button type="primary" @click="submitForm1">确 定</el-button>
        <el-button @click="cancel1">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  getTemplateAll,
  exportTemplate,
  updateTemplate,
  importTemplate,
} from "@/api/manage/template";
import { listUserID } from "@/api/manage/common";

export default {
  data() {
    return {
      currentRow:{
        userId:'',
        userName:'',
      },
      showSearch: true,
      activeName: "person",
      currentgroup: "person",
      OrderIndexObj: {},
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
      areas: [],
      shifts: [],
      statuses: [],
      categoryArr: [],
      itemsArr: [],
      itemArr: [],
      myexceptionArr: [],
      userList:[],
      templist: [],
      personList: [],
      equipmentList: [],
      materialList: [],
      methodList: [],
      enviromentList: [],
      queryParams: {
        areaid: "",
        shiftid: "",
        status: "",
        formDate: "",
        userid: "",
      },
      queryParams1: {
        pageNum: 1,
        pageSize: 10,
        mygrouping: null,
        category: null,
        items: null,
        item: null,
        myexception: null,
        recognizednum: null,
        recognizeditem: null,
        responsible: null,
        result: null,
        acktime: null,
        unexceptednum: null,
        unexcepteditem: null,
        creatematter: null,
        summary: null,
      },
      queryParams2:{
        userId:'',
        userName:'',
      },
      form: {
        mygrouping: "",
        category: "",
        items: "",
        item: "",
        myexception: "",
      },
      templateList: [],
      loading: true,
    };
  },
  created() {
    this.getDicts("mng_common_areas").then((response) => {
      this.areas = response.data;
    });
    this.getDicts("mng_common_shifts").then((response) => {
      this.shifts = response.data;
    });
    this.getDicts("mng_job_status").then((response) => {
      this.statuses = response.data;
    });
    //this.getList();
  },
  // mounted() {
  //   this.getOrderNumber();
  // },
  watch: {
    templateList: function (val) {
      this.personList = this.templateList.filter(
        (n) => n.mygrouping == "person"
      );
      this.equipmentList = this.templateList.filter(
        (n) => n.mygrouping == "equipment"
      );
      this.materialList = this.templateList.filter(
        (n) => n.mygrouping == "material"
      );
      this.methodList = this.templateList.filter(
        (n) => n.mygrouping == "method"
      );
      this.environmentList = this.templateList.filter(
        (n) => n.mygrouping == "environment"
      );
    },
  },
  methods: {

    handleCurrentChange(val){
      this.currentRow = val;
    },
    // 批量获取用户id
    handleQuery2() {
      this.getuserid();
    },
    showUserIdDialog(){
      this.open1 = true;
      this.title1 = '检索用户';
    },
    getuserid() {
      // listUserID(this.form).then((response) => {});
      this.userList = [{
        userId:'1',
        userName:'Tom',
      },{
        userId:'2',
        userName:'Cat',
      }]
    },
    submitForm1: function () {
      this.open1 = false;
      this.queryParams.userid = this.currentRow.userId;
    },
    cancel1() {
      this.open1 = false;
    },
    getOrderNumber() {
      this.OrderIndexObj = {};
      let OrderObj = {};
      this.templist =
        this.currentgroup == "person"
          ? this.personList
          : this.currentgroup == "equipment"
          ? this.equipmentList
          : this.currentgroup == "material"
          ? this.materialList
          : this.currentgroup == "method"
          ? this.methodList
          : this.currentgroup == "environment"
          ? this.environmentList
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
      if (columnIndex == 13) {
        if (rowIndex == 0) {
          return {
            rowspan: this.templist.length,
            colspan: 1,
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0,
          };
        }
      }
    },

    getList() {
      this.loading = true;
      getTemplateAll().then((Response) => {
        this.templateList = Response;
        this.loading = false;
      });
      this.getOrderNumber();
    },
    handleClick(tab, event) {
      this.currentgroup = tab.paneName;
      this.getList();
    },
    /** 修改按钮操作 */
    handleUpdate() {
      this.title = "修改模板";
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
          updateTemplate(this.form).then((response) => {
            this.msgSuccess("修改成功");
            this.open = false;
            this.getList();
          });
        }
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.categoryArr = selection.map((item) => item.category);
      this.itemsArr = selection.map((item) => item.items);
      this.itemArr = selection.map((item) => item.item);
      this.myexceptionArr = selection.map((item) => item.myexception);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
  },
};
</script>
<template>
  <div class="app-container">
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['system:role:edit']"
          >修改</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="info"
          plain
          icon="el-icon-upload2"
          size="mini"
          @click="handleImport"
          v-hasPermi="['system:user:import']"
          >导入</el-button
        >
      </el-col>
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

    <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
      <el-tab-pane label="人" name="person">
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
      <el-tab-pane label="机" name="equipment">
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
      <el-tab-pane label="料" name="material">
        <el-table
          v-loading="loading"
          :data="materialList"
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
      <el-tab-pane label="法" name="method">
        <el-table
          v-loading="loading"
          :data="methodList"
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
      <el-tab-pane label="环" name="enviroment">
        <el-table
          v-loading="loading"
          :data="environmentList"
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

    <!-- 添加或修改参数配置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="600px" append-to-body>
      <el-form ref="form" :model="form" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="5M1E" prop="mygrouping">
              <el-input v-model="form.mygrouping" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="类别" prop="category">
              <el-input v-model="form.category" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="变化点内容" prop="items">
              <el-input v-model="form.items" type="textarea" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="24">
          <el-form-item label="确认项目" prop="item">
            <el-input v-model="form.item" type="textarea" />
          </el-form-item>
        </el-row>
        <el-row :span="24">
          <el-form-item label="未执行到位产生异常" prop="myexception">
            <el-input v-model="form.myexception" type="textarea" />
          </el-form-item>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 用户导入对话框
    <el-dialog :title="upload.title" :visible.sync="upload.open" width="400px">
      <el-upload
        ref="upload"
        :limit="1"
        accept=".xlsx, .xls"
        :headers="upload.headers"
        :action="upload.url + '?updateSupport=' + upload.updateSupport"
        :disabled="upload.isUploading"
        :on-progress="handleFileUploadProgress"
        :on-success="handleFileSuccess"
        :auto-upload="false"
        drag
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">
          <el-checkbox
            v-model="upload.updateSupport"
          />是否更新已经存在的用户数据
          <el-link type="info" style="font-size: 12px" @click="importTemplate"
            >下载模板</el-link
          >
        </div>
        <div class="el-upload__tip" style="color: red" slot="tip">
          提示：仅允许导入“xls”或“xlsx”格式文件！
        </div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFileForm">确 定</el-button>
        <el-button @click="upload.open = false">取 消</el-button>
      </div>
    </el-dialog> -->
  </div>
</template>
<script>
import {
  getTemplateAll,
  exportTemplate,
  updateTemplate,
  importTemplate,
} from "@/api/manage/template";

export default {
  data() {
    return {
      activeName: "person",
      currentgroup: "person",
      OrderIndexObj: {},
      flag: false,
      open: false,
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 弹出层标题
      title: "",
      list: [],
      categoryArr: [],
      itemsArr: [],
      itemArr: [],
      myexceptionArr: [],
      templist: [],
      personList: [],
      equipmentList: [],
      materialList: [],
      methodList: [],
      enviromentList: [],
      queryParams: {
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
    this.getList();
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
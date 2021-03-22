<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      v-show="showSearch"
      :inline="true"
    >
    <el-form-item>
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
                :key="dict.dictValue"
                :label="dict.dictLabel"
                :value="dict.dictValue"
              />
            </el-select>
          </el-form-item>
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
      <el-tab-pane label="人" name="man">
        <el-table
          v-loading="loading"
          :data="manList"
          :span-method="objectSpanMethod"
          border
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column label="类别" prop="category" width="80" />
          <el-table-column label="变化点内容" prop="subcategory" width="80" />
          <el-table-column label="确认项目" prop="content" width="80" />
          <el-table-column
            label="未执行到位产生异常"
            prop="exceptioncontent"
            width="80"
          />
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
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column label="类别" prop="category" width="80" />
          <el-table-column label="变化点内容" prop="subcategory" width="80" />
          <el-table-column label="确认项目" prop="content" width="80" />
          <el-table-column
            label="未执行到位产生异常"
            prop="exceptioncontent"
            width="80"
          />
        </el-table>
         <!-- <grouptemplate :loading="loading" :list="machineList" 
         :objectSpanMethod="objectSpanMethod" :handleSelectionChange="handleSelectionChange"
         /> -->
      </el-tab-pane>
      <el-tab-pane label="料" name="material">
        <!-- <grouptemplate :list="materialList" :objectSpanMethod="objectSpanMethod"/> -->
        <el-table
          v-loading="loading"
          :data="materialList"
          :span-method="objectSpanMethod"
          border
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column label="类别" prop="category" width="80" />
          <el-table-column label="变化点内容" prop="subcategory" width="80" />
          <el-table-column label="确认项目" prop="content" width="80" />
          <el-table-column
            label="未执行到位产生异常"
            prop="exceptioncontent"
            width="80"
          />
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="法" name="method">
        <!-- <grouptemplate :list="methodList" :objectSpanMethod="objectSpanMethod"/> -->
        <el-table
          v-loading="loading"
          :data="methodList"
          :span-method="objectSpanMethod"
          border
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column label="类别" prop="category" width="80" />
          <el-table-column label="变化点内容" prop="subcategory" width="80" />
          <el-table-column label="确认项目" prop="content" width="80" />
          <el-table-column
            label="未执行到位产生异常"
            prop="exceptioncontent"
            width="80"
          />
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="环" name="enviroment">
        <!-- <grouptemplate :list="enviromentList" :objectSpanMethod="objectSpanMethod"/> -->
        <el-table
          v-loading="loading"
          :data="enviromentList"
          :span-method="objectSpanMethod"
          border
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column label="类别" prop="category" width="80" />
          <el-table-column label="变化点内容" prop="subcategory" width="80" />
          <el-table-column label="确认项目" prop="content" width="80" />
          <el-table-column
            label="未执行到位产生异常"
            prop="exceptioncontent"
            width="80"
          />
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="测" name="measure">
        <!-- <grouptemplate :list="measureList" :objectSpanMethod="objectSpanMethod"/> -->
        <el-table
          v-loading="loading"
          :data="measureList"
          :span-method="objectSpanMethod"
          border
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column label="类别" prop="category" width="80" />
          <el-table-column label="变化点内容" prop="subcategory" width="80" />
          <el-table-column label="确认项目" prop="content" width="80" />
          <el-table-column
            label="未执行到位产生异常"
            prop="exceptioncontent"
            width="80"
          />
        </el-table>
      </el-tab-pane>
    </el-tabs>

    <!-- 添加或修改参数配置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="600px" append-to-body>
      <el-form ref="form" :model="form" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="5M1E" prop="categorygroup">
              <el-input v-model="form.categorygroup" />
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
            <el-form-item label="变化点内容" prop="subcategory">
              <el-input v-model="form.subcategory" type="textarea" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="24">
          <el-form-item label="确认项目" prop="content">
            <el-input v-model="form.content" type="textarea" />
          </el-form-item>
        </el-row>
        <el-row :span="24">
          <el-form-item label="未执行到位产生异常" prop="exceptioncontent">
            <el-input v-model="form.exceptioncontent" type="textarea" />
          </el-form-item>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 用户导入对话框-->
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
    </el-dialog> 
  </div>
</template>
<script>
import {
  getTemplateAll,
  exportTemplate,
  updateTemplate,
  importTemplate,
  listTemplate,
} from "@/api/manage/template";
import { listAreaID } from "@/api/manage/common";
import grouptemplate from "./components/grouptemplate.vue";
import { getToken } from "@/utils/auth";

export default {
  components: { grouptemplate },
  data() {
    return {
      showSearch: true,
      activeName: "man",
      currentgroup: "man",
      OrderIndexObj: {},
      flag: false,
      open: false,
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 弹出层标题
      title: "",
      areas:[{
        dictValue:"cut",
        dictLabel:"切割",
      }],
      list: [],
      categoryArr: [],
      subcategoryArr: [],
      contentArr: [],
      exceptioncontentArr: [],
      templist: [],
      manList: [],
      machineList: [],
      materialList: [],
      methodList: [],
      enviromentList: [],
      queryParams: {
        areaid:'cut',
      },
      // 用户导入参数
      upload: {
        // 是否显示弹出层（用户导入）
        open: false,
        // 弹出层标题（用户导入）
        title: "",
        // 是否禁用上传
        isUploading: false,
        // 是否更新已经存在的用户数据
        updateSupport: 0,
        // 设置上传的请求头部
        headers: { Authorization: "Bearer " + getToken() },
        // 上传的地址
        url: process.env.VUE_APP_BASE_API + "/manage/template/importData"
      },
      form: {
        categorygroup: "",
        category: "",
        subcategory: "",
        content: "",
        exceptioncontent: "",
      },
      templateList: [],
      loading: true,
    };
  },
  created() {
    this.getList();
    this.getDicts("mng_common_areas").then(response => {
      this.areas = response.data;
    });
  },
  mounted() {
  },
  watch: {
    templateList: function (val) {
      this.manList = this.templateList.filter(
        (n) => n.categorygroup == "man"
      );
      this.machineList = this.templateList.filter(
        (n) => n.categorygroup == "machine"
      );
      this.materialList = this.templateList.filter(
        (n) => n.categorygroup == "material"
      );
      this.methodList = this.templateList.filter(
        (n) => n.categorygroup == "method"
      );
      this.environmentList = this.templateList.filter(
        (n) => n.categorygroup == "environment"
      );
      this.measureList = this.templateList.filter(
        (n) => n.categorygroup == "measure"
      );
    },
  },
  methods: {
     /** 搜索按钮操作 */
    handleQuery() {
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.queryParams.areaid = ''
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
      listTemplate(this.queryParams).then(response => {
        console.log(response);
        this.templateList = response.rows;
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
      this.form.categorygroup = this.currentgroup;
      this.form.category = this.categoryArr[0];
      this.form.subcategory = this.subcategoryArr[0];
      this.form.content = this.contentArr[0];
      this.form.exceptioncontent = this.exceptioncontentArr[0];
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
      this.subcategoryArr = selection.map((item) => item.subcategory);
      this.contentArr = selection.map((item) => item.content);
      this.exceptioncontentArr = selection.map((item) => item.exceptioncontent);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    /** 导入按钮操作 */
    handleImport() {
      this.upload.title = "用户导入";
      this.upload.open = true;
    },
    /** 下载模板操作 */
    importTemplate() {
      importTemplate().then((response) => {
        this.download(response.msg);
      });
    },
    // 文件上传中处理
    handleFileUploadProgress(event, file, fileList) {
      this.upload.isUploading = true;
    },
    // 文件上传成功处理
    handleFileSuccess(response, file, fileList) {
      this.upload.open = false;
      this.upload.isUploading = false;
      this.$refs.upload.clearFiles();
      this.$alert(response.msg, "导入结果", { dangerouslyUseHTMLString: true });
      this.getList();
    },
    // 提交上传文件
    submitFileForm() {
      this.$refs.upload.submit();
    },
  },
};
</script>
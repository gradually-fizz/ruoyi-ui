<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="分组" prop="group">
        <el-input
          v-model="queryParams.group"
          placeholder="请输入分组"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="类别" prop="category">
        <el-input
          v-model="queryParams.category"
          placeholder="请输入类别"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="变化点内容" prop="items">
        <el-input
          v-model="queryParams.items"
          placeholder="请输入变化点内容"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="确认项目" prop="item">
        <el-input
          v-model="queryParams.item"
          placeholder="请输入确认项目"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="未执行到位产生异常" prop="exception">
        <el-input
          v-model="queryParams.exception"
          placeholder="请输入未执行到位产生异常"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="已识别变化点数量" prop="recognizednum">
        <el-input
          v-model="queryParams.recognizednum"
          placeholder="请输入已识别变化点数量"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="已识别变化点内容" prop="recognizeditem">
        <el-input
          v-model="queryParams.recognizeditem"
          placeholder="请输入已识别变化点内容"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="责任人" prop="responsible">
        <el-input
          v-model="queryParams.responsible"
          placeholder="请输入责任人"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="确认结果" prop="result">
        <el-input
          v-model="queryParams.result"
          placeholder="请输入确认结果"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="计划确认时间" prop="time">
        <el-input
          v-model="queryParams.time"
          placeholder="请输入计划确认时间"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="突发变化点数量" prop="unexceptednum">
        <el-input
          v-model="queryParams.unexceptednum"
          placeholder="请输入突发变化点数量"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="突发变化点内容" prop="unexcepteditem">
        <el-input
          v-model="queryParams.unexcepteditem"
          placeholder="请输入突发变化点内容"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="创建追踪事项" prop="create">
        <el-input
          v-model="queryParams.create"
          placeholder="请输入创建追踪事项"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="早会总结" prop="summary">
        <el-input
          v-model="queryParams.summary"
          placeholder="请输入早会总结"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['manage:template:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['manage:template:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['manage:template:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['manage:template:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="templateList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="分组" align="center" prop="group" />
      <el-table-column label="类别" align="center" prop="category" />
      <el-table-column label="变化点内容" align="center" prop="items" />
      <el-table-column label="确认项目" align="center" prop="item" />
      <el-table-column label="未执行到位产生异常" align="center" prop="exception" />
      <el-table-column label="已识别变化点数量" align="center" prop="recognizednum" />
      <el-table-column label="已识别变化点内容" align="center" prop="recognizeditem" />
      <el-table-column label="责任人" align="center" prop="responsible" />
      <el-table-column label="确认结果" align="center" prop="result" />
      <el-table-column label="计划确认时间" align="center" prop="time" />
      <el-table-column label="突发变化点数量" align="center" prop="unexceptednum" />
      <el-table-column label="突发变化点内容" align="center" prop="unexcepteditem" />
      <el-table-column label="创建追踪事项" align="center" prop="create" />
      <el-table-column label="早会总结" align="center" prop="summary" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['manage:template:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['manage:template:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改变化点模板对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="分组" prop="group">
          <el-input v-model="form.group" placeholder="请输入分组" />
        </el-form-item>
        <el-form-item label="类别" prop="category">
          <el-input v-model="form.category" placeholder="请输入类别" />
        </el-form-item>
        <el-form-item label="变化点内容" prop="items">
          <el-input v-model="form.items" placeholder="请输入变化点内容" />
        </el-form-item>
        <el-form-item label="确认项目" prop="item">
          <el-input v-model="form.item" placeholder="请输入确认项目" />
        </el-form-item>
        <el-form-item label="未执行到位产生异常" prop="exception">
          <el-input v-model="form.exception" placeholder="请输入未执行到位产生异常" />
        </el-form-item>
        <el-form-item label="已识别变化点数量" prop="recognizednum">
          <el-input v-model="form.recognizednum" placeholder="请输入已识别变化点数量" />
        </el-form-item>
        <el-form-item label="已识别变化点内容" prop="recognizeditem">
          <el-input v-model="form.recognizeditem" placeholder="请输入已识别变化点内容" />
        </el-form-item>
        <el-form-item label="责任人" prop="responsible">
          <el-input v-model="form.responsible" placeholder="请输入责任人" />
        </el-form-item>
        <el-form-item label="确认结果" prop="result">
          <el-input v-model="form.result" placeholder="请输入确认结果" />
        </el-form-item>
        <el-form-item label="计划确认时间" prop="time">
          <el-input v-model="form.time" placeholder="请输入计划确认时间" />
        </el-form-item>
        <el-form-item label="突发变化点数量" prop="unexceptednum">
          <el-input v-model="form.unexceptednum" placeholder="请输入突发变化点数量" />
        </el-form-item>
        <el-form-item label="突发变化点内容" prop="unexcepteditem">
          <el-input v-model="form.unexcepteditem" placeholder="请输入突发变化点内容" />
        </el-form-item>
        <el-form-item label="创建追踪事项" prop="create">
          <el-input v-model="form.create" placeholder="请输入创建追踪事项" />
        </el-form-item>
        <el-form-item label="早会总结" prop="summary">
          <el-input v-model="form.summary" placeholder="请输入早会总结" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listTemplate, getTemplate, delTemplate, addTemplate, updateTemplate, exportTemplate } from "@/api/manage/template";

export default {
  name: "Template",
  components: {
  },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 变化点模板表格数据
      templateList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        group: null,
        category: null,
        items: null,
        item: null,
        exception: null,
        recognizednum: null,
        recognizeditem: null,
        responsible: null,
        result: null,
        time: null,
        unexceptednum: null,
        unexcepteditem: null,
        create: null,
        summary: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        group: [
          { required: true, message: "分组不能为空", trigger: "blur" }
        ],
        category: [
          { required: true, message: "类别不能为空", trigger: "blur" }
        ],
        items: [
          { required: true, message: "变化点内容不能为空", trigger: "blur" }
        ],
        item: [
          { required: true, message: "确认项目不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询变化点模板列表 */
    getList() {
      this.loading = true;
      listTemplate(this.queryParams).then(response => {
        this.templateList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        group: null,
        category: null,
        items: null,
        item: null,
        exception: null,
        recognizednum: null,
        recognizeditem: null,
        responsible: null,
        result: null,
        time: null,
        unexceptednum: null,
        unexcepteditem: null,
        create: null,
        summary: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        remark: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.group)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加变化点模板";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const group = row.group || this.ids
      getTemplate(group).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改变化点模板";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.group != null) {
            updateTemplate(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addTemplate(this.form).then(response => {
              this.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const groups = row.group || this.ids;
      this.$confirm('是否确认删除变化点模板编号为"' + groups + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delTemplate(groups);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有变化点模板数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportTemplate(queryParams);
        }).then(response => {
          this.download(response.msg);
        })
    }
  }
};
</script>

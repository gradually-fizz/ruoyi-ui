<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      v-show="showSearch"
      :inline="true"
    >
      <el-form-item label="日期" prop="date">
        <el-input
          v-model="queryParams.date"
          placeholder="日期"
          clearable
          size="small"
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="早晚班" prop="shift">
        <el-input
          v-model="queryParams.shift"
          placeholder="早晚班"
          clearable
          size="small"
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="线体" prop="line">
        <el-input
          v-model="queryParams.line"
          placeholder="线体"
          clearable
          size="small"
          style="width: 240px"
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

    <el-row :gutter="10" class="mb8">
      <right-toolbar
        :showSearch.sync="showSearch"
        @queryTable="getList"
      ></right-toolbar>
    </el-row>

    <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
      <el-tab-pane label="人" name="person">
        <el-table
          v-loading="loading"
          :data="personList"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column label="类别" prop="category" width="120" />
          <el-table-column label="变化点内容" prop="items" width="120" />
          <el-table-column label="确认项目" prop="item" width="120" />
          <el-table-column
            label="未执行到位产生异常"
            prop="exception"
            width="120"
          />
          <el-table-column label="已识别变化点">
            <el-table-column
              label="变化数量"
              prop="recognizedNum"
              width="120"
            />
            <el-table-column
              label="变化点内容"
              prop="recognizedItem"
              width="120"
            />
            <el-table-column label="责任人" prop="responsible" width="120" />
            <el-table-column label="确认结果" prop="result" width="120" />
            <el-table-column label="计划确认时间" prop="time" width="120" />
          </el-table-column>
          <el-table-column label="突发变化点">
            <el-table-column
              label="变化数量"
              prop="unexceptedNum"
              width="120"
            />
            <el-table-column
              label="变化点内容"
              prop="unexceptedItem"
              width="120"
            />
          </el-table-column>
          <el-table-column label="创建追踪事项" prop="create" width="120" />
          <el-table-column label="早会总结" prop="summary" width="120" />
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="机" name="equipment">机</el-tab-pane>
      <el-tab-pane label="料" name="material">料</el-tab-pane>
      <el-tab-pane label="法" name="method">法</el-tab-pane>
      <el-tab-pane label="环" name="enviroment">环</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: "person",
      queryParams: {
        date: "",
        shift: "",
        line: "",
      },
      showSearch: true,
      personList: [
        {
          category: "正常培训",
          items: "新人上岗",
          item:
            "● 上岗资质\n" +
            "● 作业流程及标准（型号作业顺序及要点）掌握\n" +
            "● 对应岗位异常反馈标准及反馈方式明确\n" +
            "● 分配老员工结组搭配作业\n" +
            "● 上岗后的状态（作业观察表五大内容、产能）",
          exception:
            "若不遵守要求：\n" +
            "☆则会由于异常不反馈、作业的失误、自作主张地作业，而导致工序遗漏、不良流出。",
          recognizedNum: "",
          recognizedItem: "",
          responsible: "",
          result: "",
          time: "",
          unexceptedNum: "",
          summary: "",
        },
        {},
      ],
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>
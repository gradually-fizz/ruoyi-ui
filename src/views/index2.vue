<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      v-show="showSearch"
      :inline="true"
    >
      <el-form-item label="线体" prop="line">
        <el-input
          v-model="queryParams.date"
          placeholder="线体"
          clearable
          size="small"
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="区域" prop="area">
        <el-input
          v-model="queryParams.shift"
          placeholder="区域"
          clearable
          size="small"
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="日期" prop="date">
        <el-input
          v-model="queryParams.line"
          placeholder="日期"
          clearable
          size="small"
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="班别" prop="shift">
        <el-input
          v-model="queryParams.line"
          placeholder="班别"
          clearable
          size="small"
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="当前状态" prop="state">
        <el-input
          v-model="queryParams.line"
          placeholder="当前状态"
          clearable
          size="small"
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="分组" prop="mygrouping">
        <el-input
          v-model="queryParams.line"
          placeholder="分组"
          clearable
          size="small"
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="分配人" prop="distribute">
        <el-input
          v-model="queryParams.line"
          placeholder="分配人"
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
      <el-tab-pane label="当前任务" name="curAssignment" v-show="false">
        <el-table
          v-loading="loading"
          :data="personList"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column label="线体" prop="line" width="120" align="center"/>
          <el-table-column label="区域" prop="area" width="120" align="center"/>
          <el-table-column label="分组" prop="mygrouping" width="120" align="center"/>
          <el-table-column label="类别" prop="category" width="120" align="center"/>
          <el-table-column label="变化点内容" prop="items" width="120" align="center"/>
          <el-table-column label="确认项目" prop="item" width="120" align="center"/>
          <el-table-column
            label="未执行到位产生异常"
            prop="myexception"
            width="120"
            align="center"
          />
          <el-table-column label="已识别变化点" align="center">
            <el-table-column
              label="变化数量"
              prop="recognizednum"
              width="120"
              align="center"
            />
            <el-table-column
              label="变化点内容"
              prop="recognizeditem"
              width="120"
              align="center"
            />
          </el-table-column>
          <el-table-column label="突发变化点" align="center">
            <el-table-column
              label="变化数量"
              prop="unexceptedNum"
              width="120"
              align="center"
            />
            <el-table-column
              label="变化点内容"
              prop="unexceptedItem"
              width="120"
              align="center"
            />
          </el-table-column>
          <el-table-column label="分配人" prop="distributee" width="120" align="center"/>
          <el-table-column label="分配时间" prop="distributetime" width="120" align="center"/>
          <el-table-column label="截至时间" prop="deadtime" width="120" align="center"/>
          <el-table-column label="状态" prop="state" width="120" align="center"/>
          <el-table-column label="转办人" prop="transferor" width="120" align="center"/>
           <el-table-column
            label="操作"
            align="center"
            width="160"
            class-name="small-padding fixed-width"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                icon="el-icon-finished"
                @click="handleUpdate(scope.row)"
                v-hasPermi="['system:user:edit']"
              >提交</el-button>
              <el-button
                v-if="scope.row.userId !== 1"
                size="mini"
                type="text"
                icon="el-icon-share"
                @click="handleDelete(scope.row)"
                v-hasPermi="['system:user:remove']"
              >转办</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="历史任务" name="hisAssignment">
        <el-table
          v-loading="loading"
          :data="personList"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column label="线体" prop="line" width="120" align="center"/>
          <el-table-column label="区域" prop="area" width="120" align="center"/>
          <el-table-column label="分组" prop="mygrouping" width="120" align="center"/>
          <el-table-column label="类别" prop="category" width="120" align="center" />
          <el-table-column label="变化点内容" prop="items" width="120" align="center" />
          <el-table-column label="确认项目" prop="item" width="120"  align="center"/>
          <el-table-column
            label="未执行到位产生异常"
            prop="myexception"
            width="120"
            align="center"
          />
          <el-table-column label="已识别变化点" align="center">
            <el-table-column
              label="变化数量"
              prop="recognizednum"
              width="120"
              align="center"
            />
            <el-table-column
              label="变化点内容"
              prop="recognizeditem"
              width="120"
              align="center"
            />
          </el-table-column>
          <el-table-column label="突发变化点" align="center">
            <el-table-column
              label="变化数量"
              prop="unexceptedNum"
              width="120"
              align="center"
            />
            <el-table-column
              label="变化点内容"
              prop="unexceptedItem"
              width="120"
              align="center"
            />
          </el-table-column>
          <el-table-column label="分配人" prop="distributee" width="120" align="center"/>
          <el-table-column label="分配时间" prop="distributetime" width="120" align="center"/>
          <el-table-column label="截至时间" prop="deadtime" width="120" align="center"/>
          <el-table-column label="状态" prop="state" width="120" align="center"/>
          <el-table-column label="转办人" prop="transferor" width="120" align="center"/>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="转办记录" name="hisTransfer">
        <el-table
          v-loading="loading"
          :data="personList"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column label="线体" prop="line" width="120" align="center"/>
          <el-table-column label="区域" prop="area" width="120" align="center"/>
          <el-table-column label="分组" prop="mygrouping" width="120" align="center"/>
          <el-table-column label="类别" prop="category" width="120" align="center" />
          <el-table-column label="变化点内容" prop="items" width="120" align="center"/>
          <el-table-column label="确认项目" prop="item" width="120" align="center"/>
          <el-table-column
            label="未执行到位产生异常"
            prop="myexception"
            width="120"
            align="center"
          />
          <el-table-column label="已识别变化点" align="center">
            <el-table-column
              label="变化数量"
              prop="recognizednum"
              width="120"
              align="center"
            />
            <el-table-column
              label="变化点内容"
              prop="recognizeditem"
              width="120"
              align="center"
            />
          </el-table-column>
          <el-table-column label="突发变化点" align="center">
            <el-table-column
              label="变化数量"
              prop="unexceptedNum"
              width="120"
              align="center"
            />
            <el-table-column
              label="变化点内容"
              prop="unexceptedItem"
              width="120"
              align="center"
            />
          </el-table-column>
          <el-table-column label="分配人" prop="distributee" width="120" align="center"/>
          <el-table-column label="分配时间" prop="distributetime" width="120" align="center"/>
          <el-table-column label="截至时间" prop="deadtime" width="120" align="center"/>
          <el-table-column label="状态" prop="state" width="120" align="center"/>
          <el-table-column label="转办人" prop="transferor" width="120" align="center"/>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: "curAssignment",
      queryParams: {
        date: "",
        shift: "",
        line: "",
      },
      showSearch: true,
      personList: [
        {
          line:"11",
          area:"切割",
          mygrouping:"人",
          category: "正常培训",
          items: "新人上岗",
          item: "● 上岗资质\n",
          myexception: "若不遵守要求：\n",
          recognizednum: "",
          recognizeditem: "",
          responsible: "",
          result: "",
          acktime: "",
          unexceptedNum: "",
          summary: "",
        },
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
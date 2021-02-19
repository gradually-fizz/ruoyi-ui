<template>
    <div>
        <el-table
          v-loading="loading"
          :data="personList"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column label="类别" prop="category" width="80" />
          <el-table-column label="变化点内容" prop="items" width="80" />
          <el-table-column label="确认项目" prop="item" width="80" />
          <el-table-column
            label="未执行到位产生异常"
            prop="exception"
            width="80"
          />
          <el-table-column label="已识别变化点">
            <el-table-column
              label="变化数量"
              prop="recognizedNum"
              width="80"
            />
            <el-table-column
              label="变化点内容"
              prop="recognizedItem"
              width="80"
            />
            <el-table-column label="责任人" prop="responsible" width="80" />
            <el-table-column label="确认结果" prop="result" width="80" />
            <el-table-column label="计划确认时间" prop="time" width="80" />
          </el-table-column>
          <el-table-column label="突发变化点">
            <el-table-column
              label="变化数量"
              prop="unexceptedNum"
              width="80"
            />
            <el-table-column
              label="变化点内容"
              prop="unexceptedItem"
              width="80"
            />
          </el-table-column>
          <el-table-column label="创建追踪事项" prop="create" width="80" />
          <el-table-column label="早会总结" prop="summary" width="120" />
        </el-table>
    </div>
</template>
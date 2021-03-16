// https://blog.csdn.net/kangkang_90/article/details/92798296
// vue组件传参，调用方法的几种方式
// props
// $refs
// $emit
// eventBus
// provide 和 inject
// vuex

// https://www.cnblogs.com/dhui/p/12926794.html
// vue组件之间相互传值的方式
// 父子通信： 父向子传递数据是通过 props，子向父是通过 $emit；通过 $parent / $children 通信；$ref 也可以访问组件实例；provide / inject ；$attrs / $listeners；
// 兄弟通信： EventBus；Vuex；
// 跨级通信： EventBus；Vuex；provide / inject ；$attrs / $listeners；

<template>
    <div>
        <el-table
          v-loading="loading"
          :data="list"
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
    </div>
</template>
<script>
export default {
    name:"grouptemplate",
    props:{
        list:Array,
        loading:Boolean,
    },
    methods:{
        //  objectSpanMethod(){
        //      this.$emit( "objectSpanMethod")
        //  },
        //  handleSelectionChange(){
        //      this.$emit("handleSelectionChange")
        //  }
    }
}
</script>
<template>
    <div class="mui-numbox" data-numbox-min='1'>
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input id="test" class="mui-input-numbox" type="number" value="1" @change="countChanged" ref="numbox" />
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>
<script>
import mui from "../../lib/mui/js/mui.min.js";
export default {
    mounted(){
        mui(".mui-numbox").numbox()
    },
    methods:{
        countChanged(){
            // 每当文本框的值发生改变时，通过事件调用把值传给父组件
            this.$emit("getcount",parseInt(this.$refs.numbox.value))
        }
    },
    props:["max"],
    watch:{
        // 属性监听
        "max":function(newVal,oldVal){
            // 使用JS API设置numbox
            mui(".mui-numbox").numbox().setOption('max',newVal)
        }
    }
}
</script>
<style lang="less" scoped>

</style>
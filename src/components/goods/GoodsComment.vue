<template>
    <div>
        <cmtbox :id="$route.params.id"></cmtbox>
    </div>
</template>
<script>
import cmtbox from '../subcomponents/comment.vue'
export default {
    components:{
        cmtbox
    }
}
</script>
<style lang="less" scoped>

</style>
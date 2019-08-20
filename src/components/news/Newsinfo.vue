<template>
  <div class="newsinfo-container">
      <!-- 大标题 -->
    <h3 class="title">{{newsinfo.title}}</h3>
    <!-- 子标题 -->
    <p class="subtitle">
      <span>发表时间:{{newsinfo.add_time | dateFormat}}</span>
      <span>点击:{{newsinfo.click}}次</span>
    </p>
    <hr />
    <!-- 内容区域 -->
    <div class="content" v-html="newsinfo.content"></div>
    <!-- 评论区域 -->
    <comment-box :id="this.id"></comment-box>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
// 导入评论子组件
import comment from '../subcomponents/comment.vue'
export default {
  data() {
    return {
      // 将URL地址上的ID挂载到data上，方便调用
      id: this.$route.params.id,
      //   新闻对象
      newsinfo: {}
    };
  },
  created(){
      this.getNewsinfo()
  },
  methods: {
    getNewsinfo() {
      this.$http.get("api/getnew/" + this.id).then(result => {
        if (result.body.status === 0) {
            this.newsinfo=result.body.message[0]
        } else {
          Toast("新闻详情获取失败！");
        }
      });
    }
  },
  components:{
    //   用来注册子组件
    "comment-box":comment
  }
};
</script>
<style lang="less" scoped>
.newsinfo-container {
  padding: 0 4px;
  .title {
    font-size: 16px;
    text-align: center;
    margin: 15px 0;
    color: red;
  }
  .subtitle {
    font-size: 14px;
    color: #226aff;
    display: flex;
    justify-content: space-between;
  }
  .content {
  }
}
</style>
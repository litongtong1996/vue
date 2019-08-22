<template>
  <div class="photoinfo-container">
    <h3>{{photoinfo.title}}</h3>
    <p class="subtitle">
      <span>发表时间:{{photoinfo.add_time | dateFormat}}</span>
      <span>点击:{{photoinfo.click}}次</span>
    </p>
    <hr />
    <!-- 缩略图 -->
    <div class="thumbs">
      <vue-preview :slides="list" @close="getThumbs"></vue-preview>
    </div>
    <!-- 图片内容 -->
    <div class="content" v-html="photoinfo.content"></div>
    <!-- 评论组件 -->
    <cmt-box :id="this.id"></cmt-box>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
// 导入评论子组件
import comment from "../subcomponents/comment.vue";
export default {
  data() {
    return {
      // 从路由中获取图片ID
      id: this.$route.params.id,
      //   图片详情数据
      photoinfo: {},
      // 缩略图
      list: []
    };
  },
  created() {
    this.getPhotoInfo();
    this.getThumbs();
  },
  methods: {
    getPhotoInfo() {
      // 获取图片详情
      this.$http.get("api/getimageInfo/" + this.id).then(result => {
        if (result.body.status === 0) {
          this.photoinfo = result.body.message[0];
        } else {
          Toast("图片详情加载失败");
        }
      });
    },
    getThumbs() {
      // 获取缩略图
      this.$http.get("api/getthumimages/" + this.id).then(result => {
        if (result.body.status === 0) {
          // 循环每一个图片补全宽和高
          result.body.message.forEach(element => {
            element.msrc = element.src;
            element.w = 600;
            element.h = 400;
          });
          // 将完整的数据存储到list
          this.list = result.body.message;
        } else {
          Toast("缩略图加载失败");
        }
      });
    }
  },
  components: {
    //   注册子组件
    "cmt-box": comment
  }
};
</script>
<style lang="less" scoped>
.photoinfo-container {
  padding: 3px;
  h3 {
    color: #26a2ff;
    font-size: 15px;
    text-align: center;
    margin: 15px 0;
  }
  .subtitle {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
  }
  .content {
    font-size: 13px;
    line-height: 30px;
  }
  .thumbs {
    /deep/ .my-gallery {
      display: flex;
      flex-wrap: wrap;
      figure {
        width: 30%;
        margin: 5px;
        img {
          width: 100%;
          margin: 5px;
          box-shadow: 0 0 8px #999;
        }
      }
    }
  }
}
</style>
<template>
  <div class="cmt-container">
    <h3>发表评论</h3>
    <hr />
    <textarea placeholder="请输入要评论的内容(最多120字)" maxlength="120" v-model="msg"></textarea>
    <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
    <div class="cmt-list">
      <div class="cmt-item" v-for="(item,index) in comments" :key="index">
        <div
          class="cmt-title"
        >第{{index+1}}楼&nbsp;&nbsp;用户:{{item.user_name}}&nbsp;&nbsp;发表时间:{{item.add_time | dateFormat}}</div>
        <div class="cmt-body">{{item.content === "undefined" ? "此用户没有评论" : item.content}}</div>
      </div>
    </div>
    <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      // 默认展示第一页
      pageIndex: 1,
      // 所有的评论
      comments: [],
      // 评论输入内容
      msg: ""
    };
  },
  created() {
    this.getComments();
  },
  methods: {
    // 获取评论
    getComments() {
      this.$http
        .get("api/getcomments/" + this.id + "?pageindex=" + this.pageIndex)
        .then(result => {
          if (result.body.status === 0) {
            // this.comments=result.body.message
            // 当获取新数据时，直接在原有数据上拼接新数据
            this.comments = this.comments.concat(result.body.message);
          } else {
            Toast("评论加载失败！");
          }
        });
    },
    getMore() {
      // 加载更多
      this.pageIndex++, this.getComments();
    },
    postComment() {
      // 校验评论内容是否为空
      if (this.msg.trim().length === 0) {
        return Toast("评论内容不能为空！");
      }
      // 发表评论
      // 参数1：请求的URL地址
      // 参数2：提交各数据服务器的数据对象{content：this.msg}
      // 参数3：定义提交时表单中数据的格式{emulateJSON:true}
      this.$http
        .post("api/postcomment/" + this.$route.params.id, {
          content: this.msg.trim()
        })
        .then(function(result) {
          if (result.body.status === 0) {
            // 拼接一个评论对象
            var cmt = {
              user_name: "匿名用户",
              add_time: Date.now(),
              content: this.msg.trim()
            };
            this.comments.unshift(cmt);
            this.msg = "";
          } else {
            Toast("发表评论失败");
          }
        });
    }
  },
  props: ["id"]
};
</script>
<style lang="less" scoped>
.cmt-container {
  h3 {
    font-size: 18px;
  }
  textarea {
    font-size: 14px;
    height: 85px;
    margin: 0;
  }
  .cmt-list {
    margin: 5px 0;
    .cmt-item {
      font-size: 13px;
      .cmt-title {
        line-height: 35px;
        background-color: #ccc;
      }
      .cmt-body {
        line-height: 35px;
        text-indent: 2em;
      }
    }
  }
}
</style>
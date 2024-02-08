<template>
  <app-layout>
    <section slot='content'>
      <li>
        <h2>测试页面</h2>
      </li>
      <ol class="pd-m">
        <li class='pointer' v-for='page in pages' :key='page.url' @click='nav(page)'>
          <div>{{ page.name }}</div>
        </li>
        <li @click='showDlg' class="pointer"><div>弹窗</div><span>{{productName}}</span></li>
      </ol>
      <multi-drag v-if='cur==="multiDrag"'></multi-drag>
      <color-qa v-if='cur==="color"'></color-qa>
      <layout-drop v-if='cur==="dropList"'></layout-drop>
      <multi-check v-if='cur==="multiCheck"'></multi-check>
      <div class="mg-m-v">
        <button @mousedown='down' @mouseup='up'>ceshi</button>
      </div>
      <presenter ref='belong' title="选择所属产品" type="check" :initData='projectList' @out='response'>
      </presenter>
    </section>
  </app-layout>
</template>
<script>
import multiDragQa from "./multi-drag-qa.vue";
import multiCheckQa from "./multi-check-qa.vue";
import colorQa from "./color-qa.vue";
import DropListQa from "./dropdown-qa.vue";
// import io from 'socket.io-client';
export default {
  data() {
    return {
      cur: "dropList",
      projectList: [],
      productName: '无',
      pages: [{
          url: "multiDrag",
          name: "多级排序"
        },
        {
          url: "multiCheck",
          name: "多级多选"
        },
        {
          url: "dropList",
          name: "下拉框"
        },
        {
          url: "color",
          name: "色彩组件"
        }
      ]
    };
  },
  methods: {
    nav(page) {
      this.cur = page.url;
    },
    showDlg(){
      this.$refs.belong.seen = true
    },
    down(){
      console.log('down')
    },
    init() {
      this.getAllProducts()
    },
    response(res){
      if (!res.length) return;
      res = res[0]
      this.productName = res.name
    },
    getAllProducts() {
      this.$http
        .post("/api/product/findAll")
        .then(res => {
          if (!res.body) return false;
          this.projectList = res.body.data
        });
    },
    up(){
      console.log('up')
    }
  },
  components: {
    "multi-drag": multiDragQa,
    "multi-check": multiCheckQa,
    "layout-drop": DropListQa,
    "color-qa": colorQa,
  },
  mounted() {
    this.init()
    // var username = prompt('请输入您的姓名');
    // if (!username) {
    //   alert('姓名必填');
    //   history.go(0);
    // }
    // //username="子木";
    // var userId = '011';
    // var userInfo = {
    //   'userid': userId,
    //   'username': username
    // };
    //连接socket后端服务器
    // var socket = io.connect("ws://localhost:8080/api");
    //通知用户有用户登录
    // socket.emit('message', userInfo);
      // socket.send('data');
    //监听新用户登录
    // socket.on('login', function(o) {
    //   updateMsg(o, 'login');
    // });
    // //监听用户退出
    // socket.on('logout', function(o) {
    //   updateMsg(o, 'logout');
    // });
    // //发送消息
    // socket.on('message', function(obj) {
    //   if (obj.userid == userId) {
    //     var MsgHtml = '<section class="user clearfix">' +
    //       '<span>' + obj.username + '</span>' +
    //       '<div>' + obj.content + '</div>' +
    //       '</section>';
    //   } else {
    //     var MsgHtml = '<section class="server clearfix">' +
    //       '<span>' + obj.username + '</span>' +
    //       '<div>' + obj.content + '</div>' +
    //       '</section>';
    //   }
    //   console.log(MsgHtml)
    // })

    // /*用户id生成*/
    // function genUid() {
    //   return new Date().getTime() + "" + Math.floor(Math.random() * 899 + 100);
    // }

    // function logout() {
    //   socket.disconnect();
    //   location.reload();
    // }
    // /*监听函数*/
    // function updateMsg(o, action) {
    //   //当前在线列表
    //   var onlineUser = o.onlineUser;
    //   //当前在线数
    //   var onlineCount = o.onlineCount;
    //   //新加用户
    //   var user = o.user;
    //   //更新在线人数
    //   var userList = '';
    //   var separator = '';
    //   for (key in onlineUser) {
    //     userList += separator + onlineUser[key];
    //     separator = '、';
    //   }
    //   //跟新房间信息
    //   console.log(onlineCount)
    //   console.log(userList)
    //   //系统消息
    //   if (action == 'login') {
    //     var sysHtml = '<section class="chatRoomTip"><div>' + user.username + '进入聊天室</div></section>';
    //   }
    //   if (action == "logout") {
    //     var sysHtml = '<section class="chatRoomTip"><div>' + user.username + '退出聊天室</div></section>';
    //   }
    // }
  }
};

</script>

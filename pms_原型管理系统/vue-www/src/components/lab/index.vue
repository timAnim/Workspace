<template>
  <app-layout>
    <section slot='content'>
      <ul column-2>
        <dl class="lay-r" v-for='item in tools' :key='item.id'>
          <li class="align-indent bg-bright">{{ item.name }}</li>
          <div>
            <div class="clip ht-l mg-m-v cl-theme">
              <icon :name='item.label'></icon>
            </div>
            <div class="align-c ht-m fs-s cl-sec">点击或拖拽到此</div>
            <textarea class='float-nw ht-max wd-max invisible' @click='select(item.id)' @drop.prevent='detect($event, item)' :key='item.id'>
            </textarea>
            <input :id='item.id' class='hidden' type="file" @change.prevent="detect($event, item)">
          </div>
        </dl>
      </ul>

      <ul column-4>
        <dl class="lay-r" v-for='item in imageDetect' :key='item.id'>
          <li class="align-indent bg-bright">{{ item.name }}</li>
          <div>
            <div class="clip ht-l mg-m-v cl-theme">
              <icon :name='item.label'></icon>
            </div>
            <div class="align-c ht-m fs-s cl-sec">点击或拖拽到此</div>
            <textarea class='float-nw ht-max wd-max invisible' @click='select(item.id)' @drop.prevent='detect($event, item)' :key='item.id'>
            </textarea>
            <input :id='item.id' class='hidden' type="file" @change.prevent="detect($event, item)">
          </div>
        </dl>
      </ul>

      <ol class="sd-card">
        <li class="ht-l align-indent"><div>周报</div>
          <span>第 {{ curWeek }} 周</span>
          <button class="sd-theme mg-m-h" @click='getWeekReport'>
            <span>保存</span>
          </button>
        </li>
        <div class="lay-h pd-s" v-for='(list,index) in taskList' :key='index'>
          <span class="wd-auto">
            <li class='ht-l'>
              <input-text class='wd-auto mg-m-h' icon='tasks' placeholder='本周项目' v-model='list.project'></input-text>
              <input-text class='wd-xl mg-m-h' icon='flag' placeholder='完成状态' v-model='list.state'></input-text>
            </li>
            <li class='ht-l'>
              <input-text class='wd-auto mg-m-h' icon='check' placeholder='下周计划' v-model='list.plan'></input-text>
              <input-text class='wd-xl mg-m-h' icon='info' placeholder='存在问题' v-model='list.problem'></input-text>
            </li>
          </span>
          <span class="ctrl-bar ht-l" style="align-self:flex-start">
              <button class="mg-s-h" type='square-s' @click='delTask($event,index)'>
                <icon name='minus'></icon>
              </button>
              <button class="mg-s-h" type='square-s' @click='addTask($event,index)'>
                <icon name='plus'></icon>
              </button>
          </span>
        </div>
      </ol>
      <loading :show='loading'></loading>
      <text-viewer :data='json' :seen='storyBoard' @close='storyBoard=false'></text-viewer>
    </section>
  </app-layout>
</template>
<script>
import viewer from "./../_common/text-viewer";
export default {
  data() {
    return {
      loading: false,
      storyBoard: false,
      tools: [
        {
          id: "image",
          name: "图片转文字",
          label: "image",
          url: "/api/ocr/image"
        },
        {
          id: "receipt",
          name: "票据识别",
          label: "id-card",
          url: "/api/ocr/receipt"
        }
      ],
      imageDetect: [
        {
          id: "dish",
          name: "菜品识别",
          label: "codiepie",
          url: "/api/ocr/dish"
        },
        {
          id: "car",
          name: "乘用车识别",
          label: "car",
          url: "/api/ocr/car"
        },
        {
          id: "animal",
          name: "动物识别",
          label: "paw",
          url: "/api/ocr/animal"
        },
        {
          id: "plant",
          name: "植物识别",
          label: "leaf",
          url: "/api/ocr/plant"
        }
      ],
      json: "",
      taskList: [{ project: "", state: "", plan: "", problem: "" }]
    };
  },
  methods: {
    detect(ev, item) {
      var files = ev.target.files || ev.dataTransfer.files;
      if (!files[0]) return false;
      const formData = new FormData();
      formData.append("file", files[0]);
      this.loading = true;
      this.$http.post(item.url, formData).then(res => {
        this.loading = false;
        if (!res.body) return;
        var result = JSON.parse(res.body.data);
        if (result.words_result) {
          this.json = result.words_result;
          this.storyBoard = true;
        } else if (result.result.length) {
          this.$pd.toast(result.result[0].name);
        } else {
          this.$pd.toast("不能识别");
        }
        ev.target.value = null;
      });
    },
    getWeekReport() {
      this.$http
        .post("/api/workflow/generate-week-report", {
          week: this.curWeek,
          data: this.taskList,
          start: this.start,
          end: this.end
        })
        .then(res => {
          if (!res.body) return;
          this.$pd.toast("上传成功");
          window.location.href = res.body.resPath;
        });
    },
    addTask(ev, index) {
      this.taskList.splice(index + 1, 0, {});
    },
    delTask(ev, index) {
      if (this.taskList.length === 1) return;
      this.taskList.splice(index, 1);
    },
    select(_id) {
      document.getElementById(_id).click();
    }
  },
  components: {
    "text-viewer": viewer
  },
  computed: {
    curWeek() {
      function isLeapYear(year) {
        return year % 400 == 0 || (year % 4 == 0 && year % 100 != 0);
      }

      function getMonthDays(year, month) {
        return (
          [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month] ||
          (isLeapYear(year) ? 29 : 28)
        );
      }

      function getWeekNumber(y, m, d) {
        var now = new Date();
        if (y && m && d) now = new Date(y, m - 1, d);
        var year = now.getFullYear(),
          month = now.getMonth(),
          days = now.getDate();
        //那一天是那一年中的第多少天
        for (var i = 0; i < month; i++) {
          days += getMonthDays(year, i);
        }
        //那一年第一天是星期几
        var yearFirstDay = new Date(year, 0, 1).getDay() || 7;

        var week = null;
        if (yearFirstDay == 1) {
          week = Math.ceil(days / 7);
        } else {
          days -= 7 - yearFirstDay + 1;
          week = Math.ceil(days / 7) + 1;
        }
        return week;
      }
      return getWeekNumber();
    },
    start() {
      var now = new Date();
      var day = now.getDay();
      var month = now.getMonth() + 1;
      var date = now.getDate();
      return month + "-" + (date - (day - 1));
    },
    end() {
      var now = new Date();
      var day = now.getDay();
      var month = now.getMonth() + 1;
      var date = now.getDate();
      return month + "-" + (date + (5 - day));
    }
  }
};
</script>

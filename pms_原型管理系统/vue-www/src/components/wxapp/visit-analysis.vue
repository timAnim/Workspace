<template>
  <main>
    <transition name='slide'>
      <article>
        <header class="shadow-m">
          <section>
            <li class="ht-l">
              <h1 class="pd-m-h">小程序运营分析</h1>
            </li>
          </section>
        </header>
        <content>
          <section>
            <div class="mg-m sd-card pd-l">
              <ul>
                <div @click='cur="visit"' class="pointer blink-wave" :class="{'cl-theme':cur=='visit'}">
                  <div class="cl-hint">用户总数</div>
                  <div class="fs-xl ht-l">{{ visit }}</div>
                  <div>日活{{ visit_uv }} (DAU)</div>
                  <div class="mg-m-v cl-sec fs-s">
                    <div>日均PV {{ visit_pv }}</div>
                    <div>日均打开次数 {{ session_cnt }}</div>
                    <div>次均访问时长 {{ stay_time_session }}</div>
                  </div>
                </div>
                <div @click='cur="week"' class="pointer blink-wave" :class="{'cl-theme':cur=='week'}">
                  <div class="cl-hint">上周访客</div>
                  <li class="ht-l">
                    <span class="fs-xl ht-l">{{ week }}</span>
                    <span class="pd-s-h"
                      :class="{
                        'cl-theme':w2w,
                        'cl-alert':!w2w
                      }">
                      <icon name='long-arrow-up' v-if='w2w'></icon>
                      <icon name='long-arrow-down' v-if='!w2w'></icon>
                    </span>
                  </li>
                  <div>周活{{ visit_uv*7 }} (WAU)</div>
                  <div class="mg-m-v cl-sec fs-s">
                    <div>上周新增 {{ visit_uv_new }}</div>
                  </div>
                </div>
                <div @click='cur="month"' class="pointer blink-wave" :class="{'cl-theme':cur=='month'}">
                  <div class="cl-hint">上月访客</div>
                  <li class="ht-l">
                    <span class="fs-xl">{{ month }}</span>
                    <span class="pd-s-h"
                      :class="{
                        'cl-theme':m2m,
                        'cl-alert':!m2m
                      }">
                      <icon name='long-arrow-up' v-if='m2m'></icon>
                      <icon name='long-arrow-down' v-if='!m2m'></icon>
                    </span>
                  </li>
                  <div>月活{{ visit_uv*30 }} (MAU)</div>
                </div>
                <div @click='cur="persona"' class="pointer blink-wave" :class="{'cl-theme':cur=='persona'}">
                  <div class="cl-hint">近30天分析</div>
                  <div class="fs-xl ht-l">{{ persona }}</div>
                  <div>用户画像</div>
                </div>
                <div @click='$store.commit("toast","建设中")' class="pointer blink-wave" :class="{'cl-theme':cur=='pointer'}">
                  <div class="cl-hint">注册用户</div>
                  <div class="fs-xl ht-l">{{ register }}</div>
                </div>
              </ul>
              <li>
                <div class="fs-s cl-hint align-c">*活跃用户: 在小宇睿联这款工具类产品中, 定义活跃用户 = 独立访客</div>
              </li>
            </div>
            <visit v-if='cur=="visit"'></visit>
            <week v-if='cur=="week"' :statistic='statistic_week'></week>
            <month v-if='cur=="month"' :statistic='statistic_month'></month>
            <persona @change='onChange' v-else-if='cur=="persona"'></persona>
            <!-- <register  @change='onChange' v-else-if='cur=="register"'></register> -->
            <li>
              <div class="fs-s cl-hint align-c">{{ source }}</div>
            </li>
          </section>
        </content>
      </article>
    </transition>
  </main>
</template>
<script>
var visit = require("./visit");
var week = require("./week");
var month = require("./month");
var persona = require("./persona");
// var register = require("./register");
export default {
  data() {
    return {
      cur: "visit",
      week: "--",
      visit: "--",
      month: "--",
      persona: "--",
      register: "--",
      visit_uv: 0,
      visit_uv_new: 0,
      visit_pv: 0,
      stay_time_session: 0,
      session_cnt: 0,
      stay_time_uv: 0,
      statistic_week: [],
      statistic_month: []
    };
  },
  methods: {
    onChange(total, label) {
      this[label] = total;
    },
    getStatistic(list) {
      var stay_time_session = 0,
        stay_time_uv = 0,
        session_cnt = 0,
        visit_pv = 0,
        visit_uv = 0,
        visit = 0;

      list.forEach(item => {
        stay_time_session += item.stay_time_session;
        session_cnt += item.session_cnt;
        stay_time_uv += item.stay_time_uv;
        visit_uv += item.visit_uv;
        visit_pv += item.visit_pv;
        visit += item.visit_uv_new;
      });
      this.visit = visit;
      this.week = list[list.length - 1].visit_uv;
      this.visit_uv_new = list[list.length - 1].visit_uv_new;
      this.stay_time_session = (stay_time_session / list.length).toFixed(1);
      this.stay_time_uv = (stay_time_uv / list.length).toFixed(1);
      this.session_cnt = (session_cnt / list.length / 7).toFixed(1);
      this.visit_uv = (visit_uv / list.length / 7).toFixed(0);
      this.visit_pv = (visit_pv / list.length / 7).toFixed(0);
    }
  },
  mounted() {
    this.$http.post("/api/wxapp/getAnalysisWeeklyVisitTrend").then(res => {
      this.statistic_week = res.body.list;
      this.statistic_week.sort((a, b) => {
        return parseInt(a.ref_date) - parseInt(b.ref_date);
      });
      this.getStatistic(this.statistic_week);
    });

    this.$http.post("/api/wxapp/getAnalysisMonthlyVisitTrend").then(res => {
      this.statistic_month = res.body.list;
      this.month = this.statistic_month[
        this.statistic_month.length - 1
      ].visit_uv;
    });
  },
  computed: {
    source() {
      var now = new Date();
      return (
        "数据来源 微信数据统计后台 更新时间 " +
        now.getFullYear() +
        (now.getMonth() + 1) +
        now.getDate() +
        "  " +
        now.getHours() +
        ":" +
        now.getMinutes()
      );
    },
    w2w() {
      return this.week > this.visit_uv * 7;
    },
    m2m() {
      return this.month > this.visit_uv * 30;
    }
  },
  components: {
    visit,
    week,
    month,
    persona
    // register
  }
};
</script>

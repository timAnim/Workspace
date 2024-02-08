<style scoped lang='scss'>
dl {
  flex: 0 0 33.3%;
  margin: 0;
  text-align: center;
  div {
    height: 5.6rem;
    line-height: 5.6rem;
    text-align: center;
    width: 100%;
    width: 5.6rem;
    margin: 0.8rem auto;
    border-radius: 50%;
    border: #bdbdbd solid 1px;
  }
  dt {
    color: #bdbdbd;
  }
  .fa-icon {
    fill: #bdbdbd;
    transform: scale(2.5);
  }
  #tablet {
    transform: scale(2.25);
  }
  #desktop {
    transform: scale(1.8);
  }
}

dl[available] {
  div {
    border: none;
    background: #8bc34a;
  }
  .fa-icon {
    fill: white;
  }
  dt {
    color: #212121;
  }
}

li[available] {
  em {
    color: #212121;
  }
}

li em {
  color: #bdbdbd;
}

</style>
<template>
  <transition name='in-left'>
    <section id='calendar'>
      <ol class='shade-as-card'>
        <ul>
          <dl @click='tapHandler' evnt='mobile' :available='initData.mobile' :class='{"blink-theme":initData.mobile}'>
            <div>
              <icon name='mobile'></icon>
            </div>
            <dt>手机(360x640)</dt>
          </dl>
          <dl @click='tapHandler' evnt='pad' :available='initData.pad' :class='{"blink-theme":initData.pad}'>
            <div>
              <icon name='tablet' id='tablet'></icon>
            </div>
            <dt>平板(768x1024)</dt>
          </dl>
          <dl @click='tapHandler' evnt='desktop' :available='initData.desktop' :class='{"blink-theme":initData.desktop}'>
            <div>
              <icon name='desktop' id='desktop'></icon>
            </div>
            <dt>电脑(全屏幕)</dt>
          </dl>
        </ul>
      </ol>
      <h3></h3>
      <ol id='list-second' class='shade-as-card'>
        <li type='filter'>
          <h1>项目文档</h1>
        </li>
        <li class='blink-theme' @click='tapHandler' evnt='material' :available='initData.material||false'><em>相关资料</em><pre>原型git、业务文档、其他</pre>
          <label>
            <icon name="angle-right"></icon>
          </label>
        </li>
        <li class='blink-theme' @click='tapHandler' evnt='prd' :available='initData.prd||false'><em>PRD文档</em><pre>术语、流程、功能、字段</pre>
          <label>
            <icon name="angle-right"></icon>
          </label>
        </li>
        <li class='blink-theme' @click='tapHandler' evnt='material' :available='initData.ui||false'><em>界面设计</em><pre>效果图、切图</pre>
          <label>
            <icon name="angle-right"></icon>
          </label>
        </li>
        <li class='blink-theme' @click='tapHandler' evnt='interface' :available='initData.interface||false'><em>接口文档</em><pre>接口地址、返回格式</pre>
          <label>
            <icon name="angle-right"></icon>
          </label>
        </li>
      </ol>
    </section>
  </transition>
</template>
<script>
export default {
  props: ['initData'],
  methods: {
    tapHandler(ev) {
      var target = ev.target;
      while (target.tagName !== 'LI' && target.tagName !== 'DL' && target.tagName !== 'BUTTON') {
        target = target.parentNode
      }
      var name = target.getAttribute('evnt')
      if (!target.getAttribute('available')) return;
      switch (name) {
        case 'mobile':
          var isHttp = this.initData.index.split('https').length
          if (isHttp > 1) {
            window.location.href = this.initData.index;
          } else {
            this.openWin(360, 640);
          }
          break;
        case 'pad':
          this.openWin(768, 1024);
          break;
        case 'desktop':
          window.location.href = this.initData.index;
          break;
        case 'prd':
        case 'uml':
        case 'structure':
        case 'interface':
        case 'material':
          window.location.href = target.getAttribute('available');
          break;
      }
    },
    openWin(width, height) {
      var para = {
        height: height,
        width: width,
        top: Math.round((window.screen.height - height) / 2),
        left: Math.round((window.screen.width - width) / 2),
        location: 'no',
        toolbar: 'no',
        menubar: 'no',
        scrollbars: 'no',
        resizable: 'no',
        status: 'no'
      };
      var paras = '';
      for (var item in para) {
        paras += item;
        paras += '=' + para[item] + ',';
      }
      window.open(this.initData.index, 'newwindow', paras);
    },
  },
}

</script>

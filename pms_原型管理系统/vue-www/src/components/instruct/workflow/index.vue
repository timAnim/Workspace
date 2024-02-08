<style scoped>
textarea {
  position: absolute;
  height: 100%;
  width: 100%;
  opacity: 0;
  left: 0;
  top: 0;
  cursor: pointer;
  z-index: 99;
}

.outer > .label svg {
  transform: scale(2);
}

.upload {
  position: absolute;
  height: 0.24rem;
  width: 0.56rem;
  border-radius: 0.12rem;
  right: 1px;
  top: 50%;
  margin-top: -0.12rem;
  opacity: 1;
}

.upload svg {
  margin-bottom: -0.02rem;
  fill: white;
}

input[type="file"] {
  display: none;
}

.green {
  background-color: #259b24;
  margin-left: 0;
}

.blue .outer,
.green .outer {
  background-color: #2baf2b;
  text-align: center;
  color: white;
}

.hint {
  display: block;
  line-height: 0.3rem;
}

.blue {
  background-color: #3f51b5;
  margin-right: 0;
}

.blue .outer {
  background-color: #5c6bc0;
}

.cliper {
  height: 0.8rem;
  overflow: hidden;
}

.mask {
  background-color: #f5f5f5;
  z-index: 9999;
}

#close-btn {
  border-radius: 50%;
  position: absolute;
  right: 0.08rem;
  top: 0.08rem;
  z-index: 9999;
}

#close-btn svg {
  transform: scale(1.6);
}
</style>
<template>
  <section>
    <ul column-2>
      <dl class="green cl-front align-indent">
        <div class="ht-s">需求说明单</div>
        <dt class='outer icon lay-r'>
          <textarea @drop='upload' @click='select' id='excel'></textarea>
          <div class="label ht-l">
            <icon name='file-excel-o'></icon>
          </div>
          <div class='hint ht-m fs-s'>点击上传xml或拖拽到此区域</div>
          <input type="file" @change="upload" name='excel'>
        </dt>
      </dl>
      <dl class="blue cl-front align-indent">
        <div class="ht-s">需求文档</div>
        <dt class='outer icon lay-r'>
          <textarea @drop='upload' @click='select' id='word'></textarea>
          <div class="label ht-l">
            <icon name='file-word-o'></icon>
          </div>
          <div class='hint ht-m fs-s'>点击上传xml或拖拽到此区域</div>
          <input type="file" @change="upload" name='word'>
        </dt>
      </dl>
    </ul>
    <ol class="sd-card pd-s" @click='procedure=!procedure'>
      <li><em>UED工作流程</em></li>
      <div class='clip ht-xl landscape'>
        <img src='/static/img/支持流程.svg' />
      </div>
    </ol>
    <transition name='slide'>
      <div class="mask" v-if='procedure'>
        <button class="ht-s wd-s" id='close-btn' @click='procedure=!procedure'>
          <icon name='times-circle'></icon>
        </button>
        <img-viewer :src='"/static/img/支持流程.svg"'></img-viewer>
      </div>
    </transition>
  </section>
</template>
<script>
import viewer from "@/components/_common/img-viewer";
import ocrImage from "@/components/_common/ocr-image";
export default {
  data() {
    return {
      clicked: null,
      procedure: false
    };
  },
  methods: {
    upload(event) {
      event.preventDefault();
      var files = event.target.files || event.dataTransfer.files;
      if (!files.length) return;
      var _id = event.target.id || this.clicked;
      var file = files[0];
      var sendFile = (data, filename) => {
        this.$http
          .post("/api/workflow/generate-prd-" + _id, {
            data: data,
            name: filename
          })
          .then(res => {
            if (!res.body) return;
            this.$pd.toast("上传成功");
            document.getElementsByName(_id)[0].value = null;
            window.location.href = res.body.resPath;
          });
      };

      this.readFileSync(file).then(reader => {
        var parser = new DOMParser();
        var doc = parser.parseFromString(reader.result, "text/xml");
        var data = this.xmlToJson(doc).xml.rows.row;
        var filename = file.name.replace(/(.*\/)*([^.]+).*/gi, "$2");
        sendFile(data, filename);
      });
    },
    readFileSync(file) {
      var reader = new FileReader();
      var readFile = new Promise((resolve, reject) => {
        reader.readAsText(file);
        reader.onload = ev => {
          resolve(reader);
        };
      });
      return readFile;
    },
    xmlToJson(xml) {
      var obj = {};
      if (xml.nodeType == 1) {
        // element
        if (xml.attributes.length > 0) {
          obj["@attributes"] = {};
          for (var j = 0; j < xml.attributes.length; j++) {
            var attribute = xml.attributes.item(j);
            obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
          }
        }
      } else if (xml.nodeType == 3) {
        // text
        obj = xml.nodeValue;
      }
      if (xml.hasChildNodes()) {
        for (var i = 0; i < xml.childNodes.length; i++) {
          var item = xml.childNodes.item(i);
          var nodeName = item.nodeName;
          if (typeof obj[nodeName] == "undefined") {
            obj[nodeName] = this.xmlToJson(item);
          } else {
            if (typeof obj[nodeName].push == "undefined") {
              var old = obj[nodeName];
              obj[nodeName] = [];
              obj[nodeName].push(old);
            }
            obj[nodeName].push(this.xmlToJson(item));
          }
        }
      }
      return obj;
    },
    select(ev) {
      var _id = event.target.id;
      this.clicked = _id;
      document.getElementsByName(_id)[0].click();
    }
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
          week = Math.ceil(days / yearFirstDay);
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
  },
  components: {
    "img-viewer": viewer,
    "ocr-image": ocrImage
  }
};
</script>
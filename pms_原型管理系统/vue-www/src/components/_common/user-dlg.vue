<style scoped>
    .icon {
        height: 5.6rem;
        line-height: 5.6rem;
        text-align: center;
        color: #9e9e9e;
        margin-top: 0.4rem;
    }
    
    dialog content label:first-child {
        flex: 0 0 5em;
    }
    
    .check-btn {
        margin-right: 0;
    }
</style>
<template>
  <div class='mask' @click='seen=false' v-if='seen'>
    <dialog out='out-top' @click.stop>
      <header>
        <li>
          <label evnt='previous' id='_back'>
            <icon name='chevron-left'></icon>
          </label>
          <h1>部门用户</h1>
        </li>
        <li type='filter'>
          <search></search>
        </li>
      </header>
      <content>
        <section>
          <ol class="shade-card">
            <li v-for='(item, index) in users' :id='item._id' :key='index'>
              <label type='switch' class='check-btn' name='depart-check' @click='check(index)' :checked='item.checked'>
                <icon name="square-o"></icon>
                <icon name="check-square"></icon>
              </label>
              <em>{{ item.name }}</em>
              <pre>{{ item.mobile }}</pre>
            </li>
          </ol>
        </section>
      </content>
      <footer>
        <li>
          <button type='half' @click='seen=false'>取消</button>
          <button type='half' @click='out'>确认</button>
        </li>
      </footer>
    </dialog>
  </div>
</template>
<script>
    export default {
        methods: {
            check(item) {
                this.users[item].checked = !this.users[item].checked;
                this.$set(this.users, item, this.users[item]);
            },
            out() {
                this.seen = false;
                var arr = this.users.filter(user => {
                    return user.checked;
                });
                this.$emit("out", arr);
            }
        },
        data() {
            return {
                seen: false,
                users: [],
                checked: []
            };
        },
        mounted() {
            this.$http.post("/api/staff/find").then(res => {
                this.users = res.body.data;
            });
        },
        watch: {
            seen(change) {
                let n = 0;
                this.users.forEach(user => {
                    n = 0;
                    this.checked.forEach(item => {
                        if (user._id === item._id) n++;
                    });
                    if (n) user.checked = true;
                    else user.checked = false;
                });
            }
        }
    };
</script>
<template>
    <flyout
        :seen='seen'
        :title='"修改密码"'
        @out='out'
        ref='outer'>
        <ol slot='content'>
            <li>
                <label char="5">旧密码</label>
                <input type='password'
                    placeholder="原密码"
                    autocomplete="false" 
                    v-model='req.old'>
            </li>
            <li>
                <label char="5">新密码</label>
                <input type='password' placeholder="新密码" v-model='req.pswd1'>
            </li>
            <li>
                <label char="5">密码确认</label>
                <input type='password' placeholder="密码确认" v-model='req.pswd2'>
            </li>
        </ol>
    </flyout>
</template>
<script>
export default {
    data() {
        return {
            seen:false,
            req:{},
        }
    },
    methods: {
        save() {
            if (this.req.pswd1!==this.req.pswd2) return this.$pd.toast('两次输入不一致')
            this.req.password=this.req.pswd1
            this.$http.post('/api/staff/modify-pswd',{
                data:this.req
            }).then(res => {
                this.seen=false
                if (res.body.code!==0) return
                this.$pd.toast('信息已保存');
            });
        },
        out(res){
            this.seen=false
            if (res) this.save()
        }
    }
}
</script>

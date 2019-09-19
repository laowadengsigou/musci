<config>
    {
    "backgroundTextStyle": 'light',
    "navigationBarBackgroundColor": '#FF0000',
    "navigationBarTitleText": '登陆',
    "navigationBarTextStyle": 'black',
    "usingComponents": {
    "van-field": "../../native/vant/field/index",
    "van-button": "../../native/vant/button/index"
    }
    }
</config>
<template>
    <div>
        <div>
            <div class="int">
                <van-cell-group>
                    <van-field
                            :value="phone"
                            required
                            clearable
                            label="手机号"
                            icon="question-o"
                            placeholder="请输入手机号"
                            @blur="Blur1"
                    />
                    <van-field
                            :value="password"
                            type="password"
                            label="密码"
                            placeholder="请输入密码"
                            required
                            border="false"
                            @blur="Blur2"
                    />
                </van-cell-group>
            </div>
            <div>
                <div class="box">
                    <van-button type="primary" >注册</van-button>
                    <van-button type="danger" class="but" @click="deng">登陆</van-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "land",
        components: {},
        props: {},
        data() {
            return {
                phone:"",//手机号
                password:"",//密码
            }
        },
        methods: {
            deng(){
                // console.log(this.phone);
                // console.log(this.password);
                this.$fly.get(`/login/cellphone?phone=${this.phone}&password=${this.password}`).then(res=>{
                    this.$store.state.profile = res.data.profile
                    console.log(res.data.profile);
                    wx.switchTab({
                        url: '../my/my',
                    })
                })
            },
            Blur1(e){
                this.phone = e.detail.value
                // console.log(e.detail.value);
            },
            Blur2(e){
                this.password = e.detail.value
            }
        },
        mounted() {},
        created() {

        },
        filters: {},
        computed: {},
        watch: {},
        directives: {}
    }
</script>

<style scoped lang="scss">
.box{
   margin-left: 33%;
    margin-top: 10%;
}
    .but{
        margin-left: 10%;
    }
</style>

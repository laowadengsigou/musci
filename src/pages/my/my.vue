<config>
    {
    "backgroundTextStyle": 'light',
    "navigationBarBackgroundColor": '#FF0000',
    "navigationBarTitleText": '我的',
    "navigationBarTextStyle": 'black',
    "usingComponents": {
    "van-button": "../../native/vant/button/index"
    }
    }
</config>
<template>
    <div>
            <div class="dv" v-if="userData === null">
                <div>你还没有登陆</div>
                <div class="but"><van-button type="info" @click="deng">立即登陆</van-button></div>
            </div>
        <div v-else>
            <div>
                <div class="box">
                    <div style="margin-left: 5%"><img :src="userData.avatarUrl" alt="" class="img"></div>
                    <div style="margin-left: 5%;margin-top: 6%">
                        <div>
                            {{userData.nickname}}
                        </div>
                        <div>LV:{{userData.eventCount}}</div>
                    </div>
                    <div style="margin-left: 40%;margin-top: 6%">签到</div>
                </div>
            </div>
            <div class="box">
                <div class="le">
                    <div style="text-align: center">0</div>
                    <div>动态</div>
                </div>
                <div class="left">
                    <div style="text-align: center">{{userData.follows}}</div>
                    <div>关注</div>
                </div>
                <div class="left">
                    <div style="text-align: center">{{userData.followeds}}</div>
                    <div>粉丝</div>
                </div>
                <div class="left">
                    <div>编辑资料</div>
                </div>
            </div>
            <div style="margin-top: 20%">
                <van-button type="warning" style="margin-left: 40%" @click="tui">退出登陆</van-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "my",
        components: {},
        props: {},
        data() {
            return {
            }
        },
        methods: {
            deng(){
                wx.navigateTo({
                  url: '../land/land'
                })
            },
            tui(){
                this.$fly.get("/logout").then(res=>{
                    console.log(res);
                    this.$store.state.profile = null
                    wx.showToast({
                      title: '退出登陆成功'
                    })
                })
            }
        },
        mounted() {

        },
        created() {

        },
        filters: {},
        computed: {
            userData(){
                return this.$store.state.profile
            }
        },
        watch: {},
        directives: {}
    }
</script>

<style scoped lang="scss">
.dv{
    text-align: center;
    margin-top: 50%;

}
    .but{
        margin-top: 2%;
    }
    .box{
        display: flex;
        margin-top: 5%;
    }
    .img{
        width: 100px;
        height: 100px;
        border-radius: 50%;
    }
    .le{
        margin-left: 10%;
    }
    .left{
        margin-left: 15%;
    }
</style>
